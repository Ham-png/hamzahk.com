import React, { useState } from 'react';

interface Props {
  onSubmit: (token: string, ID: string, version: string, Name: string) => void;
}

function UpdateID(props: Props) {
  const [token, setToken] = useState('');
  const [ID, setID] = useState('');
  const [message, setMessage] = useState('');
  const [Name, setName] = useState('');
  const [Version, setVersion] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/package/${ID}`, {
      method: 'PUT',
      headers: {
        'X-Authorization': `${token}`,
        'id': ID
      },
      body: JSON.stringify({  
        metadata: {
        Name: Name,
        Version: Version,
        ID: ID
      },
      data: {
        Content: "string",
        URL: "string",
        JSProgram: "if (process.argv.length === 7) {\nconsole.log('Success')\nprocess.exit(0)\n} else {\nconsole.log('Failed')\nprocess.exit(1)\n}\n"
      }})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onSubmit(token, ID, Name, Version);
        setID('');
        setMessage('Package Updated successfully!');
      })
      .catch(error => {
        console.error(error);
        setID('');
        setMessage('Failed to update package.');
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
        placeholder="Package Version"
      />
      <button type="submit">Update Package</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UpdateID;