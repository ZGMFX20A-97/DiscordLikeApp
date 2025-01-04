import { useState,useEffect } from 'react';
import { collection, onSnapshot,orderBy,query, Timestamp } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAppSelector } from '../app/hooks.ts';

interface Messages{
    timestamp: Timestamp;
    message: string;
    user: {uid: string;
      photo: string;
      email: string;
      displayName: string;}
}


/*useCollectionフックは引数にFirestoreコレクションの
名前を引き受ける。
*/

const useSubCollection = (collectionName: string,subCollectionName: string) => {

    //チャンネルIDをstoreから取得する
    const { channelId } = useAppSelector( state => state.channel);
    const [subDocuments,setSubDocuments] = useState<Messages[]>([]);
    
  
  useEffect(() => {

        let collectionRef = collection(db,collectionName,String(channelId),subCollectionName);
        //送信時間の新しい順に取得したデータを並び直す
        const collectionRefOrderBy = query(collectionRef,orderBy("timestamp","desc"));
    
        onSnapshot(collectionRefOrderBy,snapshot => {
          let results: Messages[]= [];
          snapshot.docs.forEach(doc => {
            results.push({
              timestamp: doc.data().timestamp,
              message: doc.data().message,
              user: doc.data().user,
            });
          });
          setSubDocuments(results);
        });
        //チャンネルIDを依存配列に入れることでチャンネルが変わるたびにそのチャンネルチャット内容をとってくるように出来る
      },[channelId])

      return { subDocuments }
    
}

export default useSubCollection;