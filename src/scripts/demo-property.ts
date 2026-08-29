import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import 'dotenv/config';
import mongoose from 'mongoose';
import { Property } from '../models/property.model';

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string);

  const created = await Property.create({
    title: 'Cozy 2-Bedroom Flat',
    description: 'A bright, modern apartment near the city center.',
    price: 3_500_000,
    currency: 'NGN',
    type: 'rent',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    address: {
      street: '12 Allen Avenue',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
    },
    listedBy: new mongoose.Types.ObjectId(), // stand-in until we have a real user id
  });

  console.log('Created:', created);

 const found = await Property.find({ 'address.city': created.address.city });
  console.log('Found:', found);

  await mongoose.disconnect();
}

main().catch(console.error);