"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name must be provided and must be a string",
        })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(50, { message: "Name cannot exceed 50 characters" }),
        email: zod_1.z
            .string({
            required_error: "Email must be provided and must be a string",
        })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({
            required_error: "Password is required for your safety",
        })
            .min(4, { message: "Password must be at least 4 characters long" })
            .max(20, { message: "Password cannot exceed 20 characters" }),
        role: zod_1.z
            .enum(["admin", "user", 'tutor', 'student'], {
            required_error: "Role must be provided and must be 'admin' or 'user' or 'tutor' or 'student'",
        })
            .default("user"),
        profileImg: zod_1.z.string().optional(),
        isBlocked: zod_1.z.boolean().default(false),
        createdAt: zod_1.z.date().default(() => new Date()),
        updatedAt: zod_1.z.date().default(() => new Date()),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
