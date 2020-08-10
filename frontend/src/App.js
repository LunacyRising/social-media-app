import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme , } from "@material-ui/core";
import { useSelector} from "react-redux";
import "./App.css";
import Navbar from "./components/navBar/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import EditProfile from "./components/editProfile/EditProfile";
import UsersInformation from "./components/UsersInformation";
import EmailConmirmation from "./components/EmailConfirmation";
import SpecificUserInfoPage from "./components/SpecificUserInfoPage";
import SinglePostPage from "./components/posts/SinglePostPage";
import Favorites from "./components/favorites/Favorites";
import Galleries from "./components/galleries/Galleries";
import Gallery from "./components/gallery/Gallery";
import LogingOut from "./components/auth/LogingOut";
import Test from "./components/Test";
import ServerDown from "./components/ServerDown";
import ErrorPage from "./components/ErrorPage";

function App() {

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const theme = createMuiTheme({ 
    typography: {
      "fontFamily": "\"Saira\",\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", 
     },
    palette: {
      primary: {
        main: "#8b70d2",
        light: "#8bcbad",
        dark: "#89a5ad"
      },
      secondary: {
        main: "#8b70d2",
        light: "#8b9ad2",
        dark: "#c46d99"
      },
      type: darkMode ? "dark" : "light" 
    }
  });

  console.log(theme)

  useEffect(() => { document.body.style.backgroundColor = darkMode ? "#272727" : "#f5f5f5" 
    
  },
  [darkMode]
   );


  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route
              path="/emailConfirmation"
              exact
              component={EmailConmirmation}
            />
            <Route path="/editProfile" exact component={EditProfile}/>
            <Route path="/admin" exact component={Admin} />
            <Route path="/admin/users" exact component={UsersInformation}/>
            <Route path="/users/user/:userId" exact component={SpecificUserInfoPage}/>
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/posts/:postId" exact component={SinglePostPage}/>
            <Route path="/galleries" exact component={Galleries}/>
            <Route path="/gallery/:userId" exact component={Gallery}/>
            <Route path="/gallery/:userId/:pageNumber" exact component={Gallery}/>
            <Route path="/logingOut" exact component={LogingOut}/>
            <Route path="/test" exact component={Test}/>
            <Route path="/error" exact component={ServerDown}/>
            <Route component={ErrorPage}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
