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
exports.tutorService = void 0;
const tutor_model_1 = __importDefault(require("./tutor.model"));
// Create a tutor profile
const createTutor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.create(payload);
    return result;
});
// Get all tutors with search, filtering, and pagination
const getTutors = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = query.search ? query.search : '';
    const categoryFilter = query.category ? query.category : '';
    const aggregationPipeline = [
        {
            $lookup: {
                from: 'subjects',
                localField: 'subjects',
                foreignField: '_id',
                as: 'subjects'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user' // Convert user array to object
        },
        {
            $project: {
                'user.password': 0, // Exclude sensitive user data
                'user.createdAt': 0,
                'user.updatedAt': 0
            }
        }
    ];
    // If search term exists, apply $match for search
    if (searchTerm) {
        aggregationPipeline.push({
            $match: {
                $or: [
                    { bio: { $regex: searchTerm, $options: 'i' } },
                    { 'subjects.name': { $regex: searchTerm, $options: 'i' } }
                ]
            }
        });
    }
    // If category filter exists, apply $match for category
    if (categoryFilter) {
        aggregationPipeline.push({
            $match: {
                'subjects.category': categoryFilter
            }
        });
    }
    const result = yield tutor_model_1.default.aggregate(aggregationPipeline);
    return result;
});
// Get a single tutor by ID
const getSingleTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findById(id)
        .populate('user', 'name email')
        .populate('subjects')
        .lean();
    return result;
});
// Update a tutor profile
const updateTutor = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Update a tutor profile by user ID
const updateTutorByUserId = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findOne({ user: userId });
    if (!tutor) {
        throw new Error('Tutor not found');
    }
    const result = yield tutor_model_1.default.findByIdAndUpdate(tutor._id, payload, {
        new: true,
    });
    return result;
});
// Delete a tutor profile
const deleteTutor = (tutorId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findOneAndDelete({
        _id: tutorId,
        user: userId,
    });
    return result;
});
exports.tutorService = {
    createTutor,
    getTutors,
    getSingleTutor,
    updateTutor,
    updateTutorByUserId,
    deleteTutor,
};
