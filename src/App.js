import React, { Component } from "react";

import "./CSS/style.css";
import "./CSS/common.css";
import "./font/font.css";


import Header from "./Components/Header";
import Article from "./Components/Article";
import Footer from "./Components/Footer";

class App extends Component {
  render(){
    return (
      <>
        <Header />
        <Article />
        <Footer />
      </>
    );
  }
}

export default App;