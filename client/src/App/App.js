import React, { Component } from 'react';
import logo from '../logo.svg';
import Net from '../Net/Net';
import './App.css';

class App extends Component {
  input; // holds url input
  urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  constructor(props) {
    super(props)
    this.crawlUrl = this.crawlUrl.bind(this);

    this.state = {
      url: null
    }
  }

  crawlUrl() {
    const url = `http://${this.input.value}`;
    if(this.urlPattern.test(url)) {
      this.setState({ url: url });
    } else {
      this.setState({ error: true })
    }

  }

  isURL(str) {
    return 
  }

  render() {
    const { error, url } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">http://</span>
              </div>
              <input type="text" className={`form-control ${error ? "is-invalid" : null}`} ref={(input) => this.input = input} />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={this.crawlUrl}>Crawl</button>
              </div>
            </div>
          </div>
        </header>
        <section>
          <Net url={url}/>
        </section>
      </div>
    );
  }
}

export default App;
