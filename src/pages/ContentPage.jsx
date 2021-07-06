import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Container, Row, Col } from 'reactstrap';
import PostArea from "../components/PostArea";
import ScehduleRightBar from "../components/ScehduleRightBar"
import '../stylesheet/navBar.css'
import HomePage from "./HomePage";
import jwtDecode from "jwt-decode";
import { ProfilePage } from "./ProfilePage";

export const ContentPage = () => {
    //check the username here! need to send the username in backend 
    //if have multiple things to check in multiple page, put this into redux
    let jwt = localStorage.getItem('token');
    let decode = jwtDecode(jwt);
    let username = decode.username;
    console.log('jwt',decode);
    return (
        <div>
            <BrowserRouter>
                <Container>
                    <Row>
                        <Col xs="3"><SideBar
                            username={username}
                        /></Col>
                        {/* <Col xs="6" style={{ backgroundColor: 'grey' }}><p>search bar component</p><PostArea style={{ backgroundColor: 'grey' }} /></Col>
                        <Col xs="3"><ScehduleRightBar /></Col> */}
                    
                <Switch className='col-9'>
                    <Route path='/home' component={HomePage} />
                    <Route path='/messages' render={() => <p></p>} />
                    <Route path='/friends' render={() => <p></p>} />
                    <Route path='/:username' component={ProfilePage} />
                </Switch>

                </Row>
                </Container>
            </BrowserRouter>
        </div>
    )

}

