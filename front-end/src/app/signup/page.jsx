"use client";

import CoffeeLogin from "@/assets/coffee-login.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/validationSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

export default function SinUpPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await registerUser(data);
      console.log("response from SIGN UP Page", response);
    } catch (error) {
      console.log("Error from backend", error);
    }
  };

  console.log("check the error over here", errors);
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex gap-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="firstName"
                          placeholder=" Enter you First Name"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <span className="text-red-500 text-xs">
                            {errors.firstName.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="lastName"
                          type="lastName"
                          autoComplete="lastName"
                          placeholder=" Enter your Last Name"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <span className="text-red-500 text-xs">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder=" Enter your email address"
                        {...register("email")}
                      />

                      {errors.email && (
                        <span className="text-red-500 text-xs">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder=" Enter your password"
                        {...register("password")}
                      />
                      {errors.password && (
                        <span className="text-red-500 text-xs">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Image</Label>
                        <Input id="picture" type="file" />
                      </div>
                      {errors.image && (
                        <span className="text-red-500 text-xs">
                          {errors.image.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-end mt-1">
                    <Button
                      type="submit"
                      className="flex w-full justify-center text-white"
                    >
                      Sign Up
                    </Button>
                    <p className="text-slate-500">
                      Already an account ?{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => router.push("/login")}
                      >
                        login
                      </span>
                    </p>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={CoffeeLogin.src}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
