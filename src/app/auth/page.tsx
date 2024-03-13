"use client";

import { login, verifyOtp } from "./actions";
import * as React from "react";
import { toast as toastSonner } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSendCode = async () => {
    const error = await login(email);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please wait and try again.",
      });
      return;
    }
    setCodeSent(true);
    toastSonner("One-Time password sent", {
      description: "Please, check your mailbox",
    });
  };

  const handleSubmitCode = async () => {
    const error = await verifyOtp(email, otp);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please wait and try again.",
      });
      return;
    }
    toastSonner("Welcome back!", {
      description: "We were waiting for you",
    });
    router.push("/me");
  };

  return (
    <section className="items-center justify-center flex mt-52">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Passwordless authentication.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Your email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              {codeSent && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otp">One-Time password</Label>
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={otp}
                    onChange={(value: string) => setOtp(value)}
                    render={({ slots }: any) => (
                      <InputOTPGroup>
                        {slots.map((slot: any, index: any) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleSendCode}
            className={`relative ${codeSent ? "" : "hidden"}`}
            disabled={!email}
          >
            Resend
          </Button>
          <Button
            onClick={codeSent ? handleSubmitCode : handleSendCode}
            disabled={!email || (codeSent && !otp)}
          >
            {codeSent ? "Submit" : "Send access code"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
