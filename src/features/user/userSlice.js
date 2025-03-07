import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    status: 'IDLE'
}
export const registerUser = createAsyncThunk("/register", async (userDetails) => {
    console.log('User Details:', userDetails);
    try {
        const {data, error} = await api.post('/register', userDetails)
        if (error)  throw error;
            return data
        } catch (err) {
            console.log(err.message)
            throw err
    }
}
)

// export const authenticateUser = createAsyncThunk("/login", async (userDetails) => {
//     try {
//         const {data, error, headers} = await api.post('/login', userDetails)
//         if (error) throw error;
//         const { authorization } = headers 
 
//         sessionStorage.setItem('access_token', authorization)
//         console.log(`authorization header: ${JSON.stringify(headers)}`)
//         console.log(`JWT token value ${authorization}`)
//         sessionStorage.setItem('user', JSON.stringify(data))
//         return (data)
//     } catch (err) {
//         console.log(err.message)
//         throw err
//     }


// })


export const authenticateUser = createAsyncThunk("/login", async (userDetails) => {
    try {
        // Send POST request to the login endpoint
        const response = await api.post('/login', userDetails);
        const { data, error } = response;

        // Log the entire response object, headers, and data
        console.log("Full Response:", response);
        console.log("Response Data:", data);

        if (error) throw error;

        // Extract the token from the response body (data.result.token)
        const authorization = data.result.token;

        if (!authorization) {
            throw new Error("Token not found in the response");
        }

        // Store the token in sessionStorage
        sessionStorage.setItem('access_token', authorization);
        console.log(`JWT token value: ${authorization}`);

        // Store the user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data.result.user));

        // Return the user data
        return data;

    } catch (err) {
        console.log('Error during authentication:', err.message);
        throw err;
    }
});

    

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'IDLE'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'PENDING'
            })
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'SUCCESS'
                state.user = action.payload
            })
            builder.addCase(registerUser.rejected, (state, action) => {
                state.status = 'FAILED'
            })
        
            builder
                .addCase(authenticateUser.pending, (state) => {
                    state.status = 'PENDING'
                })
                builder.addCase(authenticateUser.fulfilled, (state, action) => {
                    state.status = 'SUCCESS'
                    state.user = action.payload
                })
                builder.addCase(authenticateUser.rejected, (state, action) => {
                    state.status = 'FAILED'
                })
        }

})

export const { resetStatus } = userSlice.actions
export const fetchUser = (state) => state.user.user
export const fetchUserStatus = (state) => state.user.status

export default userSlice.reducer;