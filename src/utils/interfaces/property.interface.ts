import { Types } from 'mongoose';
import { PropertyListingType, PropertyStatus, Currency } from '../types/property.types';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface IProperty {
  title: string;
  description: string;
  price: number;
  currency: Currency;
  type: PropertyListingType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  address: IAddress;
  listedBy: Types.ObjectId;
}