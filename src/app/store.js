import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import pageReducer from "../features/user/page/pageSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    },
});

export default store;