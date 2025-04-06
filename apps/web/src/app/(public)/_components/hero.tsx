import {
  ArrowUpRight,
  CirclePlay,
  ShieldCheck,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "~/app/_components/ui/badge";
import { Button } from "~/app/_components/ui/button";

const Hero = () => {
  return (
    <div className="border-accent flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-x-10 gap-y-14 px-6 py-12 lg:flex-row lg:py-0">
        <div className="max-w-xl">
          <Badge className="rounded-full border-none bg-emerald-100 py-1 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
            Launching at Hackathon 2025
          </Badge>
          <h1 className="xs:text-4xl mt-6 max-w-[20ch] text-3xl !leading-[1.2] font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Smart Transaction Throttling for Fintechs
          </h1>
          <p className="xs:text-lg text-muted-foreground mt-6 max-w-[60ch]">
            TrustLimit is a real-time API + admin dashboard that helps fintechs
            enforce programmable transaction controls to prevent internal fraud,
            misuse, and compliance violations.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full rounded-full text-base sm:w-auto"
            >
              Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full text-base shadow-none sm:w-auto"
            >
              <CirclePlay className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="relative aspect-square w-full rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-1 lg:max-w-lg xl:max-w-xl dark:from-emerald-950 dark:to-emerald-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full p-8">
              <div className="absolute top-0 right-0 left-0 rounded-t-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-sm font-medium">
                    TrustLimit Dashboard
                  </div>
                </div>
              </div>

              <div className="absolute top-16 right-0 bottom-0 left-0 overflow-hidden bg-gray-50 p-4 dark:bg-gray-900">
                <div className="flex flex-col space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center">
                      <ShieldCheck className="mr-2 h-5 w-5 text-emerald-500" />
                      <span className="font-medium">Transaction Approved</span>
                      <Badge className="ml-auto">€2,500</Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      User: finance@company.com • 10:23 AM
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                      <span className="font-medium">Transaction Flagged</span>
                      <Badge className="ml-auto bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                        €8,000
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      User: marketing@company.com • 11:45 AM
                    </p>
                  </div>

                  <div className="rounded-lg border border-red-200 bg-white p-4 shadow-sm dark:border-red-900 dark:bg-gray-800">
                    <div className="flex items-center">
                      <Lock className="mr-2 h-5 w-5 text-red-500" />
                      <span className="font-medium">Transaction Blocked</span>
                      <Badge className="ml-auto bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                        €10,000
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      User: intern@company.com • 02:17 AM
                    </p>
                    <p className="mt-1 text-xs text-red-500">
                      Reason: Amount exceeds limit, unusual time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
