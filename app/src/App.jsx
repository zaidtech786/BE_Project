
import './App.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import {Routes,Route} from "react-router-dom"
import Product from './Components/Product/Product/Product';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails';
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import AuthModal from './Components/Auth/AuthModal';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/>}></Route>
      <Route path="/product/:categoryId/:sectionId/:itemId" element={<Product/>}></Route>
      <Route path="/productdetails" element={<ProductDetails/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/authmodel" element={<AuthModal/>}></Route>
    </Routes>
  
    </>
  )
}

export default App
