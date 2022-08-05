import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<div>
			<div className='product-detail-container'>
				<div className='image-container'>
					<img
						src={urlFor(image && image[index])}
						className='product-detail-image'
					/>
				</div>

				<div className='product-detail-desc'>
					<div className='namdet'>
						<h1>{name}</h1>
						<p>{details}</p>
					</div>
					<div className='buttons'>
						<p>${price}</p>
						<div className='qnty'>
							<div onClick={decQty} className='minus'>
								<HiMinus />
							</div>
							<div className='num'>{qty}</div>
							<div onClick={incQty} className='plus'>
								<HiPlus />
							</div>
						</div>

						<button
							type='button'
							className='add-to-cart'
							onClick={() => onAdd(product, qty)}
						>
							Add to Cart
						</button>
						<button
							type='button'
							className='buy-now'
							onClick={handleBuyNow}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className='maylike-products-wrapper'>
				<div className='title'>You may also like</div>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	return {
		props: { products, product },
	};
};

export default ProductDetails;
