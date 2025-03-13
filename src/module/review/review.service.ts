import { IReview } from './review.interface';
import Review from './review.model';

// Create a review
const createReview = async (payload: IReview): Promise<IReview> => {
  const result = await Review.create(payload);
  return result;
};

// Get all reviews for a tutor
const getReviews = async (tutorId: string): Promise<IReview[]> => {
  const result = await Review.find({ tutor: tutorId })
    .populate('student', 'name email')
    .populate('tutor', 'name email');
  return result;
};

// Update a review
const updateReview = async (
  id: string,
  payload: Partial<IReview>,
): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete a review
const deleteReview = async (
  reviewId: string,
  userId: string,
): Promise<IReview | null> => {
  const result = await Review.findOneAndDelete({
    _id: reviewId,
    student: userId,
  });
  return result;
};

export const reviewService = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};