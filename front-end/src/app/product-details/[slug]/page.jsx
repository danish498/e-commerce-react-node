"use client";

import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { likeIcon } from "@/assets/icons/Main";
import { IoHeart } from "react-icons/io5";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setInCart(true);
  };

  const handleDelete = () => {
    setInCart(false);
    setQuantity(1); // Reset quantity when item is deleted
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <figure className="lg:w-1/4 w-full">
            <img
              alt="ecommerce"
              className="w-full object-cover object-center rounded border border-gray-200"
              src="https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </figure>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              Espresso
            </h1>
            <div className="flex mb-4 ">
              <span className="flex items-center">
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="mb-5 mt-6 pb-5 border-b-2 border-gray-200  leading-relaxed">
              An espresso shot can be served alone or used as a base for most
              coffee drinks, such as lattes and macchiatos.
            </p>
            <div className="flex md:mt-11 justify-between">
              <span className="title-font font-medium text-2xl text-gray-900">
                
                ₹58.00
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={handleDecrement}
                    class="flex items-center justify-center  bg-secondary hover:bg-primary px-2.5 py-1 text-center text-sm font-medium text-white rounded-full"
                  >
                    -
                  </button>
                  <p className="mx-2">{quantity}</p>
                  <button
                    onClick={handleIncrement}
                    class="flex items-center justify-center rounded-full bg-secondary hover:bg-primary px-2.5 py-1 text-center text-sm font-medium text-white"
                  >
                    +
                  </button>
                </div>
              </div>
              <button class="flex items-center justify-center rounded-md bg-secondary px-3 py-1 text-white text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <button
                className={`rounded-full w-10 h-10 ${
                  isHovered ? "bg-red-200" : "bg-gray-200"
                } p-0 border-0 flex items-center justify-center text-${
                  isHovered ? "red" : "gray"
                }-500 ml-4`}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                {isHovered ? (
                  <IoHeart size={22} fill="red" /> // Change fill color for the heart icon
                ) : (
                  <CiHeart size={22} fill="gray" /> // Change fill color for the heart icon
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
