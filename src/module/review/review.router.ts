import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewController } from './review.controller';
// import { ReviewValidation } from './review.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const reviewRouter = Router();

// Create a review (accessible by students)
reviewRouter.post(
  '/',
  auth(USER_ROLE.user),
//   validateRequest(ReviewValidation.createReviewSchema),
  reviewController.createReview,
);

// Get all reviews for a tutor (public route)
reviewRouter.get(
  '/:tutorId',
  reviewController.getReviews,
);

// Update a review (accessible by students)
reviewRouter.patch(
  '/:id',
  auth(USER_ROLE.user),
//   validateRequest(ReviewValidation.updateReviewSchema),
  reviewController.updateReview,
);

// Delete a review (accessible by students)
reviewRouter.delete(
  '/:id',
  auth(USER_ROLE.user),
  reviewController.deleteReview,
);

export default reviewRouter;