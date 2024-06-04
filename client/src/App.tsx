import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Register from './layouts/Register';
import User from './layouts/User';
import List from './components/List';
import ListContextProvider from './context/ListContext';

function App() {
  return (
    <div
      className="
        bg-vertical bg-bottom bg-cover bg-no-repeat h-screen min-h-screen overflow-auto
        md:bg-horizontal
      "
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/list/:id"
            element={
              <ListContextProvider>
                <List />
              </ListContextProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
