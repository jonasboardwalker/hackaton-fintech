"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Card, CardContent } from "../ui/card"
import { Switch } from "../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Rule name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a rule type.",
  }),
  condition: z.string().min(5, {
    message: "Condition must be at least 5 characters.",
  }),
  action: z.string({
    required_error: "Please select an action.",
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

export function RuleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      condition: "",
      description: "",
      isActive: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would typically send the data to your API
    console.log(values)
    // For demo purposes, we'll just show an alert
    alert("Rule created successfully!")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter rule name" {...field} />
                      </FormControl>
                      <FormDescription>A descriptive name for your transaction rule.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a rule type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="time-based">Time-Based</SelectItem>
                          <SelectItem value="role-based">Role-Based</SelectItem>
                          <SelectItem value="geo-based">Geo-Based</SelectItem>
                          <SelectItem value="frequency">Frequency/Velocity</SelectItem>
                          <SelectItem value="amount">Amount-Based</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The category of rule you want to create.</FormDescription>
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
                        <Textarea placeholder="Enter a description for this rule" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>Optional description to help others understand this rule.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>Enable or disable this rule.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="conditions" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Amount > $1000 AND Time is outside 9AM-5PM"
                          className="resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Define the conditions that will trigger this rule.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Time Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="business-hours" />
                        <label htmlFor="business-hours">Business Hours Only (9AM-5PM)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="weekdays" />
                        <label htmlFor="weekdays">Weekdays Only</label>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Role Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="junior-staff" />
                        <label htmlFor="junior-staff">Junior Staff</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="support-agents" />
                        <label htmlFor="support-agents">Support Agents</label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="actions" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="block">Block Transaction</SelectItem>
                          <SelectItem value="approve">Approve Transaction</SelectItem>
                          <SelectItem value="require-approval">Require Approval</SelectItem>
                          <SelectItem value="alert">Generate Alert</SelectItem>
                          <SelectItem value="limit">Apply Limit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>What should happen when this rule is triggered?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notify" />
                      <label htmlFor="email-notify">Send Email Notification</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="slack-notify" />
                      <label htmlFor="slack-notify">Send Slack Notification</label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <div className="flex justify-end">
                <Button type="submit">Create Rule</Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

