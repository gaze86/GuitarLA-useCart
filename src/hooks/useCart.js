import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db.js";

function useCart() {
  //Verificar si cart tiene algo
  const initilaCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initilaCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {}, [localStorage.setItem("cart", JSON.stringify(cart))]);

  // Add the item to the cart and verify the quantity
  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++; // copy and update the cart
      setCart(updatedCart); // sin [] espabila tavo
    } else {
      item.quantity = 1;
      setCart([...cart, item]); // Agrega el carrito
    }
  }

  //Delete items from cart
  function removeFromCart(id) {
    const removeCart = [...cart];
    const result = removeCart.filter((guitar) => guitar.id !== id);
    setCart(result);
  }

  //Increase quantity from car
  function increaseQuantity(id) {
    const increaseCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(increaseCart);
    console.log(id);
  }

  //Decrease quantity from car
  function decreseQuantity(id) {
    const increaseCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(increaseCart);
    console.log(id);
  }

  function cleanCart() {
    setCart([]);
  }

  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreseQuantity,
    cleanCart,
    isEmpty,
    cartTotal
  };
}

export default useCart;
