import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, Name: string) => void;
}

function DeleteName(props: Props) {
  const [token, setToken] = useState('');
  const [Name, setName] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/package/byName/${Name}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`,
        'name': Name
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, Name);
        setName('');
        setMessage('Package deleted successfully!');
      })
      .catch(error => {
        console.error(error);
        setName('');
        setMessage('Failed to delete package.');
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
      <button type="submit">Delete Package</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default DeleteName;