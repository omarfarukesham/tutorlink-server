"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
// import { PaymentValidation } from './payment.validation';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const paymentRouter = (0, express_1.Router)();
// Process a payment (accessible by students)
paymentRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user), 
//   validateRequest(PaymentValidation.processPaymentSchema),
payment_controller_1.paymentController.processPayment);
// Get payment details by ID (accessible by students and tutors)
paymentRouter.get('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.tutor), payment_controller_1.paymentController.getPayment);
// Get all payments for a user (accessible by students and tutors)
paymentRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.tutor), payment_controller_1.paymentController.getPayments);
exports.default = paymentRouter;
