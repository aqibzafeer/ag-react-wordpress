import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import { createWooOrder } from "../services/wooCommerceAPI";
import AuthService from "../services/AuthService";
import { toast } from "react-toastify";

function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
    notes: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = AuthService.getCurrentUser();
    const shipping = 500;

    // ✅ Prepare WooCommerce Order Data
    const orderData = {
      payment_method: payment === "cod" ? "cod" : payment === "card" ? "bacs" : "easypaisa",
      payment_method_title: payment === "cod" ? "Cash on Delivery" : payment === "card" ? "Credit Card" : "Easypaisa",
      set_paid: false,
      billing: {
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        city: form.city,
        postcode: form.postal,
        country: "PK",
        email: form.email,
        phone: form.phone
      },
      shipping: {
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        city: form.city,
        postcode: form.postal,
        country: "PK"
      },
      line_items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Standard Shipping",
          total: shipping.toString()
        }
      ],
      customer_note: form.notes || "",
      customer_id: user?.id || 0
    };

    try {
      // ✅ Create Order in WooCommerce
      const order = await createWooOrder(orderData);
      
      toast.success(`Order #${order.id} created successfully!`, {
        position: "bottom-right",
        autoClose: 3000
      });

      // Clear cart and form
      clearCart();
      setForm({
        name: "",
        email: "",
        address: "",
        city: "",
        postal: "",
        phone: "",
        notes: "",
      });

      // Navigate to Thank You page
      navigate("/thank-you", { state: { orderId: order.id } });

    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order. Please try again.", {
        position: "bottom-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-100 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-10">
        {/* Right: Order Summary */}
        <div className="md:w-1/3 w-full mt-10 md:mt-0 flex flex-col bg-blue-50 rounded-xl p-6 shadow-inner">
          <h2 className="text-xl font-bold mb-4 text-black-800">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col mb-4">
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="text-sm text-gray-500">
                Price: Rs {item.sale_price || item.price} &nbsp;|&nbsp; Quantity: {item.quantity}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mb-2">
            <span>Shipping</span>
            <span>Rs: 500</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Tax</span>
            <span>Rs: 200</span>
          </div>
          <div className="flex items-center justify-between font-bold border-t pt-3 mt-3 text-lg">
            <span>Total</span>
            <span>Rs: {(cartTotal + 500 + 200).toFixed(2)}</span>
          </div>

          {/* Payment Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 text-black-800">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {["cod", "card", "upi"].map((method) => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={handlePayment}
                    className="mr-2 accent-blue-600"
                  />
                  <span className="text-gray-700">
                    {method === "cod"
                      ? "Cash on Delivery"
                      : method === "card"
                      ? "Credit / Debit Card"
                      : "Easypaisa"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-600">
            <span>100% Secure Payment | 7-Day Return Policy</span>
          </div>
        </div>

        {/* Left: Form */}
        <div className="md:w-2/3 w-full flex flex-col">
          <h1 className="text-3xl font-bold mb-8 text-black-800">Checkout</h1>
          <form
            className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              placeholder="Full Name"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              placeholder="Email"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-400 transition"
              required
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInput}
              placeholder="Address"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full sm:col-span-2 focus:outline-none focus:border-blue-400 transition"
              required
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleInput}
              placeholder="City"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-400 transition"
              required
            />
            <input
              type="text"
              name="postal"
              value={form.postal}
              onChange={handleInput}
              placeholder="Postal Code"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-400 transition"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleInput}
              placeholder="Phone Number"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-400 transition"
              required
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleInput}
              placeholder="Order Notes (optional)"
              className="border-2 border-blue-200 rounded-lg px-4 py-3 w-full sm:col-span-2 focus:outline-none focus:border-blue-400 transition resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-auto w-full bg-linear-to-r from-gray-800 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Order..." : `Place Order (Rs: ${(cartTotal + 500 + 200).toFixed(2)})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
