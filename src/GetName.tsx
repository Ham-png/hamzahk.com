import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, ID: string) => void;
}

function GetName(props: Props) {
  const [token, setToken] = useState('');
  const [Name, setName] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/package/byName/${Name}`, {
      method: 'GET',
      headers: {
        'X-Authorization': `${token}`,
        'Name': Name
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, Name);
        setName('');
        setMessage('Package Retrieved!');
      })
      .catch(error => {
        console.error(error);
        setName('');
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
        value={Name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Package Name"
      />
      <button type="submit">Get Package</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default GetName;