import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListThumbnail.module.scss';

const ListThumbnail = ({ data }) => {
  const list = data;
  return (
    <Link
      className={styles.thumbnail__link}
      to={{ pathname: `/list/${list._id}`, data: { list } }}
    >
      <article className={styles.thumbnail}>
        <div className={styles.thumbnail__header}>
          <h2 className={styles.thumbnail__name}>{list.name}</h2>
          {list.theme ? (
            <p className={styles.thumbnail__theme}>{list.theme}</p>
          ) : null}
        </div>
        {list.tags.length > 0 ? (
          <ul className={styles.thumbnail__taglist}>
            {list.tags.map((tag, index) => {
              return (
                <li
                  className={styles.thumbnail__taglist__tag}
                  key={index}
                >{`${tag} \t`}</li>
              );
            })}
          </ul>
        ) : null}
      </article>
    </Link>
  );
};

export default ListThumbnail;
