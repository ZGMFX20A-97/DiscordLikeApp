import {DocumentData} from "firebase/firestore"

//型定義ファイル
export interface InitialUserState {
    user: null | {
        uid: string;
        photo: string;
        email: string;
        displayName: string;
    }

}

export interface InitialChannelState {
    channelId: string | null;
    channelName: string | null;

}

export interface Channels {
    id:string;
    channel: DocumentData;
  }

export type Props = {
    id: string;
    channel: DocumentData;
}