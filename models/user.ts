import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Corrected 'require' to 'required'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Corrected 'require' to 'required'
  age: { type: Number, min: 18, max: 100 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  // posts: [{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Corrected 'isVerfield' to 'isVerified'
  provider: { type: String, required: false }, // Make provider optional
  verificationToken: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);   

export default User;
