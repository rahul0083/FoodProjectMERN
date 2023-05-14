import './App.css';
import Footer from './Components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { CartProvider } from './Components/ContextReducer';
import Cart from './Screens/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrder from './Screens/MyOrder';

function App() {
  return (
    <CartProvider> 
        <ToastContainer position="top-left"></ToastContainer>
    <Router>
      <div>
        <Routes> 
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/createuser' element={<SignUp />} />
      <Route exact path='/myorder' element={<MyOrder />} />
    

 
      </Routes>
      </div> 
      
        </Router>
        </CartProvider>
  );
}

export default App;
