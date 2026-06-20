import { Footer } from "../components/Footer.jsx"
import "../PageStyles/Home.css"
import { Navbar } from "../components/Navbar.jsx"
import { ImageSlider } from "../components/ImageSlider.jsx"
import { Product } from "../components/Product.jsx"
import { PageTitle } from "../components/PageTitle.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProduct, removeErrors } from "../features/products/productSlice.js"
import Loader from "../components/Loader.jsx"
import { toast } from "react-toastify"




export function Home() {
    const { products, loading, error, productCount } = useSelector((state) => state.products);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProduct({ keyword: "" }))
    }, [dispatch])


    useEffect(() => {
        if (error) {
            toast.error(error.message, {
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

    return (
        loading ? (<Loader />) : (<>
            <PageTitle title="Home" />
            <Navbar />
            <div className="home-container">
                <h3 className="home-heading">Trending Now</h3>
                <ImageSlider />
                <div className="home-product-container">
                    {products.map((product, index) => {
                        return <Product product={product} key={index} />
                    })}
                </div>
            </div>
            <Footer />
        </>)
    )
}