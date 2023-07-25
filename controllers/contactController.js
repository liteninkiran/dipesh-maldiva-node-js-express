const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

// @desc Get a contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    // Find contact
    const contact = await Contact.findById(req.params.id);

    // Check if contact exists
    if (!contact) {
        res.status(404);
        throw new Error(`Contact ${req.params.id} not found`);
    }

    // Return the contact
    res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    // Find contact
    const contact = await Contact.findById(req.params.id);

    // Check if contact exists
    if (!contact) {
        res.status(404);
        throw new Error(`Contact ${req.params.id} not found`);
    }

    // Check if user is allowed to update the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`User does not have permission to update contact ${req.params.id}`);
    }

    // Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Return the updated contact
    res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    // Find contact
    const contact = await Contact.findById(req.params.id);

    // Check if contact exists
    if (!contact) {
        res.status(404);
        throw new Error(`Contact ${req.params.id} not found`);
    }

    // Check if user is allowed to delete the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`User does not have permission to delete contact ${req.params.id}`);
    }

    // Delete the contact
    await Contact.deleteOne({ _id: req.params.id });

    // Return the updated contact
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
