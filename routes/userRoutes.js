const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;

// module.exports = router;
// const express = require("express");
// const router = express.Router();

// router.post("/register", (req,res)=>{
//     res.json({messsage:"register the user"});
// });
// router.post("/login", (req,res)=>{
//     res.json({messsage:" user login"});
// });
// router.get("/current", (req,res)=>{
//     res.json({messsage:"current user info"});
// });

// module.exports = router;

//previous before making usercontroller.js
