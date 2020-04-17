import React from "react";
import { Pagination } from "react-bootstrap";

export class CustomPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPostings: [],
      SearchString: "",
      pageLimit: this.props.pageLimit,
      pageNumbers: [],
    };
  }

  componentDidUpdate(prevProps) {
    this.handlePropsUpdateForPagination(prevProps);
  }

  handlePropsUpdateForPagination = (prevProps) => {
    let data = this.props.data;
    // reset page if pageNumbers array has changed
    if (data !== prevProps.data) {
      let pageNumbers = this.initializePagination(
        this.props.data.page,
        this.props.data.pages,
        this.state.pageLimit,
        this.props.dataFetchFunction,
        this.props.dataFetchFunctionArgs
      );
      this.setState({
        pageNumbers: pageNumbers,
      });
    }
  };

  initializePagination = (
    activePage,
    totalPages,
    pageLimit,
    fetchFunction,
    params
  ) => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    let pageNumbers = [];
    pageNumbers.push(
      <Pagination.Prev
        disabled={activePage <= 1}
        onClick={() => {
          fetchFunction(activePage - 1, pageLimit, ...params);
        }}
      />
    );
    for (let number = 1; number <= totalPages; number++) {
      pageNumbers.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => {
            fetchFunction(number, pageLimit, ...params);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    pageNumbers.push(
      <Pagination.Next
        disabled={activePage >= totalPages}
        onClick={() => {
          fetchFunction(activePage + 1, pageLimit, ...params);
        }}
      />
    );
    return pageNumbers;
  };

  handlePageLimitChange = (e) => {
    const pageLimit = +e.target.value;
    this.setState({ pageLimit: pageLimit });
    this.props.dataFetchFunction(
      1,
      pageLimit,
      ...this.props.dataFetchFunctionArgs
    );
    this.props.updatePageLimit(pageLimit);
  };

  render() {
    return (
      <section className="pagination-wrapper">
        <div className="spacer">Total results: {this.props.data.total}</div>
        <Pagination className="pagination">{this.state.pageNumbers}</Pagination>
        <div className="page-selector">
          <select
            className="custom-select"
            onChange={this.handlePageLimitChange}
          >
            {this.props.itemsPerPage.map((each) => (
              <option value={each} selected={each === +this.props.pageLimit}>
                {each} items per page
              </option>
            ))}
          </select>
        </div>
      </section>
    );
  }
}
