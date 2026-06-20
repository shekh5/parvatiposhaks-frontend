import "../pageStyles/Products.css"
import { PageTitle } from "../components/PageTitle.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice.js";
import { Product } from "../components/Product.jsx";
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"
import { NoProducts } from "../components/NoProducts.jsx"
import { Pagination } from "../components/Pagination.jsx";

function Products() {
    const { loading, error, products, productCount, resultPerPage, totalPages } = useSelector((state) => { return state.products })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()//?
    const searchParams = new URLSearchParams(location.search)
    // console.log(searchParams)
    const keyword = searchParams.get("keyword")
    const category = searchParams.get("category")
    const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;
    const [currentPage, SetCurrentPage] = useState(pageFromUrl)
    const catogories = ["laptop", "mobile", "tv", "headphones", "camera", "accessories", "watches", "clothing", "footwear", "books", "furniture", "home decor", "kitchen appliances", "sports equipment", "outdoor gear", "toys", "gaming consoles", "health and beauty products", "automotive accessories", "pet supplies"]




    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage, category }))
    }, [dispatch, keyword, currentPage, category])

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

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            SetCurrentPage(page)
            const newSearchParams = new URLSearchParams(location.search)//?
            if (page === 1) {
                newSearchParams.delete("page")
            } else {
                newSearchParams.set("page", page)
            }
            navigate(`?${newSearchParams.toString()}`)
        }
    }

    const handleCategoryClick = (cat) =>{
        const newSearchParams = new URLSearchParams(location.search)//?
        newSearchParams.set("category", cat)
        newSearchParams.delete("page")
        navigate(`?${newSearchParams.toString()}`)
    }

    return (
        loading ? (<Loader />) : (<>
            <PageTitle title={`All products`} />
            <Navbar />
            <div className="products-layout">
                <div className="filter-section">
                    <div className="filter-heading">Categories</div>
                    {/* render category filters */}
                    <ul>
                        {catogories.map((cat) => {
                            return (
                                <li key={cat} onClick={()=>handleCategoryClick(cat)}>
                                    {cat}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="products-section">
                    {products.length > 0 ? (<div className="products-product-container">
                        {products && products.length > 0 ? (products.map((product) => {
                            return (<>
                                <Product key={product._id} product={product} />
                            </>)
                        })) : (<div className="no-products">No products found</div>)}
                    </div>) : (<NoProducts keyword={keyword} />)}
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </>)
    )
}

export default Products;