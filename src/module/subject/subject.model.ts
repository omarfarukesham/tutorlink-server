import { model, Schema } from "mongoose";
import { ISubject } from "./subject.interface";

const subjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = model<ISubject>("Subject", subjectSchema);
export default Subject;