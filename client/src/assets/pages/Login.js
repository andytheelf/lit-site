import React, { useState } from 'react';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  

  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
      
     
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });
    
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
<section className="section level">
<div className="container level-item">
  
<form onSubmit={handleFormSubmit}>
<div className="field">
  <p className="control has-icons-left has-icons-right">
    <input className="input"
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange} />
  <span className="icon is-small is-left">
    <i className="fas fa-envelope"></i>
  </span>
  <span className="icon is-small is-right">
    <i className="fas fa-check"></i>
  </span>
  </p>
</div>
<div className="field">
<p className="control has-icons-left">
  <input className="input" placeholder='******'
              name='password'
              type='password'
              id='password'
              value={formState.password}
              onChange={handleChange} />
  <span className="icon is-small is-left">
    <i className="fas fa-lock"></i>
  </span>
</p>
</div>

<button className='button is-centered' type='submit'>
            Submit
</button>

 </form>
</div>
</section>
 );
};

export default Login;
