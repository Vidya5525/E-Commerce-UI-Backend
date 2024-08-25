import './App.css';
import Header from "./component/layout/Header.js"
import Footer from "./component/layout/Footer.js"
import {BrowserRouter as Router} from "react-router-dom"


function App() {
  return (
    <Router>
       <Header/>
       <Footer/>

    </Router>

   
    
  );
}

export default App;
