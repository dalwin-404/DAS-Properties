// src/_data/post.js
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'z5gpuc4l',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

module.exports = async function () {
  return await client.fetch(`*[_type == "post"] | order(_createdAt desc) {
    title,
    body,
    slug
  }`);
};
