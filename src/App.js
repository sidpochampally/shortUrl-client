import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import './App.css';
import './assets/style.css';

function App() {
  const [link, setLink] = useState('');
  const [URL, setURL] = useState('');

  const handleChange = (e) => {
    setURL(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validURL = validator.isURL(URL, {
      require_protocol: true
    });
    if(!validURL) {
      alert('Please enter a valid URL');
    } else {
      console.log('URL is ', URL);
      axios.post('http://localhost:8000/api/shorten', {
        url: URL
      })
      .then(res => {
        console.log(res.data.hash);
        setLink(`http://localhost:8000/${res.data.hash}`)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div className="App">
      <header>
        <h1>URL Shortener</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset>
            <input type="text" name="url" placeholder="Enter URL" onChange={handleChange} />
            <input type="submit" value="Shorten" />
          </fieldset>
          <fieldset>
            <span id="result">{link}</span>
          </fieldset>
      </form>
    </div>
  );
}

export default App;
