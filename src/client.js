import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-01-07',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,

});

const builder = imageURLBuilder(client);
//console.log(builder)
export const urlFor = (source) => builder.image(source);