import React, { useState } from 'react';

interface Props {
  onSubmit: (input: string) => void;
}

function Reset(props: Props) {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('http://localhost:8080/reset', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token // include the X-Authorization token in the headers
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      props.onSubmit(token);
      setToken('');
      setMessage('Registry reset successful!');
    })
    .catch(error => {
      console.error(error);
      setToken('');
      setMessage('Error resetting registry.');
      setTimeout(() => setMessage(''), 2000); // clear message after 2 seconds
    });
  }

  function handleTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  }

  return (
    <form onSubmit={handleReset}>
      <input
        type="text"
        value={token}
        onChange={handleTokenChange}
        placeholder="X-Authorization Token"
      />
      <button type="submit">Reset</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Reset;