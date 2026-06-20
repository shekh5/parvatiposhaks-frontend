import "../UserStyles/Form.css"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { PageTitle } from "../components/PageTitle.jsx"
import { updatePassword, loadUser, removeErrors, removeSuccess } from "../features/user/userSlice.js"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import Loader from "../components/Loader.jsx"

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, success, loading } = useSelector((state) => state.user)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }

        const passwords = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        }

        dispatch(updatePassword(passwords))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
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

        if (success) {
            toast.success("Password updated successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            dispatch(loadUser())
            dispatch(removeSuccess())
            navigate("/profile")
        }
    }, [dispatch, error, success, navigate])

    return (
        <>
            {loading ? (<Loader/>): (<>
            <Navbar/>
            <PageTitle title="Update Password" />
            <div className="form-container container">
                <div className="form-content">
                    <form className="form" onSubmit={updatePasswordSubmit}>
                        <h2>Update Password</h2>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="authBtn" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                        <p className="form-links">
                            <Link to="/profile">Cancel</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer /></>)
}

        </>
    )
}

export default UpdatePassword
