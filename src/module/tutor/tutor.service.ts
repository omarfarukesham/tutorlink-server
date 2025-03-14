// import QueryBuilder from '../../builder/queryBuilder';
import QueryBuilder from '../../builder/querybuilder';
import { ITutor } from './tutor.interface';
import Tutor from './tutor.model';

// Create a tutor profile
const createTutor = async (payload: ITutor): Promise<ITutor> => {
  const result = await Tutor.create(payload);
  return result;
};

// Get all tutors with search, filtering, and pagination
const getTutors = async (query: Record<string, unknown>) => {
  const tutors = new QueryBuilder(Tutor.find(), query)
    .search(['bio', 'subjects'])
    .filter()
    .sort()
    // .paginate()
    .select();

  const result = await tutors.modelQuery
      .populate('user', 'name email')
      .populate('subjects')
  return result;
};

// Get a single tutor by ID
const getSingleTutor = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id).populate('user', 'name email');
  return result;
};

// Update a tutor profile
const updateTutor = async (
  id: string,
  payload: Partial<ITutor>,
): Promise<ITutor | null> => {
  const result = await Tutor.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete a tutor profile
const deleteTutor = async (
  tutorId: string,
  userId: string,
): Promise<ITutor | null> => {
  const result = await Tutor.findOneAndDelete({
    _id: tutorId,
    user: userId,
  });
  return result;
};

export const tutorService = {
  createTutor,
  getTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};