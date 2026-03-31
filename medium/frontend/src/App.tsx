import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UploadBlog from './pages/Update';
import Signup from './components/Signup';
import Home from './pages/Home';
import Signin from './components/Signin';
import CreateBlog from './pages/CreateBlog';
import SingleBlogPage from './components/SingleBlogPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/blogs' element={<CreateBlog />} />
          <Route path='/blog/:id' element={<SingleBlogPage />} />
          <Route path='/blog/:id/edit' element={<UploadBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
