import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { SignupSchema } from "@/schema/signup.schema.js";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "@/hooks/useSignup.hook.js";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginRedirect() {
  return (
    <Button variant="secondary" asChild>
      <Link to="/">Login Here</Link>
    </Button>
  );
}

export default function Signup() {
  /* Use the Mutation hook */
  const { mutate, isLoading, isError, isSuccess } = useSignup();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  /** Function to handle what will happen when the form is submitted */
  function onSubmit(values) {
    mutate(values);
    form.reset();
  }

  /* Use Effect for success */
  useEffect(() => {
    /* Setup code */
    if (isSuccess) {
      toast({
        title: "User Created Successfully",
        description: "You can not login and start creating tasks",
        action: <LoginRedirect />,
      });
    }
  }, [isSuccess]);

  /* Use Effect for error */
  useEffect(() => {
    /* Setup code */
    if (isError) {
      toast({
        title: "Uh Ho! Your request failed",
        description: "Possibly the user already exists",
        variant: "destructive",
      });
    }
  }, [isError]);

  return (
    <section className="flex flex-row max-w-screen-xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account to start creating tasks
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <p className="basis-1/2">
                  Already have an account?{" "}
                  <Link className="text-blue-500 hover:text-blue-700" to="/">
                    Login Here
                  </Link>
                </p>
                <Button type="submit">Signup</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <Toaster />
    </section>
  );
}
