import mongoose, { Schema, Document } from 'mongoose';
import { title } from 'process';

export interface IStream extends Document {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

const StreamsSchema: Schema = new Schema({

    title: { type: String, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },

});

export default mongoose.model<IStream>('Stream', StreamsSchema);