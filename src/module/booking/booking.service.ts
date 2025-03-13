// import QueryBuilder from '../../builder/queryBuilder';
import QueryBuilder from '../../builder/querybuilder';
import { IBooking } from './booking.interface';
import Booking from './booking.model';

// Create a new booking
const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const result = await Booking.create(payload);
  return result;
};

// Get all bookings with search, filtering, and pagination
const getBookings = async (
  userId: string,
  role: string,
  query: Record<string, unknown>,
) => {
  const bookingQuery = Booking.find();

  // Filter bookings based on user role
  if (role === 'student') {
    bookingQuery.where('student').equals(userId);
  } else if (role === 'tutor') {
    bookingQuery.where('tutor').equals(userId);
  }

  const bookings = new QueryBuilder(bookingQuery, query)
    .search(['status'])
    .filter()
    .sort()
    // .paginate()
    .select();

  const result = await bookings.modelQuery
    .populate('student', 'name email')
    .populate('tutor', 'name email')
    .populate('subject', 'name gradeLevel');

  return result;
};

// Get a single booking by ID
const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id)
    .populate('student', 'name email')
    .populate('tutor', 'name email')
    .populate('subject', 'name gradeLevel');
  return result;
};

// Update a booking
const updateBooking = async (
  id: string,
  payload: Partial<IBooking>,
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete a booking
const deleteBooking = async (
  bookingId: string,
  userId: string,
): Promise<IBooking | null> => {
  const result = await Booking.findOneAndDelete({
    _id: bookingId,
    student: userId,
  });
  return result;
};

export const bookingService = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};