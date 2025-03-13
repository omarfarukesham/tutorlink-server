"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = require("./subject.controller");
// import { SubjectValidation } from './subject.validation';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const subjectRouter = (0, express_1.Router)();
// Create a new subject (accessible by admins)
subjectRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), 
//   validateRequest(SubjectValidation.createSubjectSchema),
subject_controller_1.subjectController.createSubject);
// Get all subjects (public route)
subjectRouter.get('/', subject_controller_1.subjectController.getSubjects);
// Update a subject (accessible by admins)
subjectRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), 
//   validateRequest(SubjectValidation.updateSubjectSchema),
subject_controller_1.subjectController.updateSubject);
// Delete a subject (accessible by admins)
subjectRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), subject_controller_1.subjectController.deleteSubject);
exports.default = subjectRouter;
