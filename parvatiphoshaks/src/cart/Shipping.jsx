import "../CartStyles/Shipping.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { PageTitle } from "../components/PageTitle.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import CheckoutPath from "./CheckoutPath.jsx"
import { saveShippingInfo } from "../features/cart/cartSlice.js"

const Shipping = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingInfo } = useSelector((state) => state.cart)

    const [address, setAddress] = useState(shippingInfo?.address || "")
    const [city, setCity] = useState(shippingInfo?.city || "")
    const [state, setState] = useState(shippingInfo?.state || "")
    const [country, setCountry] = useState(shippingInfo?.country || "India")
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "")
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "")

    const shippingSubmit = (e) => {
        e.preventDefault()

        if (!address || !city || !state || !country || !pinCode || !phoneNo) {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 5000,
            })
            return
        }

        if (phoneNo.toString().length !== 10) {
            toast.error("Phone number must be exactly 10 digits long", {
                position: "top-center",
                autoClose: 5000,
            })
            return
        }

        dispatch(
            saveShippingInfo({
                address,
                city,
                state,
                country,
                pinCode: Number(pinCode),
                phoneNo: Number(phoneNo),
            })
        )
        navigate("/order/confirm")
    }

    return (
        <>
            <PageTitle title="Shipping Details" />
            <Navbar />
            <CheckoutPath activeStep={0} />

            <div className="shipping-form-container">
                <h2 className="shipping-form-header">Shipping Details</h2>
                <form className="shipping-form" onSubmit={shippingSubmit}>
                    <div className="shipping-section">
                        <div className="shipping-form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="shipping-form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="shipping-form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="shipping-section">
                        <div className="shipping-form-group">
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                            </select>
                        </div>
                        <div className="shipping-form-group">
                            <label htmlFor="pinCode">Pin Code</label>
                            <input
                                type="number"
                                id="pinCode"
                                placeholder="Enter Pin Code"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="shipping-form-group">
                            <label htmlFor="phoneNo">Phone Number</label>
                            <input
                                type="number"
                                id="phoneNo"
                                placeholder="Enter 10-digit Phone Number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button className="shipping-submit-btn">Continue</button>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default Shipping
