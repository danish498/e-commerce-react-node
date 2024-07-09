"use client";

import React, { useEffect } from "react";

import { likeIcon, starIcon, viewEyeIcon } from "../../assets/icons/Main";
import ProductBoxMobile from "./ProductCardMobile";
import ProductBoxDesktop from "./ProductCardDesktop";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProduct } from "./service";
import { productItems } from "./data";

const Products = () => {
  console.log(productItems);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProduct();
      } catch (error) {
        console.log("Error Product", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-10">
        <div className=" ">
          <h4 className="mx-14 text-3xl font-semibold text-primary mb-5">
            Order your Favorite Coffee Here
          </h4>
          <div className="flex justify-between gap-5 flex-col md:flex-row mx-14">
            {" "}
            <Input placeholder="Search the product..." />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder=" Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Cold">Cold Coffee</SelectItem>
                  <SelectItem value="Hot">Hot COffee</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className=" flex flex-wrap items-center justify-center gap-4">
          {productItems.map((item, index) => {
            return <ProductBoxDesktop key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
