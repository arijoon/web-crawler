import React, { Component } from 'react';


class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      perPage: 10,
      items: Object.keys(props.data),
      currentPage: 1
    }

    const { items } = this.state;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data })
  }

  render() {
    return <div className="card">
      <div className="card-header">
        <h2>List view</h2>
      </div>
      <div className="card-body">
        view here
      </div>
      <div className="card-footer">
        {this.renderPagination()}
      </div>
    </div>
  }

  renderPagination() {
    const { items, perPage, currentPage } = this.state;
    const total = Math.ceil(items.length/perPage);

    return <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage == 1 ? "disabled" : null}`}><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className={`page-item ${currentPage == total ? "disabled" : null}`}><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  }
}

export default ListView