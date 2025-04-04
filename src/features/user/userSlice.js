import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')) || null,  // Default to null if no user in sessionStorage
    status: 'IDLE'
}

// Register user with profile image
export const registerUser = createAsyncThunk("/register", async (userDetails) => {
    console.log('User Details:', userDetails);  // Debugging to check what is being sent

    try {
        const response = await api.post('/auth/register', userDetails, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
           
          return response.data;

    } catch (err)  {
        console.log('Registration error:', err.response.data);
        throw err;
      }
    
});

// Authenticate user (for login)
export const authenticateUser = createAsyncThunk("/login", async (userDetails) => {
    try {
        const response = await api.post('/auth/login', userDetails);
        const { data, error } = response;

        if (error) throw error;

        // Extract token from the response
        const Authorization = data.result.token;

        if (!Authorization) {
            throw new Error("Token not found in the response");
        }

        // Store the token and user data in sessionStorage
        sessionStorage.setItem('access_token', Authorization);
        sessionStorage.setItem('user', JSON.stringify(data.result.user));

        return data;

    } catch (err) {
        console.log('Error during authentication:', err.message);
        throw err;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'IDLE';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'PENDING';  // When registration is in progress
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'SUCCESS';  // When registration is successful
                state.user = action.payload?.result?.user || null;  // Assuming the response contains the user data
            })
            .addCase(registerUser.rejected, (state) => {
                state.status = 'FAILED';  // When registration fails
            })
            .addCase(authenticateUser.pending, (state) => {
                state.status = 'PENDING';  // When login is in progress
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.status = 'SUCCESS';  // When login is successful
                state.user = action.payload.result.user;  // Assuming login response contains the user data
            })
            .addCase(authenticateUser.rejected, (state) => {
                state.status = 'FAILED';  // When login fails
            });
    }
});

export const { resetStatus } = userSlice.actions;
export const fetchUser = (state) => state.user.user;
export const fetchUserStatus = (state) => state.user.status;

export default userSlice.reducer;
