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
exports.bookingService = void 0;
// import QueryBuilder from '../../builder/queryBuilder';
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const booking_model_1 = __importDefault(require("./booking.model"));
// Create a new booking
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.create(payload);
    return result;
});
// Get all bookings with search, filtering, and pagination
const getBookings = (userId, role, query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = booking_model_1.default.find();
    // Filter bookings based on user role
    if (role === 'student') {
        bookingQuery.where('student').equals(userId);
    }
    else if (role === 'tutor') {
        bookingQuery.where('tutor').equals(userId);
    }
    const bookings = new querybuilder_1.default(bookingQuery, query)
        .search(['status'])
        .filter()
        .sort()
        // .paginate()
        .select();
    const result = yield bookings.modelQuery
        .populate('student', 'name email')
        .populate('tutor', 'name email')
        .populate('subject', 'name gradeLevel');
    return result;
});
// Get a single booking by ID
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(id)
        .populate('student', 'name email')
        .populate('tutor', 'name email')
        .populate('subject', 'name gradeLevel');
    return result;
});
// Update a booking
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete a booking
const deleteBooking = (bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findOneAndDelete({
        _id: bookingId,
        student: userId,
    });
    return result;
});
exports.bookingService = {
    createBooking,
    getBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
};
