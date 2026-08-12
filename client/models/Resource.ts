import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResource extends Document {
  name: string;
  quantity: number;
  category: string;
  location: string;
  createdAt: Date;
}

const ResourceSchema: Schema<IResource> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a resource name'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide the quantity'],
    min: [0, 'Quantity cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    default: 'General',
  },
  location: {
    type: String,
    required: [true, 'Please specify the resource location'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resource: Model<IResource> = mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);

export default Resource;
