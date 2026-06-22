import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getErrorMessage = (error, fallbackMessage) => {
    const responseData = error.response?.data;
    const validationMessage = responseData?.errors?.map((item) => item.msg).filter(Boolean).join(", ");

    return responseData?.message || validationMessage || error.message || fallbackMessage;
}


//register Api
export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/signup', userData, config)
        console.log("registration data", data);
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "registration failed. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const loginUser = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/v1/SignIn', { email, password }, config)
        console.log("login data", data);
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "login failed. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const forgotPassword = createAsyncThunk("user/forgotPassword", async ({ email }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', { email }, config)
        console.log("forgot password data", data);
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "Something went wrong. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const loadUser = createAsyncThunk("user/loadUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/profile")
        return data
    } catch (error) {
        const errorMsg = getErrorMessage(error, "Failed to load user data. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("/api/v1/logout")
        return data
    } catch (error) {
        const errorMsg = getErrorMessage(error, "Logout failed. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const updateProfile = createAsyncThunk("user/updateProfile", async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/v1/profile/update', userData, config)
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "Failed to update profile. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const updatePassword = createAsyncThunk("user/updatePassword", async (passwords, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/v1/password/update', passwords, config)
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "Failed to update password. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})

export const resetPassword = createAsyncThunk("user/resetPassword", async ({ token, passwords }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`/api/v1/password/reset/${token}`, passwords, config)
        return data

    } catch (error) {
        const errorMsg = getErrorMessage(error, "Failed to reset password. Please try again.")
        return rejectWithValue({ message: errorMsg, statusCode: error.response?.status })
    }
})


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        message: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.user || action.payload?.data || null
                state.success = action.payload.success
                state.error = null
                state.isAuthenticated = Boolean(state.user)

                //Store in localStorage
                localStorage.setItem('user', JSON.stringify(state.user))
                localStorage.setItem('isAuthenticated', JSON.stringify(state.user))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "registration failed. Please try again."
                state.user = null
                state.isAuthenticated = false
            })



        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.user || null
                state.success = action.payload.success
                state.error = null
                state.isAuthenticated = Boolean(action.payload?.user)
                console.log("user after login", state.user)

                //Store in localStorage
                localStorage.setItem('user', JSON.stringify(state.user))
                localStorage.setItem('isAuthenticated', JSON.stringify(state.user))
            
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "login failed. Please try again."
                state.user = null
                state.isAuthenticated = false
            })



        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.data || null
                state.success = action.payload.success
                state.error = null
                state.isAuthenticated = Boolean(action.payload?.user)
                console.log("auth status", state.isAuthenticated)
                console.log("user after login", state.user)
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Something went wrong. Please try again."
            })


        builder.addCase(loadUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.user || null
                state.isAuthenticated = Boolean(action.payload?.user)
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to load user data. Please try again."
                state.user = null
                state.isAuthenticated = false

                // Clear LocalStorage on any load error (Option A)
                localStorage.removeItem('user')
                localStorage.removeItem('isAuthenticated')

                // Show toast alert on explicit token expiration (Option B)
                if (action.payload?.statusCode === 401) {
                    toast.error("Your session has expired. Please log in again.");
                }
            })


        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.success = action.payload.success

                localStorage.removeItem('user')
                localStorage.removeItem('isAuthenticated')
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Logout failed. Please try again."


            })

        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data || null
                state.success = action.payload?.success || false
                state.error = null
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to update profile. Please try again."
            })

        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.user || null
                state.success = action.payload?.success || false
                state.error = null
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to update password. Please try again."
            })

        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.user || null
                state.success = action.payload?.success || false
                state.error = null
                state.isAuthenticated = Boolean(action.payload?.user)
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to reset password. Please try again."
            })
    }
})

export const { removeErrors, removeSuccess } = userSlice.actions
export default userSlice.reducer; 
