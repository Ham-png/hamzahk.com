import React, { useState } from 'react';

interface Props {
  onSubmit: (regex: string, token: string) => void;
}

function RegexSearch(props: Props) {
  const [regex, setRegex] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  function handleRegexSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('http://localhost:8080/package/byRegEx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify({
        RegEx: regex,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      props.onSubmit(regex, token);
      setRegex('');
      setMessage('Regex Received!');
    })
    .catch(error => {
      console.error(error);
      setRegex('');
      setMessage('No package found under this regex.');
      setTimeout(() => setMessage(''), 2000); // clear message after 2 seconds
    });
  }

  function handleRegexChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRegex(event.target.value);
  }

  function handleTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  }

  return (
    <form onSubmit={handleRegexSearch}>
      <input
        type="text"
        value={token}
        onChange={handleTokenChange}
        placeholder="Authorization Token"
      />
      <input
        type="text"
        value={regex}
        onChange={handleRegexChange}
        placeholder="Regular Expression"
      />
      <button type="submit">Search Packages</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default RegexSearch;