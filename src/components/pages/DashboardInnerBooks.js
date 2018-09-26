import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import teal from 'material-ui/colors/teal';

import Grid from 'material-ui/Grid';


import CardBook from '../common/CardBook';
import SnackBarMessage from '../common/SnackBarMessage';
import { fetchAllBook, searchBook } from '../../actions/books';
import PaginationButton from '../common/PaginationButton';
import SearchForm from '../common/SearchForm';

const maxHeight = window.screen.height;
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    padding: 10,
    height: maxHeight/2,
  },
  subheader: {
    width: '100%',
  },
  pagination: {
   
  }
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
      size: 15,
      query: ""
    },
    cart: [],
    showErrors: false,
    errorMessage: null,
    showLoading: false
  }

  componentDidMount(){
    this.setState({ showLoading: true });
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
        data: result,
        showLoading: false
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

  searchBook = (query, page)  => {
    let request = {
      ...this.state.request,
      query,
      page
    }
    this.setState({
      request
    });
    this.props.searchBook(query, page, this.state.request.size).then(res => {
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

  fetchBook = (page) => {
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

  fetchBookWithPagination = (page) => {
    this.setState({
      page
    });
    if(this.state.request.query !== ''){
      this.searchBook(this.state.request.query, page, this.state.request.size);
    }else{
      this.fetchBook(page);
    }
  }

  onHandlingSearch = (query) => {
    this.setState({ page: 0 });
    if(query !== ''){
      this.searchBook(query, 0);
    }else{
      this.fetchBook(0);
    }
  }

  render(){
    const { classes } = this.props;
    let listBook = this.state.data.books.map((item, index) => <CardBook key={index} book={item} showErrors={ this.handleShowErrorMessage }/>);
    let pagination = this.state.data.books.length > 0 ? <PaginationButton page={ this.state.data.page } totalPages={ this.state.data.totalPage } onChangePage={ this.fetchBookWithPagination }/> : ""
    const loading = (
      <div className={classes.centerLoading}>
        <CircularProgress className={classes.progress} style={{ color: teal[500] }} thickness={7} />
      </div>
    )
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <SearchForm searchEvent={ this.onHandlingSearch }/>
          </Grid>
        </Grid>
        
        <SnackBarMessage
          open={ this.state.showErrors }
          handleClose={ this.handleDismissMessage }
          message={ this.state.errorMessage }
        />
        
        { this.state.showLoading && loading }
        <GridList className={ classes.gridList } >
          { listBook }
        </GridList>

        <div className={ classes.pagination } >
          { pagination }
        </div>
      
      </div>
    );
  }
}

DashboardInnerBooks.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent =  withStyles(styles)(DashboardInnerBooks);
export default connect(null, { fetchAllBook, searchBook })(styledComponent);
