import React from 'react'
import "./SidebarChannel.scss"
import { Props } from '../../Type'
import { useAppDispatch } from '../../app/hooks.ts'
import { setChannelInfo } from '../../features/channelSlice.ts'

const SidebarChannel = (props: Props) => {

  const {id,channel} = props;
  const dispatch = useAppDispatch();
  return (
    <div className="sidebarChannel" onClick={() => dispatch(setChannelInfo({
      channelId: id,
      channelName: channel.channel.channelName,
    }))}>
        <h4 >
            <span className="sidebarChannelHash" >#</span>
            {channel.channel.channelName}
        </h4>
        
        </div>
  )
}

export default SidebarChannel