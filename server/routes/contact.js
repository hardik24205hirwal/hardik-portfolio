const express = require("express");

const Contact = require("../models/Contact");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| POST /api/contact
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validate required fields
    |--------------------------------------------------------------------------
    */

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required."
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate email
    |--------------------------------------------------------------------------
    */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Save contact information
    |--------------------------------------------------------------------------
    */

    const contact = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    });

    /*
    |--------------------------------------------------------------------------
    | Success response
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: {
        id: contact._id
      }
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message. Please try again."
    });
  }
});

module.exports = router;
