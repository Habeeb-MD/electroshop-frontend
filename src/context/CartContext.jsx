import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const shippingAddressDefault = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  saveAddress: false,
};
const paymentDefault = {
  cardName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
};
const cartDefault = [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : cartDefault;
  });
  const [shippingAddress, setShippingAddress] = useState(
    shippingAddressDefault,
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentDefault);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart(cartDefault);
    setShippingAddress(shippingAddressDefault);
    setPaymentMethod(paymentDefault);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateShippingAddress = (address) => {
    setShippingAddress(address);
  };

  const updatePaymentMethod = (payment) => {
    setPaymentMethod(payment);
  };
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    shippingAddress,
    updateShippingAddress,
    paymentMethod,
    updatePaymentMethod,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
