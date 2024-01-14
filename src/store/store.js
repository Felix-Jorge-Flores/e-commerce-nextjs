import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";
import { bonillaShopSlice } from "./bonillaShop/bonillaShopSlice";
// import { themeSlice } from "../theme/themeSlice";
// import { uiSlice, calendarSlice, authSlice, bonillaShopSlice } from "../store";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        bonillaShop: bonillaShopSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});