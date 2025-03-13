import { IPayment } from './payment.interface';
import Payment from './payment.model';

// Process a payment
const processPayment = async (payload: IPayment): Promise<IPayment> => {
  const result = await Payment.create(payload);
  return result;
};

// Get payment details by ID
const getPayment = async (id: string): Promise<IPayment | null> => {
  const result = await Payment.findById(id).populate('booking', 'dateTime duration price');
  return result;
};

// Get all payments for a user (student or tutor)
const getPayments = async (
  userId: string,
  role: string,
): Promise<IPayment[]> => {
  let query = {};
  if (role === 'student') {
    query = { student: userId };
  } else if (role === 'tutor') {
    query = { tutor: userId };
  }

  const result = await Payment.find(query).populate('booking', 'dateTime duration price');
  return result;
};

export const paymentService = {
  processPayment,
  getPayment,
  getPayments,
};