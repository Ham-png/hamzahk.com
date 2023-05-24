import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, ID: string) => void;
}

function DeleteID(props: Props) {
  const [token, setToken] = useState('');
  const [ID, setID] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/package/${ID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, ID);
        setID('');
        setMessage('Package deleted successfully!');
      })
      .catch(error => {
        console.error(error);
        setID('');
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
        value={ID}
        onChange={(event) => setID(event.target.value)}
        placeholder="Package ID"
      />
      <button type="submit">Delete Package</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default DeleteID;