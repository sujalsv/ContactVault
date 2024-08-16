const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc get all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc create all contacts
//@route POST /api/contacts
//@access Private

const createContact = asyncHandler(async (req, res) => {
  console.log("the req body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are compulsory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact); // Changed to 201
});

// @desc GET contact
//@route GET /api/contacts/:id
//@access Private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// @desc update contact
//@route POST /api/contacts/:id
//@access Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You can not delete this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc delete contact
//@route POST /api/contacts/:id
//@access Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You can not delete this contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Contact removed successfully" });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

//whenever we interact with mongodb we get a promise, so to resolve that promise we need async. we also need try catch block in every block so  to handle error in async , there is express middleware express async handlerto handle the exceptions in express async routes and then it will pass it to express error handler
