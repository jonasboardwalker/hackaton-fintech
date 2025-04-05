"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkTransaction } from "@/lib/transaction-service";
import { useDevTools } from "@/context/dev-tools-context";
import {
  OpenAPI,
  DefaultService,
} from "@admin-shad-template/api/src/generated";

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
      OpenAPI.BASE = "http://localhost:3000";
      OpenAPI.HEADERS = {
        "x-api-key":
          "972444b6980194d0b66de5944c8314466e4312991b5319c7dfd59f398869d490",
      } as Record<string, string>;

      const result = await DefaultService.postApiTransactionsAuthorize({
        amount: Number.parseFloat(data.amount),
        clientId: "someId",
        metadata: {
          location: "Germany",
        },
      });

      if (result.status === "allowed") {
        toast({
          title: "Transaction Approved!",
          description: "Your payment has been processed successfully.",
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
