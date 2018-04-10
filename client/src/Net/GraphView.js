import 'vis/dist/vis.css';
import './Net.css';
import * as vis from 'vis';
import React, { Component } from 'react';

class GraphView extends Component {
  depthInput = 3;
  input;

  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    };

    this.handleDepthApply = this.handleDepthApply.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
    this.drawNetwork(newProps.data);
  }

  componentDidMount() {
    this.drawNetwork(this.state.data);
  }

  drawNetwork(data) {
    const depth = this.depthInput;
    const nodes = [], edges = [];
    const addedNodes = {};

    let count = 1;
    for(let key in data) {
      if(count++ > depth) break;

      if(!addedNodes[key]) {
        nodes.push({id: key, label: data[key].title, title: key, group: count});
          addedNodes[key] = true;
      }

      for(let url of data[key].urls) {

        if(!addedNodes[url]) {
          nodes.push({id: url, label: data[url].title, title: url, group: count+1});
          addedNodes[url] = true;
        }

        edges.push({ from: key, to: url});
      }
    }

    const nodesSet = new vis.DataSet(nodes);
    const edgesSet = new vis.DataSet(edges);

    const netData = {
      nodes: nodesSet,
      edges: edgesSet
    };

    const options = {
      layout: { 
        improvedLayout: depth < 5
      },
      nodes: {
        shape: 'dot',
        size: 20,
        shadow: {
          enabled: true
        },
        scaling: {
          min: 1,
          max: 30,
          label: {
            min: 8,
            max: 30,
            drawThreshold: 12,
            maxVisible: 20
          }
        },
        font: {
          size: 10,
          face: 'Tahoma'
        }
      },
      edges: {
        width: 0.15,
        color: { inherit: 'from' },
        smooth: {
          type: 'continuous'
        }
      },
      physics: {
        enabled: true,
        stabilization: false,
        forceAtlas2Based: {
          gravitationalConstant: -138,
          centralGravity: 0.02,
          springLength: 100
        },
        minVelocity: 0.75,
        solver: "forceAtlas2Based",
      },
      interaction: {
        tooltipDelay: 200,
        hideEdgesOnDrag: true
      }
    };


    // Create the network
    const network = new vis.Network(this.refs.network, netData, options);
    network.redraw();
    network.fit();
  }

  handleDepthApply() {
    this.depthInput = +this.input.value;

    if(this.depthInput)
      this.drawNetwork(this.state.data);
  }

  render() {
    return <div>
      <div className="form-group">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Depth</span>
          </div>
          <input className="form-control" defaultValue={this.depthInput}
           ref={(input) => this.input = input}/>
          <div className="input-group-append">
            <button className="btn btn-outline-primary" onClick={this.handleDepthApply}>Apply</button>
          </div>
        </div>
      </div>
      <div id="network" ref="network"></div>
    </div>
  }
}

export default GraphView