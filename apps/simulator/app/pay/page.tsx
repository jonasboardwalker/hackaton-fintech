"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDevTools } from "@/context/dev-tools-context";
import { trustClient } from "@/lib/trust-limit-client";

// City coordinates mapping
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  "Prague": { lat: 50.0755, lng: 14.4378 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Tokyo": { lat: 35.6762, lng: 139.6503 },
  "Sydney": { lat: -33.8688, lng: 151.2093 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "Singapore": { lat: 1.3521, lng: 103.8198 },
  "Paris": { lat: 48.8566, lng: 2.3522 },
  "Berlin": { lat: 52.5200, lng: 13.4050 },
  "Moscow": { lat: 55.7558, lng: 37.6173 },
  "Cape Town": { lat: -33.9249, lng: 18.4241 },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Toronto": { lat: 43.6532, lng: -79.3832 },
  "Mexico City": { lat: 19.4326, lng: -99.1332 },
};

// Define a Zod schema for the form data.
const formSchema = z.object({
  amount: z.string().nonempty("Amount is required"),
  recipient: z.string().nonempty("Recipient is required"),
  purpose: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PaymentScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
  const router = useRouter();
  const { toast } = useToast();
  const { devOverrides } = useDevTools();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const cityCoords = cityCoordinates[devOverrides.location] || cityCoordinates["Prague"];
      
      const result = await trustClient.checkTx({
        amount: Number.parseFloat(data.amount),
        clientId: "a655a3c6-338c-4d6c-9149-b2f0ffd98c51",
        clientEmail: "daniil@gmail.com",
        metadata: {
          location: cityCoords,
          role: devOverrides.userRole || "user",
          timestamp: new Date().toISOString(),
        },
      });

      if (result.status === "approved") {
        toast({
          title: "Transaction Approved!",
          description: "Your payment has been processed successfully.",
        });
        setTimeout(() => router.push("/"), 1500);
      } else if (result.status === "hold") {
        toast({
          title: "Transaction was put on hold",
          description: "It will be checked by our support member.",
        });
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Transaction Denied",
          description: "Your transaction could not be processed.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Send Money</h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Enter the details for your transaction
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="text-2xl"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-xs text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Name or email"
                {...register("recipient")}
              />
              {errors.recipient && (
                <p className="text-xs text-destructive">
                  {errors.recipient.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose (optional)</Label>
              <Input
                id="purpose"
                placeholder="What's this payment for?"
                {...register("purpose")}
              />
              {errors.purpose && (
                <p className="text-xs text-destructive">
                  {errors.purpose.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send Payment"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
