import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { paymentController } from './payment.controller';
// import { PaymentValidation } from './payment.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const paymentRouter = Router();

// Process a payment (accessible by students)
paymentRouter.post(
  '/',
  auth(USER_ROLE.user),
//   validateRequest(PaymentValidation.processPaymentSchema),
  paymentController.processPayment,
);

// Get payment details by ID (accessible by students and tutors)
paymentRouter.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.tutor),
  paymentController.getPayment,
);

// Get all payments for a user (accessible by students and tutors)
paymentRouter.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.tutor),
  paymentController.getPayments,
);

export default paymentRouter;