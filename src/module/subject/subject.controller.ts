import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subjectService } from './subject.service';

// Create a new subject
const createSubject = catchAsync(async (req, res) => {
  const result = await subjectService.createSubject(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Subject created successfully',
    data: result,
  });
});

// Get all subjects
const getSubjects = catchAsync(async (req, res) => {
  const result = await subjectService.getSubjects(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Subjects fetched successfully',
    data: result,
  });
});

// Update a subject
const updateSubject = catchAsync(async (req, res) => {
  const subjectId = req.params.id;
  const body = req.body;

  const result = await subjectService.updateSubject(subjectId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Subject updated successfully',
    data: result,
  });
});

// Delete a subject
const deleteSubject = catchAsync(async (req, res) => {
  const subjectId = req.params.id;
  await subjectService.deleteSubject(subjectId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Subject deleted successfully',
    data: {},
  });
});

export const subjectController = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};