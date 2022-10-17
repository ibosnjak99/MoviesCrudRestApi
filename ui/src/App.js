import './App.css';
import { Movies } from './Movies';
import { Administration } from './Administration';
import { Genres } from './Genres';
import Login from './Login/Login';
import Register from './Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/administration' element={<Administration />}/>
          <Route path='/movies' element={<Movies />}/>
          <Route path='/genres' element={<Genres />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
