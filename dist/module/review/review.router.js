"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
// import { ReviewValidation } from './review.validation';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const reviewRouter = (0, express_1.Router)();
// Create a review (accessible by students)
reviewRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user), 
//   validateRequest(ReviewValidation.createReviewSchema),
review_controller_1.reviewController.createReview);
// Get all reviews for a tutor (public route)
reviewRouter.get('/:tutorId', review_controller_1.reviewController.getReviews);
// Update a review (accessible by students)
reviewRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user), 
//   validateRequest(ReviewValidation.updateReviewSchema),
review_controller_1.reviewController.updateReview);
// Delete a review (accessible by students)
reviewRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user), review_controller_1.reviewController.deleteReview);
exports.default = reviewRouter;
