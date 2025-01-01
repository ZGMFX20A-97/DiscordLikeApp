
import { useState,useEffect } from 'react';
import { collection, DocumentData, onSnapshot,Query,query } from 'firebase/firestore';
import { Channel } from '../Type.ts';

import { db } from '../firebase.ts';



const useCollection = (data: string) => {

    const [documents,setDocuments] = useState<Channel[]>([]);
  
    const collectionRef: Query<DocumentData> = query(collection(db,data));
  
  useEffect(() => {
    onSnapshot(collectionRef,(querySnapshot) => {
      const channels: Channel[] = [];
      querySnapshot.forEach(
        (doc) => channels.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setDocuments(channels);
    });
    
  });

  return {documents};
}

export default useCollection