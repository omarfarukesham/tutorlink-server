import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';

// Create a new booking
const createBooking = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new Error('User is not authenticated');
  }

  const payload = {
    ...req.body,
    student: req.user.id, // Authenticated student is the one making the booking
  };

  const result = await bookingService.createBooking(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Booking created successfully',
    data: result,
  });
});

// Get all bookings for a user (student or tutor)
const getBookings = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  const result = await bookingService.getBookings(userId, role, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Bookings fetched successfully',
    data: result,
  });
});

// Get a single booking by ID
const getSingleBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const result = await bookingService.getSingleBooking(bookingId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Booking fetched successfully',
    data: result,
  });
});

// Update a booking (e.g., change status)
const updateBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const body = req.body;

  const result = await bookingService.updateBooking(bookingId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Booking updated successfully',
    data: result,
  });
});

// Delete a booking
const deleteBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user?.id;

  await bookingService.deleteBooking(bookingId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Booking deleted successfully',
    data: {},
  });
});

export const bookingController = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};