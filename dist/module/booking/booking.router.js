"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
// import { BookingValidation } from './booking.validation';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const bookingRouter = (0, express_1.Router)();
// Create a new booking (accessible by students)
bookingRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user), 
//   validateRequest(BookingValidation.createBookingSchema),
booking_controller_1.bookingController.createBooking);
// Get all bookings (accessible by students and tutors)
bookingRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.tutor), booking_controller_1.bookingController.getBookings);
// Get a single booking by ID (accessible by students and tutors)
bookingRouter.get('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.tutor), booking_controller_1.bookingController.getSingleBooking);
// Update a booking (accessible by students and tutors)
bookingRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.tutor), 
//   validateRequest(BookingValidation.updateBookingSchema),
booking_controller_1.bookingController.updateBooking);
// Delete a booking (accessible by students)
bookingRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user), booking_controller_1.bookingController.deleteBooking);
exports.default = bookingRouter;
