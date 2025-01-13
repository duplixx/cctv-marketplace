import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import type { RootState } from '../store/store';
import { Trash2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import emptyCart from '../assets/empty-cart.png';
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const {isAuthenticated,loginWithRedirect} = useAuth0();
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);
  const handleCheckout = () => {
    if (!isAuthenticated) {
      localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
      return;
    }
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    window.location.href = '/checkout';
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center w-full items-center flex flex-col">
          <img src={emptyCart} alt="Empty Cart" width={400} height={400} />
          <p className="text-gray-600">Your cart is empty</p>
          <button onClick={() => window.location.href = '/#products'} className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 mt-6">
            Continue Shopping
          </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                    <div className="flex items-center mt-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => dispatch(updateQuantity({
                          id: item.id,
                          quantity: parseInt(e.target.value)
                        }))}
                        className="border rounded px-2 py-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-6">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;