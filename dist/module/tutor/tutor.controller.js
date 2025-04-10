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
exports.tutorController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tutor_service_1 = require("./tutor.service");
// Create a tutor profile
const createTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error('User is not authenticated');
    }
    const payload = Object.assign(Object.assign({}, req.body), { user: req.user.id });
    const result = yield tutor_service_1.tutorService.createTutor(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Tutor profile created successfully',
        data: result,
    });
}));
// Get all tutors
const getTutors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_service_1.tutorService.getTutors(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Tutors fetched successfully',
        data: result,
    });
}));
// Get a single tutor by ID
const getSingleTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorId = req.params.id;
    const result = yield tutor_service_1.tutorService.getSingleTutor(tutorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Tutor fetched successfully',
        data: result,
    });
}));
// Update a tutor profile
const updateTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorId = req.params.id;
    const body = req.body;
    const result = yield tutor_service_1.tutorService.updateTutor(tutorId, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Tutor profile updated successfully',
        data: result,
    });
}));
const updateTutorByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const body = req.body;
    const result = yield tutor_service_1.tutorService.updateTutorByUserId(userId, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Tutor profile updated successfully',
        data: result,
    });
}));
// Delete a tutor profile
const deleteTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tutorId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    yield tutor_service_1.tutorService.deleteTutor(tutorId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Tutor profile deleted successfully',
        data: {},
    });
}));
exports.tutorController = {
    createTutor,
    getTutors,
    getSingleTutor,
    updateTutor,
    updateTutorByUser,
    deleteTutor,
};
