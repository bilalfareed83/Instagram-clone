import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import CreatePost from "./screens/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePost} />
    </BrowserRouter>
  );
}

export default App;
