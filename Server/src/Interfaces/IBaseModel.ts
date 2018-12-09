import { Document } from 'mongoose';
export interface IBaseModel extends Document {
    creationDate: Date;
    updateDate: Date;
}