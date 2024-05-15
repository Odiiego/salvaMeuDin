import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Register from './layouts/Register';
import User from './layouts/User';
import List from './components/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/list/:id" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
