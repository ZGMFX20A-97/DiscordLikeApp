import { createSlice } from "@reduxjs/toolkit";
import { InitialChannelState } from "../Type";


const initialState: InitialChannelState = {
    channelId: null,
    channelName: null,
};

//チャンネルの状態を管理するスライスを設定する
export const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelInfo: (state,action) =>{
            //現在のチャンネル情報をdispatchされた情報に置き換える
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        }
    },
});

export default channelSlice.reducer;
export const {setChannelInfo} = channelSlice.actions;