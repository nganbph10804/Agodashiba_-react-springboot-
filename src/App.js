import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import {React,useState} from 'react'
import './App.css';
import Footer from "./ComponentsAdmin/Footer";
import HeaderAdmin from "./ComponentsAdmin/HeaderAdmin";
import UserManage from "./ComponentsAdmin/Users";
import ForgotPwd from "./ComponentsDefault/ForgotPwd";
import HeaderMain from "./ComponentsDefault/Headermain";
import Homepage from "./ComponentsDefault/Home";
import SignInSide from "./ComponentsDefault/SignIn";
import SignUp from "./ComponentsDefault/SignUp";
import Profile from "./ComponentsDefault/Profile";
import HotelManage from "./ComponentsAdmin/Hotels";
import RoomHotel from "./ComponentsAdmin/Room/RoomHotel";



function App() {
// intialState
const [user, setUser] = useState({});

const userData ={
  user,
  setUser
}


  return (

    <Router>
      <div className="App">
         {user.isAdmin? <HeaderAdmin {...userData}/>:  <HeaderMain {...userData}/>}
        <div className="main">


        <Switch>
          <Route exact path="/">
              <Homepage/>
          </Route>
          <Route path="/userManagement">
            {user.isAdmin ?   <UserManage/> : <Homepage/>}
          </Route>
          <Route path="/hotelManagement">
            {user.isAdmin ?   <HotelManage/> : <Homepage/>}
          </Route>
          <Route path="/roomManagement/:filterType">
               <RoomHotel/>
          </Route>
          <Route path="/signup">
              <SignUp {...userData}/>
          </Route>
          <Route path="/signin">
              <SignInSide {...userData}/>
          </Route>
          <Route path="/recovery">
              <ForgotPwd/>
          </Route>
          <Route path="/profile/:phone">
             {user.email ? <Profile{...userData}/>:<Homepage/>}
          </Route>
        


        </Switch>
        </div>
        <div className="footer">
        <Footer/>
        </div>
      </div>
    </Router>

  );
}

export default App;
