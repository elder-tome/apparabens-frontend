import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './style.css';
import img from '../../assets/img.svg';

function Login() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
      email
    });

    localStorage.setItem('userId', response.data.id);

    history.push('/home');
  }

  return (
    <div className='login-container'>
      <section className='form-container'>
        <img src={img} alt='Parabéns' />
        <form onSubmit={handleSubmit}>
          <h1>PARABÉNS</h1>
          <input
            type="text"
            placeholder='Entre com E-mail'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button className='button' type='submit'>Entrar</button>
        </form>
      </section>
    </div>
  );
}

export default Login;