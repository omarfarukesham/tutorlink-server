"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const admin_router_1 = __importDefault(require("./module/admin/admin.router"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const subject_router_1 = __importDefault(require("./module/subject/subject.router"));
const tutor_router_1 = __importDefault(require("./module/tutor/tutor.router"));
const review_router_1 = __importDefault(require("./module/review/review.router"));
const booking_router_1 = __importDefault(require("./module/booking/booking.router"));
const payment_router_1 = __importDefault(require("./module/payment/payment.router"));
const app = (0, express_1.default)();
// CORS configuration has solved the issue
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'https://tutorlink-frontend-blond.vercel.app'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
// Parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', auth_router_1.default);
app.use('/api/admin', admin_router_1.default);
app.use('/api/user', user_router_1.default);
// app.use('/api/blogs', blogRouter);
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);
// app.use('/api/checkouts', CheckoutRoutes);
app.use('/api/subject', subject_router_1.default);
app.use('/api/tutor', tutor_router_1.default);
app.use('/api/review', review_router_1.default);
app.use('/api/booking', booking_router_1.default);
app.use('/api/payment', payment_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server is now Live - Alhamdulillah',
    });
});
// Error handling
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
