import React, { Component } from 'react';
import logo from '../logo.svg';
import Net from '../Net/Net';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">http://</span>
              </div>
              <input type="text" className="form-control" />
              <div className="input-group-append">
                <button className="btn btn-primary">Crawl</button>
              </div>
            </div>
          </div>
        </header>
        <section>
          <Net />
        </section>
      </div>
    );
  }
}

export default App;
