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
import ListHotels from "./ComponentsDefault/SearchHotels";
import HotelDetails from "./ComponentsDefault/HotelDetails";
import BillManage from "./ComponentsAdmin/Bill";



function App() {
// initialState
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
            {user.isAdmin ?   <UserManage/> : <SignInSide/>}
          </Route>
          <Route path="/hotelManagement">
            {user.isAdmin ?   <HotelManage/> : <SignInSide/>}
          </Route>
          <Route path="/roomManagement/:filterType">
              {user.isAdmin? <RoomHotel/>:<SignInSide/>} 
          </Route>
          <Route path="/billManagement">
              {user.isAdmin? <BillManage/>:<SignInSide/>} 
          </Route>
          <Route path="/search">
               <ListHotels/>
          </Route>
          <Route path="/hotel/:id">
               <HotelDetails {...userData}/>
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
             {user.email ? <Profile{...userData}/>:<SignInSide/>}
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
