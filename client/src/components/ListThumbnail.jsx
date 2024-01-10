import React from 'react';
import { Link } from 'react-router-dom';

const ListThumbnail = ({ data }) => {
  const list = data;
  return (
    <Link to={{ pathname: `/list/${list._id}`, data: { list } }}>
      <article>
        <h2>{list.name}</h2>
        <p>{list.theme}</p>
        <ul>
          {list.tags.map((tag, index) => {
            return <li key={index}>{`${tag} \t`}</li>;
          })}
        </ul>
      </article>
    </Link>
  );
};

export default ListThumbnail;
