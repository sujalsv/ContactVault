const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

// Define a route for GET requests to the root path
router.route("/").get(getContacts).post(createContact);

//In create contact we will pass a body form the client but without bodyparser the request body will be undefined because whenever you need to accept the data from the client to our server we need to use a body parser so that we can use the stream of the data that we are receiving from the client. for that we have to make use of a middleware and express provide us with middleware for json object (see server.js)

// router.route("/").post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;
