import "../CartStyles/Cart.css"
import { PageTitle } from "../components/PageTitle.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addToCart, removeFromCart } from "../features/cart/cartSlice.js"
import CartItem from "./CartItem.jsx"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector((state) => state.cart)
    const { isAuthenticated } = useSelector((state) => state.user)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1
        if (stock <= quantity) return
        dispatch(addToCart({
            product: id,
            name: cartItems.find((i) => i.product === id).name,
            price: cartItems.find((i) => i.product === id).price,
            image: cartItems.find((i) => i.product === id).image,
            stock,
            quantity: newQty
        }))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1
        if (quantity <= 1) return
        dispatch(addToCart({
            product: id,
            name: cartItems.find((i) => i.product === id).name,
            price: cartItems.find((i) => i.product === id).price,
            image: cartItems.find((i) => i.product === id).image,
            stock: cartItems.find((i) => i.product === id).stock,
            quantity: newQty
        }))
    }

    const deleteCartItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate("/shipping")
        } else {
            navigate("/user/login?redirect=/shipping")
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = Math.round(subtotal * 0.18)
    const shipping = subtotal > 0 && subtotal > 1000 ? 0 : (subtotal > 0 ? 100 : 0)
    const grossTotal = subtotal + tax + shipping

    return (
        <>
        <Navbar />
        <PageTitle title="Shopping Cart" />
            {cartItems.length === 0 ? (<>
            <div className="empty-cart-container">
                <p className="empty-cart-message">Your cart is empty</p>
                <Link to='/products' className="viewProducts">View Products</Link>
                </div></>) : (
                <>
                    
                    

                    {cartItems.length === 0 ? (
                        <div className="empty-cart-container">
                            <h2 className="empty-cart-message">No Items in Your Cart</h2>
                            <Link to="/products" className="viewProducts">View Products</Link>
                        </div>
                    ) : (
                        <div className="cart-page">
                            <div className="cart-items">
                                <h2 className="cart-items-heading">Shopping Cart</h2>
                                <div className="cart-table">
                                    <div className="cart-table-header">
                                        <div>Product</div>
                                        <div>Quantity</div>
                                        <div>Subtotal</div>
                                        <div>Action</div>
                                    </div>

                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.product}
                                            item={item}
                                            increaseQty={increaseQty}
                                            decreaseQty={decreaseQty}
                                            deleteCartItem={deleteCartItem}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="price-summary">
                                <h3 className="price-summary-heading">Order Summary</h3>
                                <div className="summary-item">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Tax (18%)</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Shipping Charges</span>
                                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                                </div>
                                <div className="summary-total">
                                    <span>Gross Total</span>
                                    <span>₹{grossTotal}</span>
                                </div>
                                <button className="checkout-btn" onClick={checkoutHandler}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}

                    
                </>
            )
            }
            <Footer />
        </>
    )
}

export default Cart
