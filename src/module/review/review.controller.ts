import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './review.service';

// Create a review for a tutor
const createReview = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new Error('User is not authenticated');
  }

  const payload = {
    ...req.body,
    student: req.user.id, // Authenticated student is writing the review
  };

  const result = await reviewService.createReview(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

// Get all reviews for a tutor
const getReviews = catchAsync(async (req, res) => {
  const tutorId = req.params.tutorId;
  const result = await reviewService.getReviews(tutorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

// Update a review
const updateReview = catchAsync(async (req, res) => {
  const reviewId = req.params.id;
  const body = req.body;

  const result = await reviewService.updateReview(reviewId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review updated successfully',
    data: result,
  });
});

// Delete a review
const deleteReview = catchAsync(async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user?.id;

  await reviewService.deleteReview(reviewId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review deleted successfully',
    data: {},
  });
});

export const reviewController = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};