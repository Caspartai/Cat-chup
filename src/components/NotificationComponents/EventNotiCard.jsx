import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import userAvatar from '../../img/profileIcon.png';

export const EventNotiCard = (props)=>{
    const {noti} = props;
    const {solved} = noti;
    const [localSolved,setLocalSolved] = useState(null);
    const [userInfo,setUserInfo] = useState(null);
    const [timeString,setTimeString] = useState(null);

    useEffect(()=>{
        console.log('in like noti card',noti);
        let jwt = localStorage.getItem('token');
        async function getUserFunc(){
            let getUserReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/basic/'+noti.donor,
                headers:{Authorization:`Bearer ${jwt}`},
            })
            //console.log('get User res',getUserReq);
            setUserInfo(getUserReq.data);
        }
        if(noti.donor){
            getUserFunc();

        }
        let time =new Date(noti.created_at)
        setTimeString(time.toLocaleDateString()+' '+time.toLocaleTimeString())
        setLocalSolved(solved);
    },[])
    const handleIgnore = async (e)=>{
        e.stopPropagation();
        let token = localStorage.getItem('token');
        try {
            let ignoreReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/noti/ignore/'+noti.id,
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log('ignoreReq',ignoreReq);
            if(ignoreReq.status==200){
                setLocalSolved(true);
            }
        } catch (error) {
            console.log('ignore friend req',error)
        }
        
    }
    const handleRedirect = ()=>{
        window.location.href='/post/'+noti.content.postId
    }
    const handleRedProfile = (e)=>{
        e.stopPropagation();
        window.location.href = '/'+noti.donor

    }
    return (
        
        <div onClick={handleRedirect} style={{cursor:'pointer'}} >
            <div style={{backgroundColor:'#E3E3E3',border:'1px solid #303030'}} className='row mx-0 py-2'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faCalendarCheck}/>
            </div>
            <div className='col-2 px-0'>
                <div onClick={handleRedProfile} className='profileImgContainer' style={{borderRadius:'50%',backgroundRepeat:'no-repeat',backgroundPosition:'center',width:'50px',height:'50px', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'cover'}}></div>
                <div>{noti.donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p>{noti.donor} want to join your event!</p>
                <div className='d-flex justify-content-around'>
                <button disabled={localSolved||solved?true:false} className='btn btn-success' >Accept</button>
                {(localSolved||solved)?null:<button onClick={handleIgnore} className='btn btn-danger'>Decline</button>}
                </div>
                
            </div>
            <div className='col-2 px-0'>
                {timeString}
            </div>
        </div>
        </div>
    )
}