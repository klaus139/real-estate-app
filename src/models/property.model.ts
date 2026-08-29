import { Schema, model, Document } from 'mongoose';
import { IProperty, IAddress } from '../utils/interfaces/property.interface';

export interface IPropertyDocument extends IProperty, Document {}

const addressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const propertySchema = new Schema<IPropertyDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ['NGN', 'USD'], default: 'NGN' },
    type: { type: String, enum: ['rent', 'sale'], required: true },
    status: {
      type: String,
      enum: ['draft', 'available', 'sold', 'rented'],
      default: 'available',
    },
    bedrooms: { type: Number, min: 0, default: 0 },
    bathrooms: { type: Number, min: 0, default: 0 },
    address: { type: addressSchema, required: true },
    listedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Property = model<IPropertyDocument>('Property', propertySchema);