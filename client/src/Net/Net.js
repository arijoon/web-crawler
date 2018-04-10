import ListView from './ListView';
import GraphView from './GraphView';
import React, { Component } from 'react';

const data = require("../Data/monzo.json");

// Props:
// - url
class Net extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
  }

  componentWillReceiveProps(props) {
    // make a new web call
  }

  render() {
    return <div className="row net">
      <div className="col-md-6">
        <ListView data={this.state.data} />
      </div>

      <div className="col-md-6">
        <GraphView data={this.state.data} />
      </div>
    </div>
  }
}

export default Net