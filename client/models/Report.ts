import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReport extends Document {
  title: string;
  description: string;
  type: string;
  status: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

const ReportSchema: Schema<IReport> = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the incident report'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the disaster type'],
    default: 'Other',
  },
  status: {
    type: String,
    default: 'Active',
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);

export default Report;
