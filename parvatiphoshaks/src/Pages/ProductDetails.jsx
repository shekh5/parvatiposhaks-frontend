import { PageTitle } from "../components/PageTitle.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import "../PageStyles/ProductDetails.css"
import { Rating } from "../components/Rating.jsx"
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProductDetails, removeErrors } from "../features/products/productSlice.js"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader.jsx"
import { addToCart } from "../features/cart/cartSlice.js"



function ProductDetails() {

    const [userRating, setuserRating] = useState(0);
    const toastShown = useRef(false);
    const [quantity, setQuantity] = useState(1);

    const handleRatingChange = (newRating) => {
        setuserRating(newRating);
    };
    const { loading, error, product } = useSelector((state) => { return state.products })
    const dispatch = useDispatch()

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        if (product && product.Stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const addToCartHandler = () => {
        if (!product || product.Stock < 1) {
            toast.error("Item is out of stock", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.Image?.[0]?.url || 'placeholder.jpg',
                stock: product.Stock,
                quantity,
            })
        );
        toast.success("Item added to cart", {
            position: "top-center",
            autoClose: 3000,
        });
    };


    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }
        return () => {
            dispatch(removeErrors())
            toastShown.current = false
        }
    }, [dispatch, id])


    useEffect(() => {
        if (error && !toastShown.current) {
            toastShown.current = true
            const errorMessage = typeof error === 'string' ? error : error?.message || 'An error occurred'
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    if (loading) {
        return <>
            <Navbar />
            <Loader />
            <Footer />
        </>
    }

    if (error || !product) {
        return <>
            <PageTitle title={"product details"} />
            <Navbar />
            <div className="error-container">
                <h2 className="error-message">{typeof error === 'string' ? error : error?.message || 'An error occurred while fetching product details.'}</h2>
            </div>
            <Footer />
        </>
    }


    return (
        <>
            <PageTitle title={product?.name || "Product Details"} />
            <Navbar />
            <div className="product-details-container">
                <div className="product-detail-container">
                    <div className="product-image-container">
                        <img src={product?.Image?.[0]?.url || 'placeholder.jpg'} alt={product?.name} className="product-detail-image" />
                    </div>



                    <div className="product-info">
                        <h2 >{product?.name}</h2>
                        <p className="product-description">{product?.description}</p>
                        <p className="product-price">price: {product?.price}</p>


                        <div className="product-rating">
                            <Rating value={product?.ratings} disable={true} />
                            <span className="productCardSpan">{product?.noOfreviews} {product.noOfreviews === 1 ? 'Review' : 'Reviews'}</span>
                        </div>

                        <div className={product.Stock > 0 ? `stock-status` : 'out-of-stock'}>
                            <span >
                                {product.Stock > 0 ? `In Stock (${product.Stock} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        {product.Stock > 0 && (<>
                            <div className="quantity-controls">
                                <span className="quantity-label">Quantity:</span>
                                <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                <input type="text" value={quantity} className="quantity-value" readOnly />
                                <button className="quantity-button" onClick={increaseQuantity}>+</button>
                            </div>
                        </>)}

                        <button className="add-to-cart-btn" onClick={addToCartHandler}>Add to Cart</button>

                        <form className="review-form">
                            <h3>Write a Review</h3>
                            <Rating
                                value={0}
                                disabled={false}
                                onRatingChange={handleRatingChange}
                            />

                            <textarea placeholder="Write your review here" className="review-input"></textarea>
                            <button className="submit-review-btn">Submit Review</button>
                        </form>
                    </div>
                </div>


                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="reviews-section">
                            {product.reviews.map((review, index) => {
                                return (
                                    <div className="review-item" key={index}>
                                        <div className="review-header">
                                            <Rating value={review.rating} disabled={true} />
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                        <p className="review-name">by {review.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                    )
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ProductDetails