import React, { useRef } from 'react';
import Link from 'next/link';
import {
	HiOutlineShoppingBag,
	HiMinus,
	HiPlus,
	HiArrowLeft,
	HiX,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

export default function Cart() {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
	} = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		toast.loading('Redirecting...');

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div className='cart-wrapper' ref={cartRef}>
			<div className='cart-container'>
				<div className='cart-heading'>
					<button type='button' onClick={() => setShowCart(false)}>
						<HiArrowLeft />
					</button>
					<p className='heading'>Your Cart</p>
					{totalQuantities >= 1 && (
						<p className='cart-num-items'>
							{totalQuantities} items
						</p>
					)}
				</div>

				{cartItems.length < 1 && (
					<div className='empty-cart'>
						<HiOutlineShoppingBag color={'#d4d4d8'} size={150} />
						<p>Your cart is empty</p>
						<Link href='/'>
							<button
								type='button'
								onClick={() => setShowCart(false)}
								className='btn'
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className='product-container'>
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<div className='product' key={item._id}>
								<img
									src={urlFor(item?.image[0])}
									className='cart-product-image'
								/>
								<div className='item-desc'>
									<div className='flex top'>
										<p className='crtprd'>{item.name}</p>
										<button
											type='button'
											className='remove-item'
											onClick={() => onRemove(item)}
										>
											<HiX />
										</button>
									</div>
									<div className='flex bottom'>
										<p>${item.price}</p>
										<div className='buttons'>
											<div
												onClick={() =>
													toggleCartItemQuantity(
														item._id,
														'dec'
													)
												}
												className='minus'
											>
												<HiMinus fontSize={'1.6rem'} />
											</div>
											<div className='num2'>
												<span>{item.quantity}</span>
											</div>
											<div
												onClick={() =>
													toggleCartItemQuantity(
														item._id,
														'inc'
													)
												}
												className='plus'
											>
												<HiPlus fontSize={'1.6rem'} />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className='cart-bottom'>
						<div className='total'>
							<p>Subtotal:</p>
							<p className='ttlprc'>${totalPrice}</p>
						</div>
						<div className='btn-container'>
							<button
								type='button'
								className='btn'
								onClick={handleCheckout}
							>
								Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
