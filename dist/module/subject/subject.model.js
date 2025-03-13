"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    gradeLevel: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Subject = (0, mongoose_1.model)("Subject", subjectSchema);
exports.default = Subject;
