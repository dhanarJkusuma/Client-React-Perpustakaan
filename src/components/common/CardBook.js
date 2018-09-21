import React, { Component } from 'react';

import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addCart, replaceStockCart } from '../../actions/transaction';

const styles = {
  card: {
    width:  175,
    margin: 5
  },
  media: {
    height: 125,
  },
};

class CardBook extends Component{
  state = {
    emptyStock: false,
    actualStock: 0
  }

  componentDidMount(){
    this.handleActualStock();
  }

  handleBorrow = (e) => {
    let books = this.props.cart;
    let foundInCartIndex = -1;
    let index = 0;
    let foundedBook = null;
    books.forEach(item => {
      if(this.props.book.code === item.code){
        foundInCartIndex = index;
        foundedBook = item;
        return;
      }
      index++;
    })

    if(foundInCartIndex >= 0){
      this.updateStockItemCart(foundInCartIndex, foundedBook);
    }else{
      this.addNewItemCart();
    }
  }

  // Function to add new cart
  addNewItemCart = () => {
    if(this.props.book.stock > 0){
      this.props.addCart(this.props.book);
      this.handleSubtractActualStock();
    }else{
      this.setState({ emptyStock: true })
      this.props.showErrors("Stok Kosong !!!");
    }
  }

  // Function to updating stock cart
  updateStockItemCart = (index, foundedBook) => {
    let stock = this.props.book.stock;
    if(stock - foundedBook.quantity >  0){
      let newStock = foundedBook.quantity + 1;
      this.props.replaceStockCart(index, newStock);
      this.handleSubtractActualStock();
    }else{
      this.handleEmptyStock();
    }
  }

  handleActualStock = () => {
    let isEmptyStock = (this.props.book.stock < 1);
    if(isEmptyStock){
      this.setState({ emptyStock : isEmptyStock});
    }else{
      let books = this.props.cart;
      let currentBook = null;
      books.forEach(item => {
        if(this.props.book.code === item.code){
          currentBook = item;
          return;
        }
      });
      let actualStock = this.props.book.stock;
      if(currentBook != null){
        actualStock -= currentBook.quantity;
      }
      this.setState({ actualStock });
    }
  }

  handleSubtractActualStock = () => {
    let actualStock = this.state.actualStock - 1;
    this.setState({ actualStock });
  }

  handleEmptyStock = () => {
    this.setState({ emptyStock: true })
    this.props.showErrors("Kosong Empty !!!");
  }


  render(){
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="http://localhost:8080/storage/image/no_image.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="subheading">
              { this.props.book.title }
            </Typography>
          </CardContent>
          <CardActions>
            <Badge className={classes.margin} badgeContent={ this.state.actualStock } color="primary">
              <Button onClick={ this.handleBorrow } size="small" color="primary" disabled={this.state.emptyStock}>
                Add To Cart
              </Button>
            </Badge>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CardBook.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  addCart: PropTypes.func.isRequired,
  replaceStockCart: PropTypes.func.isRequired,
  showErrors: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
};

function mapStateToProps(state){
  return {
    cart: state.cart.data
  }
}


const styledComponent =  withStyles(styles)(CardBook);
export default connect(mapStateToProps, { addCart, replaceStockCart })(styledComponent);
