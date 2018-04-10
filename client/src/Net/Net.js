import ListView from './ListView';
import GraphView from './GraphView';
import React, { Component } from 'react';

// Props:
// - url
class Net extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      isLoading: false
    }
  }

  componentWillReceiveProps(props) {
    if(props.url && props.url !== this.state.url) {
      this.crawl(props.url);
    }
  }

  crawl(url) {
    // make a new web call
    this.setState({ isLoading: true });
    fetch(`/crawl?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => { 
        this.setState({ url: url, data: data, isLoading: false });
      })
      .catch(err => { 
        console.error(err) 
        this.setState({ isLoading: false });
      });

  }

  render() {
    const { isLoading, data, url } = this.state;
    return <div>
      {isLoading
        ? "Loading ..."
        : data && url
          ? this.renderViews()
          : null
      }
    </div>
  }

  renderViews() {
    return <div className="row net">
      <div className="col-md-6">
        <ListView data={this.state.data} />
      </div>

      <div className="col-md-6">
        <GraphView data={this.state.data} />
      </div>
    </div>;
  }
}

export default Net