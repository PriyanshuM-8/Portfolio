import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  type:          { type: String, required: true },
  desc:          { type: String, required: true },
  githubLink:    { type: String, default: '' },
  liveLink:      { type: String, default: '' },
  imageUrl:      { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
