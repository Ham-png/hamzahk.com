import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, ID: string) => void;
}

function GetID(props: Props) {
  const [token, setToken] = useState('');
  const [ID, setID] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/package/${ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'id': ID
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, ID);
        setID('');
        setMessage('Package Retrieved!');
      })
      .catch(error => {
        console.error(error);
        setID('');
        setMessage('Failed to retrieve package.');
        setTimeout(() => setMessage(''), 2000); // clear message after 2 seconds
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        placeholder="Authorization Token"
      />
      <input
        type="text"
        value={ID}
        onChange={(event) => setID(event.target.value)}
        placeholder="Package ID"
      />
      <button type="submit">Get Package</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default GetID;