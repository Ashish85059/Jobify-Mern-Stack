import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Resume Schema
const resumeSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  summary: { type: String, default: "" },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, default: "" }, // Optional
    },
  ],
  achievements: [
    {
      type: String,
    },
  ],
  certifications: [
    {
      name: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
});


export default mongoose.model("Resume", resumeSchema);


