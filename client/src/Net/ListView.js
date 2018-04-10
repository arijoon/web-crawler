import React, { Component } from 'react';


class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data })

  }


  render() {
    return <div>
    </div>
  }
}

export default ListView