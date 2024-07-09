"use client";

import React, { useState } from "react";
import CheckOutAddressNew from "./new/page";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/ui/icons";

const CheckOutAddress = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleOnClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div class="bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-3xl mx-auto p-8">
        <div class=" dark:bg-gray-800 p-8  dark:border-gray-700">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>

          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              Shipping Address
            </h2>
          </div>

          <div>
            <RadioGroup>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col  justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex gap-3 items-center">
                  <p className="text-xl">Fatma Noor</p>
                  <p className="text-xl">+91 8547895254</p>
                </div>
                <div>
                  <p className="text-lg">Jamshedpur tata, Jharkhand 845265</p>
                </div>
                <Button className="mt-3 w-24"> Deliver Here</Button>
              </Label>
            </RadioGroup>
          </div>

          <Dialog className="flex justify-end">
            <DialogTrigger className="mt-10 flex " asChild>
              <Button variant="" className="bg-gray-200 hover:bg-gray-500">
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add new address</DialogTitle>
              </DialogHeader>

              <div class="mb-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="first_name"
                      class="block text-gray-700 dark:text-white mb-1"
                    >
                      First Name
                    </label>
                    <Input
                      placeholder="Enter your first name"
                      type="text"
                      id="first_name"
                      class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                  <div>
                    <label
                      for="last_name"
                      class="block text-gray-700 dark:text-white mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      type="text"
                      id="last_name"
                      placeholder="Enter you last name"
                      class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <label
                    for="address"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    Address
                  </label>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>

                <div class="mt-4">
                  <label
                    for="Mobile"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    Mobile
                  </label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="mobile"
                    autoComplete="mobile"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                <div class="mt-4">
                  <label
                    for="city"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    City
                  </label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                    class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      for="state"
                      class="block text-gray-700 dark:text-white mb-1"
                    >
                      State
                    </label>
                    <Input
                      type="text"
                      id="state"
                      placeholder="Enter you state"
                      class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                  <div>
                    <label
                      for="zip"
                      class="block text-gray-700 dark:text-white mb-1"
                    >
                      ZIP Code
                    </label>
                    <Input
                      type="text"
                      id="zip"
                      placeholder="Enter your pin code"
                      class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="text-white">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CheckOutAddress;
