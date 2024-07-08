import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/auth/LoginForm.jsx";
import Signup from "./components/auth/RegisterForm.jsx";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CartPage from "./components/cart/CartPage";
import Home from "./pages/Home";
import Profile from "./components/user/Profile.jsx";
import Checkout from "./components/checkout/Checkout";
import OrderDetails from "./components/orders/OrderDetails.jsx";
import OrderList from "./components/orders/OrderList.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const App = () => {
  const theme = createTheme();
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/forget-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              <Route path="/user-profile" element={<Profile />} />

              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetails />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
