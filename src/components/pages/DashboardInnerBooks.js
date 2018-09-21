import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';


import CardBook from '../common/CardBook';
import SnackBarMessage from '../common/SnackBarMessage';
import { fetchAllBook } from '../../actions/books';
import PaginationButton from '../common/PaginationButton';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    padding: 10,
    height: 500,
    overflowY: 'auto',
  },
  subheader: {
    width: '100%',
  },
});

class DashboardInnerBooks extends Component{
  state = {
    data: {
      books: [],
      totalElements: 0,
      totalPage: 0,
      page: 0
    },
    request: {
      page: 0,
      size: 15
    },
    cart: [],
    showErrors: false,
    errorMessage: null
  }

  componentDidMount(){
    this.props.fetchAllBook(this.state.request.page, this.state.request.size).then(res => {
      let { data, totalElements, page, totalPage } = res;
      let result = {
        ...this.state.data,
        books: data,
        totalElements,
        page,
        totalPage
      };
      this.setState({
        data: result
      });
    });
  }

  handleDismissMessage = () => {
    this.setState({
      errorMessage: null,
      showErrors: false
    });
  }

  handleShowErrorMessage = (message) => {
    this.setState({
      errorMessage: message,
      showErrors: true
    })
  }

  fetchBookWithPagination = (page) => {
    this.setState({
      page
    });
    this.props.fetchAllBook(page, this.state.request.size).then(res => {
      let { data, totalElements, page, totalPage } = res;
      let result = {
        ...this.state.data,
        books: data,
        totalElements,
        page,
        totalPage
      };
      this.setState({
        data: result
      });
    });
  }

  render(){
    const { classes } = this.props;
    let listBook = this.state.data.books.map((item, index) => <CardBook key={index} book={item} showErrors={ this.handleShowErrorMessage }/>);
    let pagination = this.state.data.books.length > 0 ? <PaginationButton page={ this.state.data.page } totalPages={ this.state.data.totalPage } onChangePage={ this.fetchBookWithPagination }/> : ""
    return (
      <div className={classes.root}>
        <SnackBarMessage
          open={ this.state.showErrors }
          handleClose={ this.handleDismissMessage }
          message={ this.state.errorMessage }
        />
        <GridList className={ classes.gridList } padding={10}>
          { listBook }
        </GridList>

        { pagination }
      </div>
    );
  }
}

DashboardInnerBooks.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent =  withStyles(styles)(DashboardInnerBooks);
export default connect(null, { fetchAllBook })(styledComponent);
