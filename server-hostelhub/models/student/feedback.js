import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Feedback', FeedbackSchema);
