import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db.js";

function App() {


  //Verificar si cart tiene algo
  const initilaCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initilaCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect( () => {}, [localStorage.setItem("cart", JSON.stringify(cart))]);

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

  function cleanCart(){
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreseQuantity={decreseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
