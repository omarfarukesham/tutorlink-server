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
  const searchTerm = query.search ? query.search as string : '';
  const categoryFilter = query.category ? query.category as string : '';

  const aggregationPipeline: any[] = [
    {
      $lookup: {
        from: 'subjects', 
        localField: 'subjects',
        foreignField: '_id',
        as: 'subjects'
      }
    }
  ];

  // If search term exists, apply $match for search
  if (searchTerm) {
    aggregationPipeline.push({
      $match: {
        $or: [
          { bio: { $regex: searchTerm, $options: 'i' } }, // Search in bio
          { 'subjects.name': { $regex: searchTerm, $options: 'i' } } // Search in subjects
        ]
      }
    });
  }

  // If category filter exists, apply $match for category
  if (categoryFilter) {
    aggregationPipeline.push({
      $match: {
        'subjects.category': categoryFilter // Exact match for category
      }
    });
  }

  const result = await Tutor.aggregate(aggregationPipeline);

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