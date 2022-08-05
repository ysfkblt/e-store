import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
	projectId: 'o72du0dd',
	dataset: 'production',
	apiVersion: '2022-07-23',
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const urlFor = (src) => imageUrlBuilder(client).image(src);
