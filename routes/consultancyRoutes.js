// routes/consultancyRoutes.js

import express from "express";

import {
  authenticateUser,
} from "../Middleware/authentication.js";

import {
  createConsultationBooking,
  getAllConsultationBookings,
  getUserConsultationBookings,
  getConsultationBookingById,
  updateConsultationStatus,
  deleteConsultationBooking,
  getConsultationHistory,
  assignCounselor,
  deleteTestimonial,
  updateTestimonial,
  getTestimonialById,
  getAllTestimonials,
  createTestimonial,
  deleteMessage,
  updateMessageStatus,
  getSingleMessage,
  getAllMessages,
  createContactMessage,
} from "../Controller/consultancyController.js";
import { loginUser, Signup } from "../Controller/authController.js";

const router = express.Router();



//////////////////////////////////////////////////////////
// AUTH ROUTES
//////////////////////////////////////////////////////////

// CREATE ACCOUNT
router.post(
  "/signup",
  Signup
);

// LOGIN ACCOUNT
router.post(
  "/login",
  loginUser
);


//////////////////////////////////////////////////////////
// USER ROUTES
//////////////////////////////////////////////////////////

// BOOK CONSULTATION
router.post(
  "/bookConsultation",
  createConsultationBooking
);

// GET USER CONSULTATIONS
router.get(
  "/myConsultations",
  authenticateUser,
  getUserConsultationBookings
);

// GET SINGLE CONSULTATION
router.get(
  "/consultation/:id",
  authenticateUser,
  getConsultationBookingById
);

//////////////////////////////////////////////////////////
// ADMIN ROUTES
//////////////////////////////////////////////////////////

// GET ALL CONSULTATIONS
router.get(
  "/allConsultations",
  authenticateUser,
  getAllConsultationBookings
);

// UPDATE CONSULTATION STATUS
router.put(
  "/updateConsultation/:id",
  authenticateUser,
  updateConsultationStatus
);

// DELETE CONSULTATION
router.delete(
  "/deleteConsultation/:id",
  authenticateUser,
  deleteConsultationBooking
);

// GET CONSULTATION HISTORY
router.get(
  "/consultationHistory",
  authenticateUser,
  getConsultationHistory
);

// ASSIGN COUNSELOR
router.put(
  "/assignCounselor/:consultationId",
  authenticateUser,
  assignCounselor
);


router.post(
  "/testimonial-create",
  authenticateUser,
  createTestimonial
);

//////////////////////////////////////////////////////////
// GET ALL TESTIMONIALS
//////////////////////////////////////////////////////////

router.get(
  "/testimonial-all",
  getAllTestimonials
);

//////////////////////////////////////////////////////////
// GET SINGLE TESTIMONIAL
//////////////////////////////////////////////////////////

router.get(
  "/testimonial/:id",
  getTestimonialById
);

//////////////////////////////////////////////////////////
// UPDATE TESTIMONIAL
//////////////////////////////////////////////////////////

router.put(
  "/testimonial-update/:id",
  authenticateUser,
  updateTestimonial
);

//////////////////////////////////////////////////////////
// DELETE TESTIMONIAL
//////////////////////////////////////////////////////////

router.delete(
  "/testimonial-delete/:id",
  authenticateUser,
  deleteTestimonial
);


// --------------------------------------------------------------------------------------
// CREATE MESSAGE
router.post("/message-create", createContactMessage);

// GET ALL MESSAGES
router.get("/messages", getAllMessages);

// GET SINGLE MESSAGE
router.get("/message/:id", getSingleMessage);

// UPDATE STATUS
router.put("/message-status-update/:id", updateMessageStatus);

// DELETE MESSAGE
router.delete("/message-delete/:id", deleteMessage);

// ------------------------------------------------------------------------------------------


export default router;