import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";

const loginSchema = z.object({
  identifier: z.string().min(3, "Email or username is required"),
  password: z.string().min(8, "At least 8 characters required"),
});

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "At least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { signup, login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: isLogin
      ? { identifier: "", password: "" }
      : { username: "", email: "", password: "" },
    mode: "onTouched",
  });

  type LoginFormData = z.infer<typeof loginSchema>;
  type SignupFormData = z.infer<typeof signupSchema>;

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    let success = false;
    if (isLogin) {
      const loginData = data as LoginFormData;
      success = await login(loginData.identifier, loginData.password);
    } else {
      const signupData = data as SignupFormData;
      success = await signup(
        signupData.username,
        signupData.email,
        signupData.password
      );
    }
    if (success) {
      toast.success(
        isLogin ? "Welcome back!" : "Account created successfully!"
      );
      navigate("/", { replace: true });
    } else {
      const errorMsg = useAuthStore.getState().error;
      toast.error(
        errorMsg || (isLogin ? "Failed to login" : "Failed to sign up")
      );
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    reset();
  };

  return (
    <main className="bg-background bg-auth-pattern flex min-h-screen items-center justify-center p-6 lg:px-8">
      <div className="bg-card w-full max-w-[350px] space-y-6 rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your email below to create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isLogin ? (
            <div className="space-y-2">
              <FormField
                label="Email or Username"
                error={errors.identifier?.message}
                id="identifier"
              >
                <Input
                  {...register("identifier")}
                  id="identifier"
                  placeholder="Enter email or username"
                />
              </FormField>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <FormField
                  label="Username"
                  error={errors.username?.message}
                  id="username"
                >
                  <Input
                    {...register("username")}
                    id="username"
                    placeholder="Choose a username"
                  />
                </FormField>
              </div>
              <div className="space-y-2">
                <FormField
                  label="Email"
                  error={errors.email?.message}
                  id="email"
                >
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormField>
              </div>
            </>
          )}

          <div className="space-y-2">
            <FormField
              label="Password"
              error={errors.password?.message}
              id="password"
            >
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter password"
              />
            </FormField>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isDirty || !isValid}
          >
            {isSubmitting ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={toggleMode}
            className="hover:text-primary font-medium underline underline-offset-4"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
