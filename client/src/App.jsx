import React from 'react';

function App() {
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/');
      const data = await result.json();
      setLists(data);
    };

    fetchData();
  }, [lists]);

  async function addList(e) {
    e.preventDefault();

    const newList = {
      name: 'aff',
    };

    await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });
  }

  return (
    <>
      <button onClick={addList}>Add List</button>
      <ul>
        {lists.map((list) => {
          return <li key={list._id}>{list.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
