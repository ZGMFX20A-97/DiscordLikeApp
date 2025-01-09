import React from 'react'
import './Sidebar.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel.tsx';
import MicIcon from '@mui/icons-material/Mic';
import { Headphones, Settings } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks.ts';
import {db,auth} from '../../firebase.ts';
import useCollection from '../../hooks/useCollection.tsx';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';


const Sidebar = () => {

  //今のユーザー状態を取得する
  const { user }= useAppSelector(state => state.user);

  //カスタムフックのuseCollectionを使用してチャンネルのDBデータを取得すr
  const { documents: channels } = useCollection("channels")
  
  //チャンネルを追加くす関数
  const addChannel = async () =>{

      //打ち込んだチャンネル名をchannelName変数に格納する
      let channelName: string | null = prompt("新しいチャンネルを作成します");

      //入力がある場合チャンネル名をFireStoreのChannelsコレクションに追加する
      if(channelName){
        await addDoc(collection(db,"channels"),{
          channelName: channelName,
        });
      }

  }

  return (
    <div className="sidebar">
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./discordIcon.png" alt="/" />        
        </div>
      </div>

      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
            <ExpandMoreIcon />
            <h4>プログラミングチャンネル</h4>
            </div>
            {/* ＋アイコンを押せばチャンネルが追加できる */}
            <AddIcon className="sidebarAddIcon" onClick={addChannel}/>
          </div>

          <div className="sidebarChannelList">
            {
              channels.map( channel => (
              <SidebarChannel channel = {channel} 
                              id = {channel.id} 
                              key = {channel.id}/>)
              )
            }
          </div>

          <div className="sidebarFooter">
            
            <div className="sidebarAccount">
              {/* アイコンをクリックしたらログアウトができる */}
              <img src={user?.photo} alt="ユーザーのアイコン" onClick={() => signOut(auth)}/>

              <div className="accountName">
                <h4>{user?.displayName}</h4>
                {/* UID長くてレイアウトが崩れるため前８位を切り取って表示する */}
                <span>#{user?.uid.substring(0,8)}</span>
              </div>

            </div>

            <div className="sidebarVoice">
            <MicIcon />
            <Headphones />
            <Settings />
            </div>
         
          </div>
        
        </div>
      
      </div>

      </div>
      
    )
  
}

export default Sidebar