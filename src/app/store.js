import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import pageReducer from "../features/page/pageSlice";
import pinReducer from "../features/onboard/pinSlice";
import accountReducer from "../features/account/accountSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        pin: pinReducer,
        account: accountReducer,
    },
});

export default store;