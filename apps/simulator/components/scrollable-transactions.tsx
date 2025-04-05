"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionCard, Transaction } from "@/components/transaction-card";

interface ScrollableTransactionsProps {
  transactions: Transaction[];
}

export function ScrollableTransactions({
  transactions,
}: ScrollableTransactionsProps) {
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the viewport element inside the ScrollArea
    const viewport = viewportRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (!viewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;

      // Show top gradient if we've scrolled down
      setShowTopGradient(scrollTop > 0);

      // Show bottom gradient if we haven't reached the bottom
      // Using a larger threshold to ensure the gradient is visible
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setShowBottomGradient(!isAtBottom);

      // Debug logs to help diagnose the issue
      console.log({
        scrollTop,
        clientHeight,
        scrollHeight,
        isAtBottom,
        showBottomGradient: !isAtBottom,
      });
    };

    viewport.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => viewport.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex-1 px-4 overflow-hidden" ref={viewportRef}>
      {/* Top gradient overlay */}
      {showTopGradient && (
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10"></div>
      )}

      {/* Scrollable content */}
      <ScrollArea className="h-full">
        <div className="space-y-4 pb-4">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </ScrollArea>

      {/* Bottom gradient overlay - always show for now to debug */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent z-10"></div>
    </div>
  );
}
