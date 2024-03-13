"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { toast as toastSonner } from "sonner";
import { useRouter } from "next/navigation";
import { login, verifyOtp } from "./actions";

type Props = {
  callback: string;
};

export default function SignInCard({ callback }: Props) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [submitOtpLoading, setSubmitOtpLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleSendCode = async () => {
    setDisableForm(true);
    setSendOtpLoading(true);
    const res = await login(email);
    const { error } = JSON.parse(res);
    setCounter(60);
    setSendOtpLoading(false);
    setDisableForm(false);
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
    setDisableForm(true);
    setSubmitOtpLoading(true);
    const res = await verifyOtp(email, otp);
    const { error } = JSON.parse(res);
    setSubmitOtpLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please wait and try again.",
      });
      setDisableForm(false);
      return;
    }
    router.push(callback);
    toastSonner("Welcome back!", {
      description: "We were waiting for you",
    });
  };

  return (
    <section className="items-center justify-center flex mt-32">
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
                  disabled={disableForm}
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
                    disabled={disableForm}
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
            disabled={!email || disableForm || counter > 0}
          >
            {sendOtpLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Resend {counter > 0 && `(${counter}s)`}
          </Button>
          <Button
            onClick={codeSent ? handleSubmitCode : handleSendCode}
            disabled={!email || (codeSent && !otp) || disableForm}
          >
            {((!codeSent && sendOtpLoading) ||
              (codeSent && submitOtpLoading)) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {codeSent ? "Submit" : "Send access code"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
