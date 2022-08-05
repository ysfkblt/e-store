import React from 'react';
import { BsYoutube, BsTwitter, BsInstagram } from 'react-icons/bs';

export default function Footer() {
	return (
		<div className='footer-container'>
			<div className='footer-icons'>
				<BsInstagram />
				<BsTwitter />
				<BsYoutube />
			</div>
			<div className='footer-container-links'>
				<p>Privacy</p>
				<p>Careers</p>
				<p>Sales Terms</p>
				<p>Terms of Service</p>
			</div>
		</div>
	);
}
