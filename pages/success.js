import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

export default function Success() {
	const { setCartItems, setTotalPrice, setTotalQuantities } =
		useStateContext();

	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
	}, []);

	return (
		<div className='success-wrapper'>
			<div className='success'>
				<div className='icon'>
					<HiOutlineCheckCircle />
				</div>
				<h2>Successfull Payment!</h2>
				<p className='email-msg'>
					Check your email inbox for the receipt.
				</p>
				<p className='description'>
					If you have any questions, please email
					<a className='email' href='mailto:order@example.com'>
						order@example.com
					</a>
				</p>
				<Link href='/'>
					<button type='button' width='300px' className='btn'>
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
}
