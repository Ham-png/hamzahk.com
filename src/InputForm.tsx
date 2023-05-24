import React, { useState } from 'react';

interface Props {
  onSubmit: (name: string, password: string, isAdmin: boolean) => void;
}

function InputForm(props: Props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  function handleUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('https://backend-382721.ue.r.appspot.com/hello')
  .then(response => response.text())
  .then(data => {
    console.log(data); // 'Hello, world!'
  })
  .catch(error => {
    console.error(error);
  });
    // fetch('http://localhost:8080/authenticate', {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     User: {
    //       name: name,
    //       isAdmin: isAdmin
    //     },
    //     Secret: {
    //       password: password
    //     }
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   props.onSubmit(name, password, isAdmin);
    //   setName('');
    //   setPassword('');
    //   setMessage('User Registered!');
    // })
    // .catch(error => console.error(error))
    setPassword('');
    setMessage('Try a different password! \nPassword must be a strong password.');
    setTimeout(() => setMessage(''), 2000); // clear message after 2 seconds
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleIsAdminChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsAdmin(event.target.checked);
  }

  return (
    <form onSubmit={handleUser}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="file-input"
      />
      <div className="admin-wrapper">
        <label className="admin-label">
          Admin:
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleIsAdminChange}
            className="admin-checkbox"
          />
        </label>
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default InputForm;
