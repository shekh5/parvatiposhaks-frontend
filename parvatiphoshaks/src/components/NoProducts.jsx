import '../componentStyles/NoProducts.css'

export function NoProducts({ keyword }) {
    return (<>
        <div className="no-product-content">
            <div className="no-products-icon"></div>
            <h3 className="no-products-title">No Products Found</h3>
            <p className="no-products-message">
                {keyword ? `We couldn't find any products matching "${keyword}". try using different keywords or browse our complete catalog.` : `No products are available. please check back later.`}
            </p>
        </div>
    </>)
}
