import { urlFor } from '../lib/client';
import React from 'react';
import Link from 'next/link';

export default function FooterBanner({
	footerBanner: { subText, centerText, product, buttonText, image },
}) {
	return (
		<div className='footer-banner-container'>
			<div className='fimage'>
				<img height={400} src={urlFor(image)} />
			</div>
			<div className='txtbtn'>
				<p className='centerText'>{centerText}</p>
				<p className='subtext'>{subText}</p>
				<Link href={`/product/${product}`}>
					<button type='button'>{buttonText}</button>
				</Link>
			</div>
		</div>
	);
}
