
import './App.css'
import BookIssue from './BookIssue'
import Addbook from './Addbook'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login"
import ReturnBook from './ReturnBook';
import Signup from './Signup';
import Stu_info from './Stu_info';
import Homep from './Homep';

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
      </Routes>
    </BrowserRouter> 
     
    </>
  )
}

export default App