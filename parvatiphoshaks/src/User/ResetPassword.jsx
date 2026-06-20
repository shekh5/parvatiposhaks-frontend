import "../UserStyles/Form.css"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { PageTitle } from "../components/PageTitle.jsx"
import { resetPassword, removeErrors, removeSuccess } from "../features/user/userSlice.js"

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const { error, success, loading } = useSelector((state) => state.user)

    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        if (!password || !confirmedPassword) {
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

        if (password !== confirmedPassword) {
            toast.error("Passwords do not match", {
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
            password,
            confirmedPassword,
        }

        dispatch(resetPassword({ token:token, passwords }))
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
            toast.success("Password reset successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            dispatch(removeSuccess())
            navigate("/login")
        }
    }, [dispatch, error, success, navigate])

    return (
        <>
            <PageTitle title="Reset Password" />
            <div className="form-container container">
                <div className="form-content">
                    <form className="form" onSubmit={resetPasswordSubmit}>
                        <h2>Reset Password</h2>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="authBtn" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        <p className="form-links">
                            <Link to="/user/login">Cancel</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword