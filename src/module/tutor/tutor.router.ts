import { Router } from 'express';
import { tutorController } from './tutor.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const tutorRouter = Router();

// Create a tutor profile (accessible by users)
tutorRouter.post(
  '/',
  auth(USER_ROLE.tutor),
//   validateRequest(TutorValidation.createTutorSchema),
  tutorController.createTutor,
);

// Get all tutors (public route)
tutorRouter.get(
  '/',
  tutorController.getTutors,
);

// Get a single tutor by ID (public route)
tutorRouter.get(
  '/:id',
  tutorController.getSingleTutor,
);
// Get a single tutor by ID (public route)
tutorRouter.get(
  '/user/:id',
  tutorController.getSingleTutorByUserId,
);

// Update a tutor profile (accessible by tutors)
tutorRouter.patch(
  '/:id',
  auth(USER_ROLE.tutor),
//   validateRequest(TutorValidation.updateTutorSchema),
  tutorController.updateTutor,
);

// Update a tutor profile following user ID (accessible by tutors)
tutorRouter.patch(
  '/user/:id',
  auth(USER_ROLE.tutor),
  tutorController.updateTutorByUser,
);


// Delete a tutor profile (accessible by tutors)
tutorRouter.delete(
  '/:id',
  auth(USER_ROLE.tutor),
  tutorController.deleteTutor,
);

export default tutorRouter;