import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
// import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const bookingRouter = Router();

// Create a new booking (accessible by students)
bookingRouter.post(
  '/',
  auth(USER_ROLE.user),
//   validateRequest(BookingValidation.createBookingSchema),
  bookingController.createBooking,
);

// Get all bookings (accessible by students and tutors)
bookingRouter.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.tutor),
  bookingController.getBookings,
);

// Get a single booking by ID (accessible by students and tutors)
bookingRouter.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.tutor),
  bookingController.getSingleBooking,
);

// Update a booking (accessible by students and tutors)
bookingRouter.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.tutor),
//   validateRequest(BookingValidation.updateBookingSchema),
  bookingController.updateBooking,
);

// Delete a booking (accessible by students)
bookingRouter.delete(
  '/:id',
  auth(USER_ROLE.user),
  bookingController.deleteBooking,
);

export default bookingRouter;