import { model, Schema } from "mongoose";
import { ITutor } from "./tutor.interface";

const tutorSchema = new Schema<ITutor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    tutorImg: {
      type: String,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

const Tutor = model<ITutor>("Tutor", tutorSchema);
export default Tutor;