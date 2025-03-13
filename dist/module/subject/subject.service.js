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
exports.subjectService = void 0;
// import QueryBuilder from '../../builder/queryBuilder';
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const subject_model_1 = __importDefault(require("./subject.model"));
// Create a new subject
const createSubject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_model_1.default.create(payload);
    return result;
});
// Get all subjects with search, filtering, and pagination
const getSubjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = new querybuilder_1.default(subject_model_1.default.find(), query)
        .search(['name', 'gradeLevel', 'category'])
        .filter()
        .sort()
        // .paginate()
        .select();
    const result = yield subjects.modelQuery;
    return result;
});
// Update a subject
const updateSubject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete a subject
const deleteSubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.subjectService = {
    createSubject,
    getSubjects,
    updateSubject,
    deleteSubject,
};
