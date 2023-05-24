import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, offset: string, Name: string, Version: string) => void;
}

function Query(props: Props) {
  const [token, setToken] = useState('');
  const [offset, setoffset] = useState('');
  const [Name, setName] = useState('');
  const [Version, setVersion] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/packages`, {
      method: 'GET',
      headers: {
        'X-Authorization': `${token}`,
        'offset' : offset
      },
      body: JSON.stringify({
        Version: Version,
        Name: Name
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, offset, Name, Version);
        setoffset('');
        setName('');
        setVersion('');
      })
      .catch(error => {
        console.error(error);
        setoffset('');
        setName('');
        setVersion('');
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
        value={offset}
        onChange={(event) => setoffset(event.target.value)}
        placeholder="Offset"
      />
      <input
        type="text"
        value={Name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Package Name"
      />
      <input
        type="text"
        value={Version}
        onChange={(event) => setVersion(event.target.value)}
        placeholder="Version Range"
      />
      <button type="submit">Packages Query</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Query;