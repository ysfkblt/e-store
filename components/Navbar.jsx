import React from 'react';
import Link from 'next/link';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

export default function Navbar() {
	const { showCart, setShowCart, totalQuantities } = useStateContext();

	return (
		<div className='navbar-container'>
			<p className='logo'>
				<Link href='/'>E-Store</Link>
			</p>

			<button
				type='button'
				className='cart-icon'
				onClick={() => setShowCart(true)}
			>
				<HiOutlineShoppingBag />
				<span className='cart-item-qty'>
					<span>{totalQuantities}</span>
				</span>
			</button>

			{showCart && <Cart />}
		</div>
	);
}
