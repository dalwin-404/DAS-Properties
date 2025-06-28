// lib/sanity.js
import sanityClient from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    useCdn: true,
});

export default client;
