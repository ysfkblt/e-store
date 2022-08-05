import React from 'react';
import { urlFor } from '../lib/client';
import Link from 'next/link';

export default function HeroBanner({
	heroBanner: { subText, centerText, product, buttonText, image },
}) {
	return (
		<div className='hero-banner-container'>
			<div className='txtbtn'>
				<p className='centerText'>{centerText}</p>
				<p className='subtext'>{subText}</p>
				<Link href={`/product/${product}`}>
					<button type='button'>{buttonText}</button>
				</Link>
			</div>
			<div className='hero-banner-image'>
				<img height={400} src={urlFor(image)} alt='watch' />
			</div>
		</div>
	);
}
