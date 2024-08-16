const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc register user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are compulsory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("user data not valid");
  }
  res.json({ messsage: "register the user" });
});

// @desc register user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are compulsory");
  }

  const user = await User.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
          //above is payload
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc register user
//@route GET /api/users/current
//@access Private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  //we have extracted req.user from validateTokenHandler
});

module.exports = { registerUser, loginUser, currentUser };

//learn more about hash password(bcrypt library)

// const asyncHandler = require("express-async-handler");

// const registerUser = asyncHandler(async (req, res) => {
//   res.json({ messsage: "register the user" });
// });

// const loginUser = asyncHandler(async (req, res) => {
//   res.json({ messsage: " user login" });
// });

// const currentUser = asyncHandler(async (req, res) => {
//   res.json({ messsage: "current user info" });
// });

// module.exports = { registerUser, loginUser, currentUser };
// before writing the functionality(taken body from userroutes.js)
