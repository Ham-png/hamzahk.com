import React, { useState } from 'react';
import InputForm from './InputForm';
import PackageUploadForm from './PackageUploadForm';
import RegexSearch from './RegexSearch';
import Reset from './Reset';
import Query from './Query';
import UpdateID from './UpdateID';
import DeleteID from './DeleteID';
import GetName from './GetName';
import RateID from './RateID';
import DeleteName from './DeleteName';
import GetID from './GetID';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPackageMenu, setShowPackageMenu] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  function handlePackageMenu() {
    setShowPackageMenu(!showPackageMenu);
  }

  function handleSearchMenu() {
    setShowSearchMenu(!showSearchMenu);
  }

  function handleUser(name: string, password: string, isAdmin: boolean) {
    console.log('Submitted name:', name);
    console.log('Submitted password:', password);
    console.log('Is admin:', isAdmin);
    setShowLoginModal(false);
  }

  function handlePackageSubmit(formData: FormData, token: string) {
    console.log('Submitted package:', formData);
  }

  function handleRegex(regex: string) {
    setSelectedPackageId(regex);
  }

  function handleResetRegistry() {
    setShowResetModal(true);
  }

  function handleUpdatePackage(token: string, ID: string, Name: string, Version: string) {
    setSelectedPackageId(ID);
    console.log('Updating package with ID:', selectedPackageId, 'and Name of:', Name);
  }

  function handleInteractPackage(token: string, ID: string) {
    setSelectedPackageId(ID);
    console.log('Interacting with package with ID:', ID, 'using auth token:', token);
  }

  function handleDeleteID(token: string, ID: string) {
    setSelectedPackageId(ID);
    console.log('Deleting package with ID:', ID, 'using auth token:', token);
  }

  function handleRateID(token: string, ID: string) {
    setSelectedPackageId(ID);
    console.log('Rating package with ID:', ID, 'using auth token:', token);
  }

  function handleDeleteName(token: string, Name: string) {
    console.log('Deleting package with Name:', Name, 'using auth token:', token);
  }

  return (
    <div className="app-container">
    <header role="banner">
    <button onClick={() => setShowLoginModal(true)}>Login/Signup</button>
    </header>
    
          {/* Login/Signup Modal */}
    {showLoginModal && (
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
        <div className="modal-content">
          <button className="close" onClick={() => setShowLoginModal(false)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 id="login-modal-title">Login/Signup</h2>
          <InputForm onSubmit={handleUser} />
        </div>
      </div>
    )}

    {/* Package Upload Form */}
    <section role="main">
      <h2>Upload A Zipped Package Below.</h2>
      <PackageUploadForm onSubmit={handlePackageSubmit} />

      {/* Package Operations */}
      <div className="button-group">
        <button onClick={handlePackageMenu} aria-expanded={showPackageMenu}>
          <span role="heading" aria-level={2}>Package Operations</span>
        </button>
        {showPackageMenu && (
          <div className="package-menu" aria-expanded={showPackageMenu}>
            <ul>
              <li><UpdateID onSubmit={handleUpdatePackage}/></li>
              <li><RateID onSubmit={handleRateID} /></li>
              <li><DeleteID onSubmit={handleDeleteID} /></li>
              <li><DeleteName onSubmit={handleDeleteName} /></li>
            </ul>
            <button className="close" onClick={() => setShowPackageMenu(false)} aria-label="Close Menu">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Packages */}
      <div className="button-group">
        <button onClick={handleSearchMenu} aria-expanded={showSearchMenu}>
          <span role="heading" aria-level={2}>Search Packages</span>
        </button>
        {showSearchMenu && (
          <div className="search-menu" aria-expanded={showSearchMenu}>
            <ul>
              <li><Query onSubmit={handleInteractPackage} /></li>
              <li><GetID onSubmit={handleInteractPackage} /></li>
              <li><GetName onSubmit={handleInteractPackage} /></li>
              <li><RegexSearch onSubmit={handleRegex} /></li>
            </ul>
            <button className="close" onClick={() => setShowSearchMenu(false)} aria-label="Close Menu">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>

      {/* Reset Registry */}
      <button onClick={handleResetRegistry}>Reset Registry</button>

      {/* Reset Registry Modal */}
      {showResetModal && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-modal-title">
          <div className="modal-content">
            <button className="close" onClick={() => setShowResetModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h2 id="reset-modal-title">Reset Registry</h2>
            <Reset onSubmit={() => setShowResetModal(false)} />
          </div>
        </div>
        )}
      </section>
    </div>
  );
}

export default App;