import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import EditFriendGroup from "./EditFriendGroup";
import {
    Card, CardImg, CardText, CardBody
} from 'reactstrap';
import userAvatar from '../../img/profileIcon.png';

export const FriendCard = (props) => {
    const { username, toggle } = props
    const [userInfo, setUserInfo] = useState(null);
    const { friendsList, activeTab } = props
    useEffect(() => {
        async function getUserInfo() {
            let jwt = localStorage.getItem('token');
            let getUserReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/user/profile/' + username,
                headers: { Authorization: `Bearer ${jwt}` },
            })
            //console.log('getUserReq', getUserReq);
            setUserInfo(getUserReq.data);
        }
        getUserInfo();
    }, [username])
    return (
        <div className='col-6'>

            <Card className="friendsAreaComponent">

                <CardBody className="friendCardBody row mx-0">
                    <div className='col-3 px-0' style={{ padding: '10px', width: '60px', height: '60px', borderRadius: '50%', backgroundPositionY: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${userInfo ? process.env.REACT_APP_API_SERVER + userInfo.imgPath : userAvatar})`, backgroundSize: 'contain' }}>

                    </div>
                    <div className='col-6 px-0' >
                        <a style={{ fontSize: "25px", color: "black", textDecoration: "none" }} href={"/" + username}>{username}</a>
                    </div>
                    {activeTab == "All Friends" &&
                        <EditFriendGroup username={username} activeTab={activeTab} friendsList={friendsList} />}
                    <button className="deleteFriendBtn" onClick={toggle} name={username}></button>


                </CardBody>
            </Card>

        </div>
    )
}