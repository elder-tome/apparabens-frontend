import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import './style.css';
import voltar from '../../assets/voltar.svg';
import mais from '../../assets/mais.svg';
import apagar from '../../assets/apagar.svg';
import photoDefault from '../../assets/photoDefault.png';

function Home() {
  const [person, setPerson] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {

    async function loadList() {

      const userId = localStorage.getItem('userId');

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/person`, {
        headers: { id: userId }
      });

      setPerson(response.data);

    }
    loadList();
  }, []);

  function handleBack() {
    // alert('Fazer Logout ?');
    const logout = window.confirm("Fazer Logout ?");

    if (logout) {
      history.push('/');
    }

  }

  function handleNew() {
    history.push(`/new/${id}`);
  }

  async function handleDelete(PersonId) {

    const confirmDelete = window.confirm('Deletar ?');

    const userId = localStorage.getItem('userId');

    if (confirmDelete) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/person/${PersonId}`, {
        headers: { id_user: userId }
      });

      setPerson(person.filter(person => person.id !== PersonId));
    }

  }

  return (
    <div className='home-container'>
      <div className='header'>
        <button className='back' onClick={handleBack}>
          <img src={voltar} alt='Voltar' />
        </button>
      </div>
      <button className='button' onClick={handleNew}>
        <img src={mais} alt='Novo' />
      </button>
      <div className='list-card'>
        {person.map(person => (
          <div className='card' key={person.id}>
            {person.image_url ? (
              <img className='photo' src={person.image_url} alt='foto' />
            ) : (<img className='photo' src={photoDefault} alt='foto' />)}

            <strong>{person.name}</strong>
            <p>{`${person.date.day}/${person.date.month}/${person.date.year}`}</p>
            <div className='bottom-container'>
              <button onClick={() => handleDelete(person.id)}>
                <img className='delete' src={apagar} alt='Apagar' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;