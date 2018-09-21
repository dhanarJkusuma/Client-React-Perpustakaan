import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';


import CardBook from '../common/CardBook';
import SnackBarMessage from '../common/SnackBarMessage';
import { fetchAllBook } from '../../actions/books';

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
    cart: [],
    showErrors: false,
    errorMessage: null
  }

  componentDidMount(){
    this.props.fetchAllBook().then(res => {
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
      ...this.state,
      errorMessage: null,
      showErrors: false
    });
  }

  handleShowErrorMessage = (message) => {
    this.setState({
      ...this.state,
      errorMessage: message,
      showErrors: true
    })
  }

  render(){
    const { classes } = this.props;
    let listBook = this.state.data.books.map((item, index) => <CardBook key={index} book={item} showErrors={ this.handleShowErrorMessage }/>);
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
      </div>
    );
  }
}

DashboardInnerBooks.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent =  withStyles(styles)(DashboardInnerBooks);
export default connect(null, { fetchAllBook })(styledComponent);
