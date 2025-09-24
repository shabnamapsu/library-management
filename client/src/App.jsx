
import './App.css'
import BookIssue from './BookIssue'
import Addbook from './Addbook'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login"
import ReturnBook from './ReturnBook';
import Signup from './Signup';
import Stu_info from './Stu_info';
import Homep from './Homep';
// import Auth from './Auth';
// import Allinfo from './Allinfo';Homep

function App() {

  return (
    <> <BrowserRouter>
      <Routes>
         <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/mainpage" element={<Homep/>}/>
        <Route path="/studentinfo" element={<Stu_info/>}/>
        <Route path="/bookdetail" element={< Addbook/>} />
         <Route path="/bookissue" element={< BookIssue/>} />
        <Route path="/returnbook"  element={<ReturnBook/>}/>
        {/* <Route path="/" element={<Auth/>}/> */}
        {/* <Route path='/allinformation' element={<Allinfo/>}/> */}
      </Routes>
    </BrowserRouter> 
     
    </>
  )
}

export default App