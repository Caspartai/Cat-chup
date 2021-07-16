import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import userAvatar from '../../img/profileIcon.png';
import { AddFriendThunk } from "../../redux/friendsList/action";
import { loadNotiThunk } from "../../redux/notification/action";


export const FriendRequestNotiCard = (props) =>{
    const {noti} = props
    const {donor,content,solved} =noti;
    const [userInfo,setUserInfo] = useState(null);
    const [dateTime,setDateTime] = useState(null);
    const dispatch = useDispatch();
    //console.log('content',content);
    useEffect(()=>{
        let jwt = localStorage.getItem('token');
        async function getDonorInfo (){
            let getDonorReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/profile/'+donor,
                headers:{Authorization:`Bearer ${jwt}`}
            })
            //console.log('getDonorInfo',getDonorReq);
            setUserInfo(getDonorReq.data);
            setDateTime( new Date(noti.created_at).toDateString());
        }
        getDonorInfo();
        //console.log('set up time', noti)
       
    },[noti]);
    const acceptFriend = ()=>{
        dispatch(AddFriendThunk(noti));
        // dispatch(loadNotiThunk(noti.recipient))
    }
    return (
        <div style={{backgroundColor:'#E3E3E3',paddingBottom:'5px',border:'1px solid #303030'}} className='row mx-0'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faUserPlus}/>
            </div>
            <div className='col-2 px-0'>
                <div className='profileImgContainer' style={{width:'50px',height:'50px',borderRadius:'50%',backgroundPositionY:'center',backgroundRepeat:'no-repeat', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'contain'}}></div>
                <div>{donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p>{content.intro}</p>
                <div className='d-flex justify-content-around'>
                <button disabled={solved?true:false} className='btn btn-success' onClick={acceptFriend}>Accept</button>
                {solved?null:<button className='btn btn-danger'>Decline</button>}
                </div>
                
            </div>
            <div className='col-2 px-0'>
                {dateTime}
            </div>
        </div>
    )
}