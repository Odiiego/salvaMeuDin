import React from 'react';
import { IList } from '../types';
import { Link } from 'react-router-dom';

function ListGroup() {
  const [lists, setLists] = React.useState<IList[] | []>([]);
  React.useEffect(() => {
    async function getUserLists() {
      const response = await fetch('http://localhost:8080/lists/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (data) setLists(data);
    }

    getUserLists();
  }, []);

  return (
    <section>
      <h1>Minhas Listas</h1>
      <p>linkar para listas</p>
      <ul>
        {lists.map((list) => {
          return (
            <Link key={list._id} to={`/list/${list._id}`}>
              <li>{list.name}</li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default ListGroup;
