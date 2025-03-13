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
exports.reviewService = void 0;
const review_model_1 = __importDefault(require("./review.model"));
// Create a review
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.create(payload);
    return result;
});
// Get all reviews for a tutor
const getReviews = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.find({ tutor: tutorId })
        .populate('student', 'name email')
        .populate('tutor', 'name email');
    return result;
});
// Update a review
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete a review
const deleteReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.findOneAndDelete({
        _id: reviewId,
        student: userId,
    });
    return result;
});
exports.reviewService = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
};
