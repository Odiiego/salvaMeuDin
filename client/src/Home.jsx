import React from 'react';
import ListThumbnail from './components/ListThumbnail';
import styles from './Home.module.scss';
import { CiCirclePlus } from 'react-icons/ci';

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
    window.location.reload();
  }

  return (
    <main className={styles.home}>
      <form className={styles.form} onSubmit={addList}>
        <input
          className={styles.form__name}
          type="text"
          placeholder="List Name"
          required
          name="name"
        />
        <input
          className={styles.form__theme}
          type="text"
          placeholder="List theme"
          name="theme"
        />
        <input
          className={styles.form__tags}
          type="text"
          placeholder="List tags"
          name="tags"
        />
        <button type="submit">
          <CiCirclePlus className={styles.icon} />
        </button>
      </form>
      <div className={styles.home__container}>
        {lists.map((list) => {
          return <ListThumbnail key={list._id} data={list} />;
        })}
      </div>
    </main>
  );
};

export default Home;
