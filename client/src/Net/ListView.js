import React, { Component } from 'react';

const numOfPagination = 8;

class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      perPage: 10,
      items: Object.keys(props.data),
      currentPage: 1,
      showChildrenOf: null
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data, items: Object.keys(newProps.data), currentPage: 1 })
  }

  genIntegers(min, max) {
    const result = []
    for(let i = min; i <= max; i++) {
      result.push(i);
    }

    return result;
  }

  changePage(pageNum, event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({ currentPage: pageNum });
  }

  render() {
    const { items } = this.state
    return <div className="card list-view">
      <div className="card-header">
        <h2>
          List view
          <span className="badge badge-pill badge-secondary">{items.length}</span>
        </h2>
      </div>
      <div className="card-body">
        {this.renderItems()}
      </div>
      <div className="card-footer">
        {this.renderPagination()}
      </div>
    </div>
  }

  renderItems() {
    const { items, data, perPage, currentPage, showChildrenOf } = this.state
    const start = currentPage == 1 ? 1 : (currentPage-1)*perPage;
    const end = (currentPage*perPage) > items.length ? items.length : (currentPage*perPage)
    const currentItems = items.slice(start, end)

    return <ul>
      {currentItems.map(item =>
        <li key={item}>
          {data[item].title}:{item}
          <span className="badge badge-pill badge-secondary">{data[item].urls.length}</span>
          <a className="link" onClick={() => this.setState({ showChildrenOf: showChildrenOf == item ? null : item })}>
            {showChildrenOf == item ? "Hide " : "Show "}children
          </a>
          {showChildrenOf && showChildrenOf == item
            ? this.renderChildren(item)
            : null}
        </li>
      )}
    </ul>;
  }

  renderChildren(item) {
    const { data } = this.state
    return <ul>
      {data[item].urls.map((url, i) =>
        <li key={i}>{url}</li>
      )}
    </ul>;
  }

  renderPagination() {
    const { items, perPage, currentPage } = this.state;
    const total = Math.ceil(items.length/perPage);
    let min = Math.max(1, currentPage - (numOfPagination/2))
    let max = Math.min(total, currentPage + (numOfPagination/2))
    const pages = this.genIntegers(min, max);

    return <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage == 1 ? "disabled" : null}`}><a className="page-link" href="#" onClick={(event) => this.changePage(currentPage-1, event)}>Previous</a></li>
        {pages.map(page =>
          <li className={`page-item ${currentPage == page ? "active" : null}`} key={page}>
            <a className="page-link" href="#" onClick={(e) => this.changePage(page, e)}>{page}</a>
          </li>
        )}
        <li className={`page-item ${currentPage == total ? "disabled" : null}`}><a className="page-link" href="#" onClick={(event) => this.changePage(currentPage+1, event)}>Next</a></li>
      </ul>
    </nav>
  }
}

export default ListView