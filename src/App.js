import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Footer from "./ComponentsAdmin/Footer";
import HeaderAdmin from "./ComponentsAdmin/HeaderAdmin";
import UserManage from "./ComponentsAdmin/Users";
import HeaderMain from "./ComponentsDefault/Headermain";
import Homepage from "./ComponentsDefault/Home";



function App() {
  return (

    <Router>
      <div className="App">
        <HeaderMain/>
        <div className="main">


        <Switch>
          <Route exact path="/">
              <Homepage/>
          </Route>
          <Route path="/userManagement">
              <UserManage/>
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
