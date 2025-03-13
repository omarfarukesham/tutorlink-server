"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tutor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "canceled"],
        default: "pending",
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
