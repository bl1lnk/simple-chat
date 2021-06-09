import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import FormContainer from '../FormContainer'
import {createMessage, listMessages} from '../../actions/messageActions'
import {getUserDetails, getNotifications} from '../../actions/userActions'
import { io } from "socket.io-client";
import axios from "axios"
import Popup from '../Popup'
import Notification from "../Notification"



const HomeScreen = ({history, location}) => {

    

    const redirect = location.search ? location.search.split('=')[1] :'/register'

    
    const [listMessage, setListMessage] = useState([])
    const [msg, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [muteMessage , setMuteMessage] = useState('')
    
    const [showInputMuteNot, setShowInputMuteNot] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const listALLMessages = async ()=>{
        
        if(userInfo){

            const config = {
                headers: {       
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                }
            } 
    
            const {data} = await axios.get('/api/messages', config)
            setAllMessages(data)
          
        }
     
    }
 
    const socket = io("http://127.0.0.1:5000");
    
   


    const listAllMessage = useSelector(state => state.listMessage)
     const {error, loading, messages} = listAllMessage
   
     const listNotifications = useSelector(state => state.listNotifications)
     const {error:errorNotifications, loading:loadingNotifications, notifications} = listNotifications

    socket.emit("setup", userInfo);


    const dispatch = useDispatch()

    const submitHandler= (e)=>{
        e.preventDefault();
        setListMessage([...listMessage, {
            id: listMessage.length,
            value:msg
        }])

       dispatch(createMessage(msg))
       socket.emit("send message","msg");

    }
  
    socket.on("receive message", ()=>{
        // dispatch(listMessages())
        listALLMessages()
      
       });

   

    const muteHandler =(e)=>{
        //console.log(muteMessage.length)
        setShowInputMuteNot(true)
        setTimeout(()=>{
            setShowInputMuteNot(false)
        },4000)

    }
    useEffect(()=>{
        dispatch(getUserDetails())
        listALLMessages()
        if(userInfo){
            dispatch(getNotifications())
        }
        console.log(userInfo)
 
    },[ dispatch, listMessage ])


    return (
      <>
          <div className="container-fluid">
        <div className="row" id="mca_app">
      

        <div className="muteMessage">{muteMessage}</div>
            <section className="col-12" id="mca_side_bar">
                <div className="chat_profile">
                <i id="chatIcon" className="fas fa-sms"></i>
                    <span>Simple Chat</span>
                </div>



                <div className="chat_menu">
                    <ul>
                        <li className="notification active"><i className="fa fa-bell"></i>
            
                        </li>
                        <li><i className="fa fa-file-text"></i></li>
                        <li><i className="fa fa-compass"></i></li>
                        <li><i className="fa fa-google"></i></li>
                        <li><i className="fa fa-envelope"></i></li>
                    </ul>
                </div>
                <div className="chat_bar">
                    <i className="fa fa-bars"></i>
                </div>
            </section>

            <section className="col-12" id="mca_header_bar">
                <div className="row">
                    <div className="col-8">
                        <i className="fa fa-chevron-left"></i>
                        <span className="name">Nikhil Sharma</span>
                    </div>
                    <div className="col-4">
                        <span>
                            <i className="fa fa-phone"></i>
                        </span>
                    </div>
                </div>
            </section>

            <section className="col-12" id="mca_body">

             {/* NOTIFCATION  */}
             {showInputMuteNot && (<Notification message="You can't type .. Muted !" type="error" />)}
  
                <div>
                    <ul>
             
 
                    {allMessages && allMessages.map(function(message, index){
     return <li className={message.sender._id == userInfo._id ? "mine":""}key={index}><Popup child={message.sender.name} content={message.content} user= {message.sender} userInfo = {userInfo} /></li>
})} 

        
   


                    </ul>
                </div>
            </section>

            <section className="col-12" id="mca_footer">
                <div className="row mca_input_row">
                    <div className="col-12">
                        <input type="text" 
                        className="mca_ip" 
                        placeholder="Enter message here..." 
                        onChange={(e)=>setMessage(e.target.value)} 
                        value={msg}
                        />
                
                        <i className="fa fa-paper-plane" onClick={userInfo && userInfo.muted ? muteHandler :submitHandler  }></i>
                    </div>
                </div>
            </section>
        </div>
    </div>
      </>
    )
}

export default HomeScreen
