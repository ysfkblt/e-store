import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client';

export default function Home({ products, bannerData }) {
	return (
		<div>
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			<div className='products-heading'>
				<h2>Best Seller Products</h2>
				<p>Popular on the Store.</p>
			</div>

			<div className='products-container'>
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[1]} />
		</div>
	);
}

export async function getServerSideProps() {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);
	return {
		props: { products, bannerData },
	};
}
