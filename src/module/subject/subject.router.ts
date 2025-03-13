import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { subjectController } from './subject.controller';
// import { SubjectValidation } from './subject.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const subjectRouter = Router();

// Create a new subject (accessible by admins)
subjectRouter.post(
  '/',
  auth(USER_ROLE.admin),
//   validateRequest(SubjectValidation.createSubjectSchema),
  subjectController.createSubject,
);

// Get all subjects (public route)
subjectRouter.get(
  '/',
  subjectController.getSubjects,
);

// Update a subject (accessible by admins)
subjectRouter.patch(
  '/:id',
  auth(USER_ROLE.admin),
//   validateRequest(SubjectValidation.updateSubjectSchema),
  subjectController.updateSubject,
);

// Delete a subject (accessible by admins)
subjectRouter.delete(
  '/:id',
  auth(USER_ROLE.admin),
  subjectController.deleteSubject,
);

export default subjectRouter;