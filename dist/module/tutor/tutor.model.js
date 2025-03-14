"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
    },
    subjects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    availability: [
        {
            day: {
                type: String,
                required: true,
            },
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        },
    ],
    hourlyRate: {
        type: Number,
        required: true,
    },
    earnings: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const Tutor = (0, mongoose_1.model)("Tutor", tutorSchema);
exports.default = Tutor;
