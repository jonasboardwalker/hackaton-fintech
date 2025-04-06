"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  useForm,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import * as z from "zod";
import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { Textarea } from "~/app/_components/ui/textarea";
import { Card, CardContent } from "~/app/_components/ui/card";
import { Switch } from "~/app/_components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/_components/ui/tabs";
import { Badge } from "~/app/_components/ui/badge";
import { Trash2, Plus, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/app/_components/ui/radio-group";
import { Separator } from "~/app/_components/ui/separator";
import { ruleSchema, rulePartSchema } from "~/utils/rules/rules.schema";
import { toast } from "sonner";
import type { ReactNode } from "react";

type RuleFormValues = z.infer<typeof ruleSchema>;
type RulePart = z.infer<typeof rulePartSchema>;

export function RuleForm() {
  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      description: "",
      active: false,
      parts: [],
      action: "block",
      alert: false,
      reason: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parts",
  });

  function onSubmit(values: RuleFormValues) {
    // In a real application, you would send this data to your API
    console.log(values);

    // Show a success toast instead of an alert
    toast.success("Rule created successfully", {
      description: `Rule "${values.name}" has been created and is ${values.active ? "active" : "inactive"}.`,
    });

    // Reset the form after successful submission
    form.reset();
  }

  const addRulePart = (type: RulePart["rulePartType"]) => {
    switch (type) {
      case "role":
        append({ rulePartType: "role", roles: [""] });
        break;
      case "amountUsdRange":
        append({ rulePartType: "amountUsdRange", min: null, max: null });
        break;
      case "transactionVelocity":
        append({
          rulePartType: "transactionVelocity",
          windowSize: { type: "thisDay" },
          count: 1,
        });
        break;
      case "transactionAmount":
        append({
          rulePartType: "transactionAmount",
          windowSize: { type: "thisDay" },
          amount: 0.01,
        });
        break;
      case "travelingSpeed":
        append({ rulePartType: "travelingSpeed", maxKmh: 100 });
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <TabsContent value="basic" className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rule Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter rule name" {...field} />
                        </FormControl>
                        <FormDescription>
                          A descriptive name for your transaction rule.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a description for this rule"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional description to help others understand this
                          rule.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Active Status
                          </FormLabel>
                          <FormDescription>
                            Enable or disable this rule.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="conditions" className="mt-4 space-y-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Rule Conditions</h3>
                    <p className="text-muted-foreground text-sm">
                      Add conditions that will be evaluated together (AND
                      logic). All conditions must match for the rule to trigger.
                    </p>
                  </div>

                  {fields.length > 0 ? (
                    <div className="space-y-6">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="relative rounded-lg border p-4 pt-6"
                        >
                          <Badge className="bg-primary absolute -top-2 left-4">
                            {field.rulePartType === "role" && "User Role"}
                            {field.rulePartType === "amountUsdRange" &&
                              "Amount Range (USD)"}
                            {field.rulePartType === "transactionVelocity" &&
                              "Transaction Velocity (Count)"}
                            {field.rulePartType === "transactionAmount" &&
                              "Transaction Velocity (Amount)"}
                            {field.rulePartType === "travelingSpeed" &&
                              "Traveling Speed"}
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 right-2 h-8 w-8"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove condition</span>
                          </Button>

                          {field.rulePartType === "role" && (
                            <RoleRulePart index={index} />
                          )}
                          {field.rulePartType === "amountUsdRange" && (
                            <AmountRangeRulePart index={index} />
                          )}
                          {field.rulePartType === "transactionVelocity" && (
                            <TransactionVelocityRulePart index={index} />
                          )}
                          {field.rulePartType === "transactionAmount" && (
                            <TransactionAmountRulePart index={index} />
                          )}
                          {field.rulePartType === "travelingSpeed" && (
                            <TravelingSpeedRulePart index={index} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <AlertCircle className="text-muted-foreground h-8 w-8" />
                        <h3 className="font-medium">No conditions added</h3>
                        <p className="text-muted-foreground text-sm">
                          Add at least one condition using the buttons below.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRulePart("role")}
                    >
                      <Plus className="mr-1 h-4 w-4" /> User Role
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRulePart("amountUsdRange")}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Amount Range
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRulePart("transactionVelocity")}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Transaction Velocity
                      (Count)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRulePart("transactionAmount")}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Transaction Velocity
                      (Amount)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRulePart("travelingSpeed")}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Traveling Speed
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="mt-4 space-y-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Rule Actions</h3>
                    <p className="text-muted-foreground text-sm">
                      Define what happens when this rule is triggered.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="action"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Action</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="approve" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Approve Transaction
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="block" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Block Transaction
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="hold" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hold for Review
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Transaction exceeds daily limit"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This reason will be shown to users when their
                          transaction is affected.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Create Alert
                          </FormLabel>
                          <FormDescription>
                            Generate an alert ticket when this rule is
                            triggered.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <div className="flex justify-end">
                  <Button type="submit">Create Rule</Button>
                </div>
              </form>
            </Form>
          </FormProvider>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Component for Role rule part
function RoleRulePart({ index }: { index: number }): ReactNode {
  const { watch, setValue } = useFormContext<RuleFormValues>();
  const currentRoles = watch(`parts.${index}.roles`) || [];

  const addRole = () => {
    setValue(`parts.${index}.roles`, [...currentRoles, ""]);
  };

  const removeRole = (roleIndex: number) => {
    setValue(
      `parts.${index}.roles`,
      currentRoles.filter((_: string | null, i: number) => i !== roleIndex),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormDescription>
          Transaction will be evaluated against specified user roles
        </FormDescription>
        <Button type="button" variant="outline" size="sm" onClick={addRole}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>
      {currentRoles.map((value: string | null, roleIndex: number) => (
        <div key={roleIndex} className="flex items-center gap-2">
          <FormField
            name={`parts.${index}.roles.${roleIndex}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter role"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeRole(roleIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

// Component for Amount Range rule part
function AmountRangeRulePart({ index }: { index: number }): ReactNode {
  return (
    <div className="space-y-4">
      <FormDescription>
        Transaction amount must be within the specified range
      </FormDescription>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name={`parts.${index}.min`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Amount (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`parts.${index}.max`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Amount (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// Component for Transaction Velocity rule part
function TransactionVelocityRulePart({ index }: { index: number }): ReactNode {
  return (
    <div className="space-y-4">
      <FormDescription>
        Number of transactions within a time period
      </FormDescription>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name={`parts.${index}.count`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Count</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`parts.${index}.windowSize.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Period</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="thisDay">This Day</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// Component for Transaction Amount rule part
function TransactionAmountRulePart({ index }: { index: number }): ReactNode {
  return (
    <div className="space-y-4">
      <FormDescription>
        Total transaction amount within a time period
      </FormDescription>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name={`parts.${index}.amount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Amount (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`parts.${index}.windowSize.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Period</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="thisDay">This Day</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// Component for Traveling Speed rule part
function TravelingSpeedRulePart({ index }: { index: number }): ReactNode {
  return (
    <div className="space-y-4">
      <FormDescription>
        Maximum allowed traveling speed between transactions
      </FormDescription>
      <FormField
        name={`parts.${index}.maxKmh`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Speed (km/h)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="1"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
