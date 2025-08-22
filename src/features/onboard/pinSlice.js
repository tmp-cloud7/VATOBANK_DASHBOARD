import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Initial state for the pin feature
const initialState = {
    pin: {}, 
    status: 'IDLE',
    error: null, 
};

// Async action to set the pin 
export const setPin = createAsyncThunk(
    '/setPin',
    async (pinDetails, { rejectWithValue }) => {
        try {
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
            state.pin = action.payload; 
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

