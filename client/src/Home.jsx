import React from 'react';
import ListThumbnail from './components/ListThumbnail';

const Home = ({ data }) => {
  const lists = data;
  async function addList(e) {
    e.preventDefault();

    const form = e.target;

    const newList = {
      name: form.name.value,
      theme: form.theme.value,
      tags:
        form.tags.value.trim().split(/[, ]+/)[0] === ''
          ? []
          : form.tags.value.trim().split(/[, ]+/),
    };

    await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });

    form.name.value = '';
    form.theme.value = '';
    form.tags.value = '';
  }

  return (
    <>
      <form onSubmit={addList}>
        <input type="text" placeholder="List Name" required name="name" />
        <input type="text" placeholder="List theme" name="theme" />
        <input type="text" placeholder="List tags" name="tags" />
        <input type="submit" required value="Add List" />
      </form>
      {lists.map((list) => {
        return <ListThumbnail key={list._id} data={list} />;
      })}
    </>
  );
};

export default Home;
