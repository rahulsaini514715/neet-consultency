// Controller/consultancyController.js

import ConsultationBooking from "../Model/ConsultationBooking.js";
import Counselor from "../Model/Counselor.js";
import ConsultationHistory from "../Model/ConsultationHistory.js";
import sendResponse from "../helper/responseHelper.js";
import Testimonial from "../Model/Testimonial.js";
import ContactMessage from "../Model/ContactMessage.js";


//////////////////////////////////////////////////////////
// CREATE CONSULTATION
//////////////////////////////////////////////////////////

export const createConsultationBooking =
  async (req, res) => {

    try {

      const {
        fullName,
        phone,
        date,
        time,
        notes,
      } = req.body;

      ////////////////////////////////////////////////////
      // VALIDATION
      ////////////////////////////////////////////////////

      if (
        !fullName ||
        !phone ||
        !date ||
        !time
      ) {

        return sendResponse(
          res,
          400,
          false,
          "Missing required fields"
        );
      }

      ////////////////////////////////////////////////////
      // CREATE CONSULTATION
      ////////////////////////////////////////////////////

      const consultation =
        new ConsultationBooking({
          fullName,
          phone,
          date,
          time,
          notes,
        });

      await consultation.save();

      return sendResponse(
        res,
        201,
        true,
        "Consultation booked successfully",
        consultation
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };
//////////////////////////////////////////////////////////
// GET ALL CONSULTATIONS
//////////////////////////////////////////////////////////

export const getAllConsultationBookings =
  async (req, res) => {

    try {

      const consultations =
        await ConsultationBooking.find();

      if (
        !consultations ||
        consultations.length === 0
      ) {

        return sendResponse(
          res,
          404,
          false,
          "No consultation found"
        );
      }

      return sendResponse(
        res,
        200,
        true,
        "Consultations fetched",
        consultations
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// GET USER CONSULTATIONS
//////////////////////////////////////////////////////////

export const getUserConsultationBookings =
  async (req, res) => {

    try {

      const consultations =
        await ConsultationBooking.find({
          user: req.user._id,
        });

      return sendResponse(
        res,
        200,
        true,
        "User consultations fetched",
        consultations
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// GET SINGLE CONSULTATION
//////////////////////////////////////////////////////////

export const getConsultationBookingById =
  async (req, res) => {

    try {

      const consultation =
        await ConsultationBooking.findById(
          req.params.id
        );

      if (
        !consultation
      ) {

        return sendResponse(
          res,
          404,
          false,
          "Consultation not found"
        );
      }

      return sendResponse(
        res,
        200,
        true,
        "Consultation fetched",
        consultation
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// UPDATE STATUS
//////////////////////////////////////////////////////////

export const updateConsultationStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        status,
        consultantName,
        price,
      } = req.body;

      const consultation =
        await ConsultationBooking.findById(
          id
        );

      if (!consultation) {

        return sendResponse(
          res,
          404,
          false,
          "Consultation not found"
        );
      }

      ////////////////////////////////////////////////////
      // UPDATE FIELDS
      ////////////////////////////////////////////////////

      if (status !== undefined) {
        consultation.status =
          status;
      }

      if (
        consultantName !==
        undefined
      ) {
        consultation.consultantName =
          consultantName;
      }

      if (price !== undefined) {
        consultation.price =
          price;
      }

      await consultation.save();

      ////////////////////////////////////////////////////
      // SAVE HISTORY
      ////////////////////////////////////////////////////

      if (
        status === "completed"
      ) {

        const history =
          new ConsultationHistory({
            consultation:
              consultation._id,

            studentName:
              consultation.fullName,

            completedAt:
              new Date(),
          });

        await history.save();
      }

      return sendResponse(
        res,
        200,
        true,
        "Consultation updated",
        consultation
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };
  
//////////////////////////////////////////////////////////
// DELETE CONSULTATION
//////////////////////////////////////////////////////////

export const deleteConsultationBooking =
  async (req, res) => {

    try {

      const consultation =
        await ConsultationBooking.findByIdAndDelete(
          req.params.id
        );

      if (!consultation) {

        return sendResponse(
          res,
          404,
          false,
          "Consultation not found"
        );
      }

      return sendResponse(
        res,
        200,
        true,
        "Consultation deleted successfully"
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

// -------------------------------------------------------------------------------------
// controllers/contactController.js

// ================= CREATE MESSAGE =================
export const createContactMessage = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // validation
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create message
    const newMessage = await ContactMessage.create({
      name,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ================= GET ALL MESSAGES =================
export const getAllMessages = async (req, res) => {
  try {

    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ================= GET SINGLE MESSAGE =================
export const getSingleMessage = async (req, res) => {
  try {

    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ================= UPDATE STATUS =================
export const updateMessageStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedMessage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ================= DELETE MESSAGE =================
export const deleteMessage = async (req, res) => {
  try {

    const deletedMessage = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// --------------------------------------------------------------------------------------

//////////////////////////////////////////////////////////
// CONSULTATION HISTORY
//////////////////////////////////////////////////////////

export const getConsultationHistory =
  async (req, res) => {

    try {

      const history =
        await ConsultationHistory.find();

      return sendResponse(
        res,
        200,
        true,
        "Consultation history fetched",
        history
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// ASSIGN COUNSELOR
//////////////////////////////////////////////////////////

export const assignCounselor =
  async (req, res) => {

    try {

      const {
        consultationId,
      } = req.params;

      const {
        counselorId,
      } = req.body;

      ////////////////////////////////////////////////////
      // FIND CONSULTATION
      ////////////////////////////////////////////////////

      const consultation =
        await ConsultationBooking.findById(
          consultationId
        );

      if (!consultation) {

        return sendResponse(
          res,
          404,
          false,
          "Consultation not found"
        );
      }

      ////////////////////////////////////////////////////
      // FIND COUNSELOR
      ////////////////////////////////////////////////////

      const counselor = 
        await Counselor.findById(
          counselorId
        );

      if (!counselor) {

        return sendResponse(
          res,
          404,
          false,
          "Counselor not found"
        );
      }

      ////////////////////////////////////////////////////
      // ASSIGN COUNSELOR
      ////////////////////////////////////////////////////

      consultation.assignedCounselor =
        {
          name:
            counselor.name,

          phone:
            counselor.phone,
        };

      consultation.status =
        "approved";

      await consultation.save();

      return sendResponse(
        res,
        200,
        true,
        "Counselor assigned successfully",
        consultation
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };


  // --------------------------------------------------------------------------

  // controllers/testimonialController.js


//////////////////////////////////////////////////////////
// CREATE TESTIMONIAL
// ONLY LOGIN USER CAN ADD
//////////////////////////////////////////////////////////

export const createTestimonial =
  async (req, res) => {

    try {

      ////////////////////////////////////////////////////
      // CHECK LOGIN USER
      ////////////////////////////////////////////////////

      if (!req.user) {

        return sendResponse(
          res,
          401,
          false,
          "Please login first"
        );
      }

      const {
        username,
        college,
        text,
        rating,
      } = req.body;

      ////////////////////////////////////////////////////
      // VALIDATION
      ////////////////////////////////////////////////////

      if (
        !username ||
        !college ||
        !text
      ) {

        return sendResponse(
          res,
          400,
          false,
          "All fields are required"
        );
      }

      ////////////////////////////////////////////////////
      // RATING VALIDATION
      ////////////////////////////////////////////////////

      if (
        rating &&
        (rating < 1 || rating > 5)
      ) {

        return sendResponse(
          res,
          400,
          false,
          "Rating must be between 1 to 5"
        );
      }

      ////////////////////////////////////////////////////
      // CREATE TESTIMONIAL
      ////////////////////////////////////////////////////

      const testimonial =
        new Testimonial({
          username,
          college,
          text,
          rating,

          user: req.user._id,
        });

      await testimonial.save();

      return sendResponse(
        res,
        201,
        true,
        "Testimonial added successfully",
        testimonial
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// GET ALL TESTIMONIALS
//////////////////////////////////////////////////////////

export const getAllTestimonials =
  async (req, res) => {

    try {

      const testimonials =
        await Testimonial.find({
          status: "active",
        }).sort({
          createdAt: -1,
        });

      return sendResponse(
        res,
        200,
        true,
        "Testimonials fetched successfully",
        testimonials
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// GET SINGLE TESTIMONIAL
//////////////////////////////////////////////////////////

export const getTestimonialById =
  async (req, res) => {

    try {

      const testimonial =
        await Testimonial.findById(
          req.params.id
        );

      if (!testimonial) {

        return sendResponse(
          res,
          404,
          false,
          "Testimonial not found"
        );
      }

      return sendResponse(
        res,
        200,
        true,
        "Testimonial fetched successfully",
        testimonial
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// UPDATE TESTIMONIAL
//////////////////////////////////////////////////////////

export const updateTestimonial =
  async (req, res) => {

    try {

      const testimonial =
        await Testimonial.findById(
          req.params.id
        );

      if (!testimonial) {

        return sendResponse(
          res,
          404,
          false,
          "Testimonial not found"
        );
      }

      ////////////////////////////////////////////////////
      // ONLY OWNER CAN UPDATE
      ////////////////////////////////////////////////////

      if (
        testimonial.user?.toString() !==
        req.user._id.toString()
      ) {

        return sendResponse(
          res,
          403,
          false,
          "Unauthorized access"
        );
      }

      const {
        username,
        college,
        text,
        rating,
        status,
      } = req.body;

      testimonial.username =
        username || testimonial.username;

      testimonial.college =
        college || testimonial.college;

      testimonial.text =
        text || testimonial.text;

      testimonial.rating =
        rating || testimonial.rating;

      testimonial.status =
        status || testimonial.status;

      await testimonial.save();

      return sendResponse(
        res,
        200,
        true,
        "Testimonial updated successfully",
        testimonial
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };

//////////////////////////////////////////////////////////
// DELETE TESTIMONIAL
//////////////////////////////////////////////////////////

export const deleteTestimonial =
  async (req, res) => {

    try {

      const testimonial =
        await Testimonial.findById(
          req.params.id
        );

      if (!testimonial) {

        return sendResponse(
          res,
          404,
          false,
          "Testimonial not found"
        );
      }

      ////////////////////////////////////////////////////
      // ONLY OWNER CAN DELETE
      ////////////////////////////////////////////////////

      if (
        testimonial.user?.toString() !==
        req.user._id.toString()
      ) {

        return sendResponse(
          res,
          403,
          false,
          "Unauthorized access"
        );
      }

      await Testimonial.findByIdAndDelete(
        req.params.id
      );

      return sendResponse(
        res,
        200,
        true,
        "Testimonial deleted successfully"
      );

    } catch (err) {

      console.log(err);

      return sendResponse(
        res,
        500,
        false,
        "Server error"
      );
    }
  };