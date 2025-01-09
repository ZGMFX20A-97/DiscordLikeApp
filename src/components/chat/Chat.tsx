import React, { useState } from 'react'
import "./Chat.scss"
import ChatHeader from "./ChatHeader.tsx"
import {AddCircleOutline, CardGiftcard, EmojiEmotions, Gif } from '@mui/icons-material'
import ChatMessage from "./ChatMessage.tsx"
import { useAppSelector } from '../../app/hooks.ts'
import {db} from "../../firebase.ts"
import { addDoc, collection, CollectionReference, DocumentData,serverTimestamp } from 'firebase/firestore'
import useSubCollection from '../../hooks/useSubCollection.tsx'



const Chat = () => {
  //入力欄に入力されたメッセージを格納する状態変数
  const [inputText,setInputText] = useState<string>("");

  //チャンネルネームをstoreから取得する
  const { channelName } = useAppSelector( state => state.channel);

  //チャンネルIDをstoreから取得する
  const { channelId } = useAppSelector( state => state.channel);
  
  //ログインユーザー(メッセージを発信するユーザー)情報をstoreから取得する
  const { user } = useAppSelector( state => state.user)

  //カスタムフックでチャンネル内のメッセージ内容を取り出す
  const { subDocuments: messages } = useSubCollection("channels","messages");

  //メッセージを送信するための関数
  const sendMessage =async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
      //サブミット後の自動リロードを阻止する
      e.preventDefault();

      //親コレクションであるchannelsの中にある、messagesサブコレクションの中のメッセージドキュメントに情報を入れる
      const collectionRef: CollectionReference<DocumentData> = collection(db,"channels",String(channelId),"messages");

      await addDoc(collectionRef,{
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      });
      //submitした後入力欄を空白にリセットする
      setInputText("");
  }

  return (
    <div className="chat">
    <ChatHeader channelName={channelName}/>
    <div className="chatMessage">
      {/* チャット内容を展開する */}
    {messages.map((message,index) =>(
      <ChatMessage key = {index} 
                  message={message.message} 
                  timestamp={message.timestamp}
                  user={message.user}/>
    ))}

    </div>   
        <div className="chatInput">
        <AddCircleOutline />
        <form>
            <input type="text" placeholder={`${channelName}チャンネルへ送信する`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                  value={inputText}>    
            </input>

            <button type="submit" className="chatInputButton" 
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
            </button>

        </form>

        <div className="chatInputIcons">
            <CardGiftcard />
            <Gif />
            <EmojiEmotions />
        </div>

        </div>
        
        </div>
  )
}

export default Chat;