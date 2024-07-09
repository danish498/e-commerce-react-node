const db = require("../models");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const UserAddress = db.UserAddress;
const City = db.City;
const State = db.State;
const Country = db.Country;

const createUserAddress = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const {
    address,
    country_id,
    state_id,
    city_id,
    phone_number,
    postal_code,
    is_default,
  } = req.body;

  //   console.log("city_id state asdfj", country_id, state_id, city_id);

  const country = await Country.findByPk(country_id);
  const state = await State.findByPk(state_id);
  const city = await City.findByPk(city_id);

  if (!country) {
    throw new ApiError(404, "Country not found");
  }
  if (!state) {
    throw new ApiError(404, "State not found");
  }

  if (!city) {
    throw new ApiError(404, "City not found");
  }

  const defaultAddress = await UserAddress.findOne({
    where: {
      user_id: user.user_id,
      is_default: true,
    },
  });

  if (is_default == 1) {
    defaultAddress.is_default = false;
    await defaultAddress.save();
  }

  const userAddress = await UserAddress.create({
    address,
    country_id: country_id,
    state_id: state_id,
    city_id: city_id,
    phone_number,
    postal_code,
    is_default,
    user_id: user.user_id,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        userAddress: userAddress,
      },
      "User address created successfully"
    )
  );
});

const changeDefaultAddress = asyncHandler(async (req, res, next) => {
  const address_id = req.params.id;

  const { is_default } = req.body;

  const defaultAddress = await UserAddress.findOne({
    where: {
      is_default: true,
    },
  });

  if (defaultAddress) {
    defaultAddress.is_default = false;
    await defaultAddress.save();
  }

  const address = await UserAddress.update(
    {
      is_default: is_default,
    },

    {
      where: {
        user_address_id: address_id,
      },
    }
  );

  if (!address) {
    throw new ApiError(404, "Default address is not updated ");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        address: address,
      },
      "Default address updated"
    )
  );
});

const getUserAddress = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const allAddress = await UserAddress.findAll({
    where: {
      user_id: user.user_id,
    },
    include: [
      {
        model: Country,
        as: "CountryOfAddress",
        attributes: ["name"],
      },
      {
        model: State,
        as: "StateOfAddress",
        attributes: ["name"],
      },
      {
        model: City,
        as: "CityOfAddress",
        attributes: ["name"],
      },
    ],
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        addresses: allAddress,
      },
      "User address fetched successfully"
    )
  );
});

module.exports = {
  createUserAddress,
  getUserAddress,
  changeDefaultAddress,
};
