
import { useState,useEffect } from 'react';
import { collection, DocumentData, onSnapshot,Query,query } from 'firebase/firestore';
import { Channels } from '../Type.ts';
import { db } from '../firebase.ts';

/*useCollectionフックは引数にFirestoreコレクションの
名前を引き受ける。
*/
const useCollection = (data: string) => {
    //
    const [documents,setDocuments] = useState<Channels[]>([]);
    //FirebaseSDKで提供されたAPIでコレクションのオブジェクトを取り出す
    const collectionRef: Query<DocumentData> = query(collection(db,data));
  
  useEffect(() => {
    onSnapshot(collectionRef,querySnapshot => {
      const channels: Channels[] = [];
      querySnapshot.forEach(
        doc => channels.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setDocuments(channels);
    });
    
  });

  return { documents };
}

export default useCollection;