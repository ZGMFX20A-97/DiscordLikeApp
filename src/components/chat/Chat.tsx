import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatHeader from "./ChatHeader.tsx"
import {AddCircleOutline, CardGiftcard, EmojiEmotions, Gif } from '@mui/icons-material'
import ChatMessage from "./ChatMessage.tsx"
import { useAppSelector } from '../../app/hooks.ts'
import {db} from "../../firebase.ts"
import { query,addDoc, collection, CollectionReference, DocumentData,DocumentReference,onSnapshot,serverTimestamp,Timestamp, orderBy } from 'firebase/firestore'
import { InitialUserState } from '../../Type.ts'

interface Messages{
    timestamp: Timestamp;
    message: string;
    user: InitialUserState;
}



const Chat = () => {
  const [inputText,setInputText] = useState<string>("");
  const [messages,setMessages] = useState<any[]>([]);
  const {channelName} = useAppSelector((state) => state.channel);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const {user} = useAppSelector((state) => state.user)

  useEffect(() =>{

    let collectionRef = collection(db,"channels",String(channelId),"messages");
    const collectionRefOrderBy = query(collectionRef,orderBy("timestamp","desc"));

    onSnapshot(collectionRefOrderBy,(snapshot) => {
      let results: Messages[]= [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  },[channelId])



  const sendMessage =async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
      const collectionRef: CollectionReference<DocumentData> = collection(db,"channels",String(channelId),"messages");

      await addDoc(collectionRef,{
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,


      });
      setInputText("");
  }
  return (
    <div className="chat">
    <ChatHeader channelName={channelName}/>
    <div className="chatMessage">
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
            <input type="text" placeholder="Udemyへ送信する" 
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