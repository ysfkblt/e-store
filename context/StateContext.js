import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export default function StateContext({ children }) {
	const [cartItems, setCartItems] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	function onAdd(product, quantity) {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities + quantity
		);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
	}

	const incQty = () => {
		setQty((pr) => pr + 1);
	};

	const decQty = () => {
		setQty((pr) => {
			if (pr <= 1) return 1;
			return pr - 1;
		});
	};

	function onRemove(product) {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter(
			(item) => item._id !== product._id
		);
		setCartItems(newCartItems);
		setTotalPrice((p) => p - foundProduct.quantity * foundProduct.price);
		setTotalQuantities((p) => p - foundProduct.quantity);
	}

	function toggleCartItemQuantity(id, value) {
		foundProduct = cartItems.find((item) => item._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);
		index = cartItems.findIndex((product) => product._id === id);

		if (value === 'inc') {
			setCartItems([
				...newCartItems,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);
			setTotalPrice((p) => p + foundProduct.price);
			setTotalQuantities((p) => p + 1);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice((p) => p - foundProduct.price);
				setTotalQuantities((p) => p - 1);
			}
		}
	}

	return (
		<Context.Provider
			value={{
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				setShowCart,
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuantity,
				onRemove,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export const useStateContext = () => useContext(Context);
