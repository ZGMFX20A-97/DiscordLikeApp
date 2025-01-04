import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.ts";
import channelReducer from "../features/channelSlice.ts";

//redux storeを設定する
export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
    }
});
//useDispatchの型を定義する
export type AppDispatch = typeof store.dispatch;
//storeが持っているstateの方を定義する(store.getStateの戻り値の型を取得する)
export type RootState = ReturnType<typeof store.getState>;