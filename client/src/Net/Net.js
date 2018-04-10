import 'vis/dist/vis.css';
import './Net.css';
import * as vis from 'vis';
import React, { Component } from 'react';

const data = require("../Data/monzo.json");

class Net extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount() {
    console.log("running");
    const maxDisplay = 2000;
    const width = 1500,
    height = 1500;

    const nodeIds = {};
    let count = 1;
    for(let key in data) {
      nodeIds[key] = count++;
    }

    const nodes = [];
    for(let key in data) {
      if(nodeIds[key] > maxDisplay) continue;
      nodes.push({ id: nodeIds[key], label: data[key].title, title: key, x: Math.random()*width, y: Math.random()*height})
    }

    const edges = [];
    for(let key in data) {
      if(nodeIds[key] > maxDisplay) continue;
      for(let url of data[key].urls) {
        if(nodeIds[url] > maxDisplay) continue;
        if(url === key) continue;
        edges.push({ from: nodeIds[key], to: nodeIds[url]});
      }
    }

    console.log(edges, nodes)

    const nodesSet = new vis.DataSet(nodes);
    const edgesSet = new vis.DataSet(edges);

    const netData = {
      nodes: nodesSet,
      edges: edgesSet
    };

    
    const options = {
      layout: { improvedLayout: false },
      nodes: {
        shape: 'dot',
        size: 5,
        scaling: {
          min: 1,
          max: 10,
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
      physics: false,
      interaction: {
        tooltipDelay: 200,
        hideEdgesOnDrag: true
      }
    };


    // Create the network
    const network = new vis.Network(this.refs.network, netData, options);

    console.log("finished", this.refs.network);
  }
  render() {
    return <div>
      <div id="network" ref="network">
      
      </div>
    </div>
  }
}

export default Net