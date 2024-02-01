import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import List from './components/List';

function App() {
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/');
      const data = await result.json();
      setLists(data);
    };

    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home data={lists} />} />
        <Route path={'/list/:id'} element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
