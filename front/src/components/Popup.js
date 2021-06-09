
import react,{useState , useEffect} from 'react'
import { Popover } from '@varld/popover';
import axios from "axios"


let Popup = ({child, content, user, userInfo, location}) => {

  const [muteTime, setMuteDuration] = useState("")
  let timestampInMinute = Math.round(new Date().getTime()/60000)


const submitMuteHandler =async (e)=>{
    const config = {
      headers: {       
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
      }
  } 
  const muteDuration = parseInt(timestampInMinute) + parseInt(muteTime)
  const {data} = await axios.put(`/api/users/${user._id}`,{muteDuration}, config)


}

useEffect(async ()=>{
  if(timestampInMinute >= user.muteDuration && user.muteDuration !== 0){
    const config = {
      headers: {       
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
      }
  } 
  const muteDuration =0
  const {data} = await axios.put(`/api/users/${user._id}`,{muteDuration}, config)
  }
})

  return (
    <Popover popover={({ visible, open, close }) => {
      return (
        <div>
          
        <form onSubmit={submitMuteHandler}>
       <p> Username : {user.name} </p>
   

        
        {user.muted ? ("") : (<input type="text" placeholder="Enter mute length in Minutes" value={muteTime} onChange={(e)=>setMuteDuration(e.target.value)} />)}
        {user.muted ? (  <button className="btn btn-success" type="submit"> Unmute</button>) : (  <button className="btn btn-danger" type="submit"> Mute</button>)}
      
        </form>

          {/* <button onClick={() => close()}>
           close
          </button> */}
        </div>
      )
    }}>
      <span className="User">{child} : {content}</span>
    </Popover>
  )
}

export default Popup