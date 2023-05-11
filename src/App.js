import './App.css';
import Footer from './Components/Footer/Footer';
import Landingpage from './Components/Landingpage/Landingpage';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './interceptor';
import HomepagePlayer from './Components/Homepage/HomepagePlayer';
import Logout from './Components/Logout';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/homepage/player" element={<HomepagePlayer/>}/>
        <Route path="/logout" element={<Logout/>}/>

      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
