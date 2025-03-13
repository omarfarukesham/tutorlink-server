"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const payment_model_1 = __importDefault(require("./payment.model"));
// Process a payment
const processPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.default.create(payload);
    return result;
});
// Get payment details by ID
const getPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.default.findById(id).populate('booking', 'dateTime duration price');
    return result;
});
// Get all payments for a user (student or tutor)
const getPayments = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (role === 'student') {
        query = { student: userId };
    }
    else if (role === 'tutor') {
        query = { tutor: userId };
    }
    const result = yield payment_model_1.default.find(query).populate('booking', 'dateTime duration price');
    return result;
});
exports.paymentService = {
    processPayment,
    getPayment,
    getPayments,
};
