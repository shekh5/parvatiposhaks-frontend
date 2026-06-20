import { useEffect, useRef, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "../UserStyles/Profile.css"
import Loader from "../components/Loader.jsx"
import { PageTitle } from "../components/PageTitle.jsx"
import { loadUser } from "../features/user/userSlice.js"

const Profile = () => {
    const dispatch = useDispatch()
    const hasRequestedUser = useRef(false)
    const [profileLoadAttempted, setProfileLoadAttempted] = useState(false)
    const { user, loading, isAuthenticated } = useSelector((state) => state.user)

    useEffect(() => {
        if (user || hasRequestedUser.current) {
            return
        }

        hasRequestedUser.current = true
        let isMounted = true

        dispatch(loadUser()).finally(() => {
            if (isMounted) {
                setProfileLoadAttempted(true)
            }
        })

        return () => {
            isMounted = false
        }
    }, [dispatch, user])

    if (loading || (!user && !profileLoadAttempted)) {
        return <Loader />
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/user/login" replace />
    }

    const avatarUrl = user.avatar?.url || "/images/profile.png"
    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Not available"

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <PageTitle title="My Profile" /><main className="profile-container">
                            <section className="profile-image">
                                <h1 className="profile-heading">My Profile</h1>
                                <img src={avatarUrl} alt="User Profile" />
                                <Link to="/profile/update">Edit Profile</Link>
                            </section>

                            <section className="profile-details" aria-label="Profile details">
                                <div className="profile-detail">
                                    <h2>Name</h2>
                                    <p>{user.name || "Not available"}</p>
                                </div>
                                <div className="profile-detail">
                                    <h2>Username</h2>
                                    <p>{user.username || "Not available"}</p>
                                </div>
                                <div className="profile-detail">
                                    <h2>Email</h2>
                                    <p>{user.email || "Not available"}</p>
                                </div>
                                <div className="profile-detail">
                                    <h2>Role</h2>
                                    <p>{user.role || "user"}</p>
                                </div>
                                <div className="profile-detail">
                                    <h2>Joined</h2>
                                    <p>{joinedDate}</p>
                                </div>
                            </section>

                            <div className="profile-buttons">
                                <Link to="/">Back to Home</Link>
                                <Link to="/orders/user">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </main>
                    </>
                )
            }
        </>
    )
}

export default Profile
