import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { hashPin, verifyHashedPin } from '../utils/hashUtils';

// Initial state for account operations (deposit, withdrawal, transfer)
const initialState = {
  deposit: null,
  withdrawal: null,
  transfer: null,
  status: 'IDLE', // Represents the status of async operations (IDLE, PENDING, SUCCESS, FAILED)
  error: null,    // Store errors related to any operations
  pin: null,      // Store the user's hashed PIN for verification
  balance: parseFloat(sessionStorage.getItem('balance')) || 0, // Load balance from sessionStorage if available
};

// Async thunk for creating a deposit
export const createDeposit = createAsyncThunk(
  '/account/deposit',
  async (depositDetails, { dispatch }) => {
    try {
      const response = await api.post('/account/deposit', depositDetails);
      const { data, error } = response;

      if (error) throw error;

      const updatedBalance = data.balance;
      sessionStorage.setItem('balance', updatedBalance); // Store the updated balance in sessionStorage
      dispatch(accountSlice.actions.setBalance(updatedBalance)); // Dispatch setBalance action

      return data; // Deposit data will be returned
    } catch (err) {
      console.log('Error creating deposit:', err.message);
      throw err;
    }
  }
);

// Async thunk for creating a withdrawal (now requires PIN verification)
export const createWithdrawal = createAsyncThunk(
  '/account/withdrawal',
  async ({ withdrawalDetails, pin }, { getState, dispatch }) => {
    const state = getState();
    const storedHashedPin = state.account.pin;

    const isPinValid = await verifyHashedPin(pin, storedHashedPin);
    if (!isPinValid) {
      throw new Error('Invalid PIN');
    }

    try {
      const response = await api.post('/account/withdrawal', withdrawalDetails);
      const { data, error } = response;

      if (error) throw error;

      const updatedBalance = data.balance;
      sessionStorage.setItem('balance', updatedBalance); // Store the updated balance in sessionStorage
      dispatch(accountSlice.actions.setBalance(updatedBalance)); // Dispatch setBalance action

      return data; // Withdrawal data will be returned
    } catch (err) {
      console.log('Error creating withdrawal:', err.message);
      throw err;
    }
  }
);

// Async thunk for creating a transfer (now requires PIN verification)
export const createTransfer = createAsyncThunk(
  '/account/transfer',
  async ({ transferDetails, pin }, { getState, dispatch }) => {
    const state = getState();
    const storedHashedPin = state.account.pin;

    const isPinValid = await verifyHashedPin(pin, storedHashedPin);
    if (!isPinValid) {
      throw new Error('Invalid PIN');
    }

    try {
      const response = await api.post('/account/transfer', transferDetails);
      const { data, error } = response;

      if (error) throw error;

      const updatedBalance = data.balance;
      sessionStorage.setItem('balance', updatedBalance); // Store the updated balance in sessionStorage
      dispatch(accountSlice.actions.setBalance(updatedBalance)); // Dispatch setBalance action

      return data; // Transfer data will be returned
    } catch (err) {
      console.log('Error creating transfer:', err.message);
      throw err;
    }
  }
);

// Account slice to handle state for deposit, withdrawal, transfer operations, and balance
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // Action to reset status and errors
    resetStatus: (state) => {
      state.status = 'IDLE';
      state.error = null;
      state.deposit = null;
      state.withdrawal = null;
      state.transfer = null;
    },
    // Action to set the PIN (hashing the PIN before storing it)
    setPin: (state, action) => {
      const hashedPin = hashPin(action.payload);
      state.pin = hashedPin;
    },
    // Action to update the balance in the store (no need to declare setBalance manually here)
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers(builder) {
    // Deposit operations
    builder
      .addCase(createDeposit.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(createDeposit.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.deposit = action.payload; // Save deposit data to state
      })
      .addCase(createDeposit.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });

    // Withdrawal operations
    builder
      .addCase(createWithdrawal.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(createWithdrawal.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.withdrawal = action.payload; // Save withdrawal data to state
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });

    // Transfer operations
    builder
      .addCase(createTransfer.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.transfer = action.payload; // Save transfer data to state
      })
      .addCase(createTransfer.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

// Export actions from the slice
export const { resetStatus, setPin } = accountSlice.actions; // Removed setBalance here

// Selectors to access the state
export const fetchDeposit = (state) => state.account.deposit;
export const fetchWithdrawal = (state) => state.account.withdrawal;
export const fetchTransfer = (state) => state.account.transfer;
export const fetchAccountStatus = (state) => state.account.status;
export const fetchAccountError = (state) => state.account.error;
export const fetchPin = (state) => state.account.pin;  // Access PIN if needed
export const fetchBalance = (state) => state.account.balance;  // Access balance

export default accountSlice.reducer;
