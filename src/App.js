
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './extra/list/List';
import New from './extra/new/New';
import SinglePage from './extra/singlepage/SinglePage';
import { productinputs, userinputs } from './formsource';
import UsersList from './pages/userslist/UsersList';
import User from './pages/user/User';
import NewUser from './pages/newuser/NewUser';
import { useAuth } from './context/auth';
import MoviesList from './pages/moviesList/MoviesList';
import Movie from './pages/movie/Movie';
import NewMovie from './pages/newmovie/NewMovie';
import ListList from './pages/listList/ListList';
import NewList from './pages/newlist/NewList';
import Error from './pages/error/Error';
// import './style/dark.scss'

function App() {
  const[auth,setAuth]=useAuth()
  // const usenavigate = useNavigate();
  
  
  return (
    <div className="app">
      
      <BrowserRouter>
      <Routes>
        <Route path="/">
          
          <Route index element={auth?.token ?<Home/> :<Login/>} /> 
        </Route>
        
         <Route path="users">
         <Route index element={auth?.token ?<UsersList/>:<Navigate to="/" />}/>
         <Route path=":userid" element={auth?.token ?<User/>:<Navigate to="/"/>}/> 
         <Route path="new" element={auth?.token ?<NewUser/>:<Navigate to="/"/>}/> 
       </Route>
       
        <Route path="movies">
          <Route index element={auth?.token ?<MoviesList/>:<Navigate to="/" />}/>
          <Route path=":movieid" element={auth?.token ?<Movie/>:<Navigate to="/" />}/> 
          <Route path="new" element={auth?.token ?<NewMovie />:<Navigate to="/" />}/> 
        </Route>

        <Route path="lists">
          <Route index element={auth?.token ?<ListList/>:<Navigate to="/" />}/>
          
          <Route path="new" element={auth?.token ?<NewList/>:<Navigate to="/" />}/> 
        </Route>

        <Route path='*' element={<Error
        />}/>
      </Routes>

      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
