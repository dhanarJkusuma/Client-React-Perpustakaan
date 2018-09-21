import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import { ZonedDateTime } from 'js-joda';
import CardTransaction from '../common/CardTransaction';
import DoneAllIcon from 'material-ui-icons/DoneAll';

import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import SnackBarMessage from '../common/SnackBarMessage';
import { clearCart, addTransaction, updatePendingTrx, getIncompleteTransaction } from '../../actions/transaction';
import CardDialog from '../common/CardDialog';

const styles = theme => ({
  cardContent: {
    width: '57%',
    height: '500px',
    padding: '13px',
    margin: '25px auto'
  },
  cardList: {
    width: '95%',
    height: '80%',
    overflowY: 'scroll',
  },
  list: {
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: '40px'
  },
  centerIcon:{
    margin: 'auto',
    textAlign: 'center',
    marginTop: '150px'
  },
  bigIcon:{
    width: '80px',
    height: '80px'
  }
})

class DashboardInnerBorrow extends Component{
  state = {
    showErrors: false,
    showNotif: false,
    errorMessage: null,
    notifMessage: null,
    openDialogConfirm: false,
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

  handleDismissNotif = () => {
    this.setState({
      notifMessage: null,
      showNotif: false
    });
  }

  handleNotificationMessage = (message) => {
    this.setState({
      notifMessage: message,
      showNotif: true
    })
  }

  handlePostTransaction = (payload) => {
    this.props.addTransaction(payload).then(res => {
      if(res.data.status){
        this.handleNotificationMessage(res.data.message);
        this.fetchIncompleteTransaction();
        this.props.clearCart();
      }else{
        this.handleShowErrorMessage(res.data.message);
      }
    }).catch(err => console.log(err));
  }

  fetchIncompleteTransaction = () => this.props.getIncompleteTransaction().then(res => {
    this.handleUpdateCountPendingTransaction(res.length);
  })

  handleUpdateCountPendingTransaction = (count) => {
    this.props.updatePendingTrx(count);
  }

  handleCheckout = () => {
    if(this.props.cart.length > 0){
      this.setState({ openDialogConfirm: true });
    }else{
      this.handleShowErrorMessage("Tidak dapat melanjutkan transaksi, keranjang kosong !!!");
    }

  }

  handleCheckoutAction = () => {
    let borrowedTime = ZonedDateTime.now().withFixedOffsetZone().toString();
    let bookCodes = [];
    this.props.cart.forEach(c => {
      let book = {
        bookCode : c.code,
        quantity: c.quantity
      };
      bookCodes.push(book);
    });

    let request = {
      borrowedTime,
      bookCodes
    }
    this.handlePostTransaction(request);
  }

  handleConfirmOpen = (e) => {
    this.handleCheckoutAction();
    this.setState({ openDialogConfirm: false });
  };

  handleConfirmClose = (e) => {
    this.setState({ openDialogConfirm: false });
  };

  render(){
    const { classes } = this.props;
    const items = this.props.cart.map((c, index) => <CardTransaction key={ index } book={ c } showErrors={ this.handleShowErrorMessage }/>);
    const emptyIcon = (
      <div className={ classes.centerIcon }>
        <ShoppingCartIcon color="disabled" className={ classes.bigIcon } />
        <Typography variant="heading">Empty Cart. </Typography>
      </div>
    );
    const content = (this.props.cart.length > 0) ? items : emptyIcon;
    return (
      <div>
        <SnackBarMessage
          open={ this.state.showErrors }
          handleClose={ this.handleDismissMessage }
          message={ this.state.errorMessage }
        />
        <SnackBarMessage
          open={ this.state.showNotif }
          handleClose={ this.handleDismissNotif }
          message={ this.state.notifMessage }
        />
        <Card className={classes.cardContent}>
          <CardContent className={classes.cardList}>
            <List className={classes.list}>
              { content }
            </List>
          </CardContent>
          <CardActions>
            <Button className={classes.button} raised color="primary" onClick={ this.handleCheckout }>
              Checkout
              <DoneAllIcon className={classes.rightIcon} />
            </Button>
          </CardActions>
        </Card>
        <CardDialog
          open={ this.state.openDialogConfirm }
          handleOpen={ this.handleConfirmOpen }
          handleClose={ this.handleConfirmClose }
          message="Apakah anda yakin ingin melanjutkan transaksi ?"
        />
      </div>
    );
  }
}

DashboardInnerBorrow.propType = {
  cart: PropTypes.array.isRequired,
  addTransaction: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updatePendingTrx: PropTypes.func.isRequired,
  getIncompleteTransaction: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    cart: state.cart.data
  }
}

const styledComponent = withStyles(styles)(DashboardInnerBorrow);
export default connect(mapStateToProps, {
  addTransaction,
  clearCart,
  updatePendingTrx,
  getIncompleteTransaction
})(styledComponent);
