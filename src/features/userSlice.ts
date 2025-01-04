import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../Type";



const initialState: InitialUserState = {
   user: null
};

//ユーザーの状態を管理するスライスを設定する
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //現在のユーザー情報をdispatchされた情報に置き換える
        login: (state,action) => {
            state.user = action.payload;
        },
        //ログアウトのアクションクリエーター
        logout: state => {
            state.user = null;
        },
    },
});

export default userSlice.reducer;
export const {login,logout} = userSlice.actions;