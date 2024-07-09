import React from "react";
import ProductBoxDesktop from "../products/ProductCardDesktop";

const WishList = () => {
  return (
    <div className="container m-10">
      <div className="mb-10 mt-5">
        <p className="text-3xl font-bold text-primary" >You Favorites Coffee Here</p>
        <p  className="text-lg font-semibold" >What are you waiting for please do oder of experice a </p>
      </div>

      <ProductBoxDesktop isFav={true} />
    </div>
  );
};

export default WishList;
