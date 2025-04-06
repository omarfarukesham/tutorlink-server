"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutor_controller_1 = require("./tutor.controller");
// import { TutorValidation } from './tutor.validation';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const tutorRouter = (0, express_1.Router)();
// Create a tutor profile (accessible by users)
tutorRouter.post('/', 
// auth(USER_ROLE.tutor),
//   validateRequest(TutorValidation.createTutorSchema),
tutor_controller_1.tutorController.createTutor);
// Get all tutors (public route)
tutorRouter.get('/', tutor_controller_1.tutorController.getTutors);
// Get a single tutor by ID (public route)
tutorRouter.get('/:id', tutor_controller_1.tutorController.getSingleTutor);
// Update a tutor profile (accessible by tutors)
tutorRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.tutor), 
//   validateRequest(TutorValidation.updateTutorSchema),
tutor_controller_1.tutorController.updateTutor);
// Delete a tutor profile (accessible by tutors)
tutorRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.tutor), tutor_controller_1.tutorController.deleteTutor);
exports.default = tutorRouter;
