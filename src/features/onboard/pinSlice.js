import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Initial state for the pin feature
const initialState = {
    pin: {}, // Initially no pin set
    status: 'IDLE', // Status to handle async states
    error: null, // To store error messages
};

// Async action to set the pin (can be used for initial pin creation)
export const setPin = createAsyncThunk(
    '/setPin',
    async (pinDetails, { rejectWithValue }) => {
        try {
            // No need to pass token explicitly in the headers since it's handled by axiosInstance
            const response = await api.post('/onboarding/setup/pin', pinDetails);
            return response.data;
        } catch (error) {
            console.log('Error response:', error.response);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Async action to verify the pin when making a transaction
export const verifyPin = createAsyncThunk(
    '/verifyPin',
    async (pinDetails, { rejectWithValue }) => {
        try {
            // No need to pass token explicitly in the headers since it's handled by axiosInstance
            const response = await api.post('/onboarding/validate/pin', pinDetails);
            return response.data;
        } catch (error) {
            console.log('Error response:', error.response);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        resetPinStatus: (state) => {
            state.status = 'IDLE';
            state.error = null;
        },
        setPinManually: (state, action) => {
            state.pin = action.payload; // Set the pin manually (e.g., for local storage)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setPin.pending, (state) => {
                state.status = 'PENDING';
                state.error = null;
            })
            .addCase(setPin.fulfilled, (state, action) => {
                console.log("Pin response:", action.payload);
                state.status = 'SUCCESS';
                state.pin = action.payload?.pin || null;
            })
            .addCase(setPin.rejected, (state, action) => {
                state.status = 'FAILED';
                state.error = action.payload;
            });

        builder
            .addCase(verifyPin.pending, (state) => {
                state.status = 'PENDING';
                state.error = null;
            })
            .addCase(verifyPin.fulfilled, (state) => {
                state.status = 'SUCCESS';
            })
            .addCase(verifyPin.rejected, (state, action) => {
                state.status = 'FAILED';
                state.error = action.payload;
            });
    },
});

export const { resetPinStatus, setPinManually } = pinSlice.actions;

export const fetchPin = (state) => state.pin.pin;
export const fetchPinStatus = (state) => state.pin.status;
export const fetchPinError = (state) => state.pin.error;

export default pinSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import api from '../../api/api'

// // Initial state for the pin feature
// const initialState = {
//     pin: null, // Initially no pin set
//     status: 'IDLE' // Status to handle async states
//     // error: null // To store error messages
// }

// // Helper function to get the access token from sessionStorage
// const token = sessionStorage.getItem('access_token');

// // Async action to set the pin (can be used for initial pin creation)
// export const setPin = createAsyncThunk(
//     '/setPin',
//     async (pinDetails) => {
//         try {
//             const response = await api.post('/onboarding/setup/pin', pinDetails, { Authorization: token } ); // Attach token to the request
//             return response.data;
//         } catch (error) {
//             console.log(`Error occured ${error.message}`);
//         }
//     }
// );

// // Async action to verify the pin when making a transaction
// export const verifyPin = createAsyncThunk(
//     '/verifyPin',
//     async (pinDetails) => {
//         try {
//             console.log(`Token value: ${ token }`)
//             const response = await api.post('/onboarding/validate/pin', pinDetails, { Authorization: token} ); // Attach token to the request               
//             return response.data;
//         } catch (error) {
//             console.log(`Error occured ${error.message}`);
//         }
//     }
// );

// // export const getUser = createAsyncThunk(
// //     '/getUser',
// //     async () => {
// //         try {
// //             const response = await api.get('/auth/user', { Authorization: token });         
// //         } catch (error) {
// //             console.log(`Error occured ${error.message}`);
// //         }
// //     }
// // );


// export const pinSlice = createSlice({
//     name: 'pin',
//     initialState,
//     reducers: {
//         resetPinStatus: (state) => {
//             state.status = 'IDLE'
//             // state.error = null;
//         },
//         setPinManually: (state, action) => {
//             state.pin = action.payload; // Set the pin manually (e.g., for local storage)
//         }
//     },
//     extraReducers: (builder) => {
//         // Handle the setPin async action
//         builder
//             .addCase(setPin.pending, (state) => {
//                 state.status = 'PENDING';
//             })
//             .addCase(setPin.fulfilled, (state, action) => {
//                 state.status = 'SUCCESS';
//                 state.pin = action.payload.pin; // Assuming the response has the pin object
//             })
//             .addCase(setPin.rejected, (state, action) => {
//                 state.status = 'FAILED';
//                 // state.error = action.payload;
//             });

//         // Handle the verifyPin async action
//         builder
//             .addCase(verifyPin.pending, (state) => {
//                 state.status = 'PENDING';
//             })
//             .addCase(verifyPin.fulfilled, (state) => {
//                 state.status = 'SUCCESS';
//             })
//             .addCase(verifyPin.rejected, (state, action) => {
//                 state.status = 'FAILED';
//                 // state.error = action.payload;
//             });

//             // builder
//             // .addCase(getUser.pending, (state) => {
//             //     state.status = 'PENDING';
//             // })
//             // .addCase(getUser.fulfilled, (state, action) => {
//             //     state.status = 'SUCCESS';
//             //     state.user = action.payload;  // Assuming the response contains user data
//             // })
//             // .addCase(getUser.rejected, (state, action) => {
//             //     state.status = 'FAILED';
//             //     // state.error = action.payload;  // Set error from rejected action
//             // });
//     }
// });

// // Export actions
// export const { resetPinStatus, setPinManually } = pinSlice.actions;

// // Selector to get the pin and status
// export const fetchPin = (state) => state.pin.pin;
// export const fetchPinStatus = (state) => state.pin.status;
// // export const fetchPinError = (state) => state.pin.error;
// // export const fetchUser = (state) => state.pin.user;

// export default pinSlice.reducer;
