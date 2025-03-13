import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

// Process a payment for a booking
const processPayment = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new Error('User is not authenticated');
  }

  const payload = {
    ...req.body,
    student: req.user.id, // Authenticated student is making the payment
  };

  const result = await paymentService.processPayment(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Payment processed successfully',
    data: result,
  });
});

// Get payment details by ID
const getPayment = catchAsync(async (req, res) => {
  const paymentId = req.params.id;
  const result = await paymentService.getPayment(paymentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payment fetched successfully',
    data: result,
  });
});

// Get all payments for a user (student or tutor)
const getPayments = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  const result = await paymentService.getPayments(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payments fetched successfully',
    data: result,
  });
});

export const paymentController = {
  processPayment,
  getPayment,
  getPayments,
};