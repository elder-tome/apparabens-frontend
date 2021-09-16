import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './style.css';
import voltar from '../../assets/voltar.svg';
import foto from '../../assets/foto.svg';

function New() {

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [image_url, setImage_url] = useState('');

  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const userId = localStorage.getItem('userId');

    await axios.post(`${process.env.REACT_APP_API_URL}/person`, {
      name,
      day,
      month,
      year,
      image_url,
    }, {
      headers: { id: userId }
    });

    history.goBack();
  }

  return (
    <div className='new-container'>
      <button className='back' onClick={handleBack}>
        <img src={voltar} alt='Voltar' />
      </button>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <button className='button-photo' onClick={() => { }}>
            <img src={foto} alt='foto' />
          </button>
          <input
            type="text"
            placeholder='foto URL'
            value={image_url}
            onChange={event => setImage_url(event.target.value)}
          />
          <input
            type="text"
            placeholder='Nome'
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <div className='container-date'>
            <input
              className='button-date1'
              type="text"
              placeholder='Dia'
              value={day}
              onChange={event => setDay(event.target.value)}
            />
            <input
              className='button-date2'
              type="text"
              placeholder='Mês'
              value={month}
              onChange={event => setMonth(event.target.value)}
            />
            <input
              className='button-date3'
              type="text"
              placeholder='Ano'
              value={year}
              onChange={event => setYear(event.target.value)}
            />
          </div>
          <button className='button' type='submit'>Salvar</button>
        </form>
      </section>
    </div>
  );
}

export default New;