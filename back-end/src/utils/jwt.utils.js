// const jwt = require("jsonwebtoken");

// exports.verifyToken = (token) =>
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// exports.createToken = (data) => {
//   const expiresIn = 60 * 60 * 24 * 7;
//   return jwt.sign({ userId: data }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: expiresIn,
//   });
// };

const jwt = require("jsonwebtoken");

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

exports.createToken = async (user) => {
  const expiresIn = 60 * 60 * 24 * 7;
  return await jwt.sign(
    {
      id: user.user_id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      device_id: user.device_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: expiresIn,
    }
  );
};
