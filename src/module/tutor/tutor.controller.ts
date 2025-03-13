import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorService } from './tutor.service';

// Create a tutor profile
const createTutor = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new Error('User is not authenticated');
  }

  const payload = {
    ...req.body,
    user: req.user.id, // Authenticated user is the tutor
  };

  const result = await tutorService.createTutor(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Tutor profile created successfully',
    data: result,
  });
});

// Get all tutors
const getTutors = catchAsync(async (req, res) => {
  const result = await tutorService.getTutors(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tutors fetched successfully',
    data: result,
  });
});

// Get a single tutor by ID
const getSingleTutor = catchAsync(async (req, res) => {
  const tutorId = req.params.id;
  const result = await tutorService.getSingleTutor(tutorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tutor fetched successfully',
    data: result,
  });
});

// Update a tutor profile
const updateTutor = catchAsync(async (req, res) => {
  const tutorId = req.params.id;
  const body = req.body;

  const result = await tutorService.updateTutor(tutorId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tutor profile updated successfully',
    data: result,
  });
});

// Delete a tutor profile
const deleteTutor = catchAsync(async (req, res) => {
  const tutorId = req.params.id;
  const userId = req.user?.id;

  await tutorService.deleteTutor(tutorId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tutor profile deleted successfully',
    data: {},
  });
});

export const tutorController = {
  createTutor,
  getTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};