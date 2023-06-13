import './App.css';
import {Routes,Route} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar></SetAvatar>}/>
        <Route path='/' element={<Chat/>}/>
        <Route path='*' element={<div>404Page not found</div>}/>
      </Routes>
    </div>
  );
}

export default App;
