import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import teal from 'material-ui/colors/teal';
import List, { ListItem } from 'material-ui/List';
import CardTransactionStatus from '../common/CardTransactionStatus';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import CardDialog from '../common/CardDialog';
import 'typeface-roboto'

import { connect } from 'react-redux';
import { getIncompleteTransaction, completeTransaction, updatePendingTrx } from '../../actions/transaction';
import SnackBarMessage from '../common/SnackBarMessage';

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
  trxCount: {
    marginTop: '40px',
    padding: '10px'
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

class DashboardInnerBooks extends Component{
  state = {
    openDialogConfirm: false,
    transactionList: [],
    selectedTrx: null,
    showNotif: false,
    notifMessage: null,
    showLoading: false
  }
  
  componentDidMount(){
    this.fetchIncompleteTransaction();
  }

  fetchIncompleteTransaction = () => {
    this.setState({ showLoading: true });
    this.props.getIncompleteTransaction().then(res => {
      this.setState({ transactionList: res, showLoading: false });
      this.handleUpdatePendingTransaction(res.length);
    });
  }

  handleCompleteTransaction = (trxId, payload) => this.props.completeTransaction(trxId, payload).then(res => {
    this.showNotifMessage(res.data.message);
    this.fetchIncompleteTransaction();
  })

  handleConfirmComplete = (trxId, payload) => {
    let selectedTrx = {
      trxId,
      payload
    }
    this.setState({ selectedTrx, openDialogConfirm: true });
  };

  handleConfirmAction = () => {
    this.handleCompleteTransaction(this.state.selectedTrx.trxId, this.state.selectedTrx.payload);
    this.setState({ openDialogConfirm: false, selectedTrx: null });
  }

  handleConfirmClose = () => {
    this.setState({
      openDialogConfirm: false,
      selectedTrx: null
    });
  };

  showNotifMessage = (message) => {
    this.setState({
      showNotif: true,
      notifMessage: message
    })
  }

  handleDismissNotif = () => {
    this.setState({ showNotif: false });
  }

  handleUpdatePendingTransaction = (count) => {
    this.props.updatePendingTrx(count);
  }

  render(){
    const { classes } = this.props;
    const loading = (
      <div className={classes.centerLoading}>
        <CircularProgress className={classes.progress} style={{ color: teal[500] }} thickness={7} />
      </div>
    )
    const transactionList = this.state.transactionList.map((t, index) =>
      <ListItem key={ t.publicId }>
        <CardTransactionStatus
          transaction={ t }
          onCompleteTransaction={ this.handleConfirmComplete }
        />
      </ListItem>
    );
    const emptyIcon = (
      <div className={ classes.centerIcon }>
        <ThumbUpIcon color="disabled" className={ classes.bigIcon } />
        <Typography variant="heading">No Pending Transaction</Typography>
      </div>
    );
    const content = (this.state.transactionList.length > 0) ? transactionList : emptyIcon;
    return (
      <div>

        <Card className={classes.cardContent}>
          <CardContent className={classes.cardList}>
            { this.state.showLoading && loading }
            <List className={classes.list}>
                { content }
            </List>
          </CardContent>
          <CardActions>
            <Typography variant="headline" className={ classes.trxCount }>
              Total Pending Transaction : { transactionList.length }
            </Typography>
          </CardActions>
        </Card>

        <SnackBarMessage
          open={ this.state.showNotif }
          handleClose={ this.handleDismissNotif }
          message={ this.state.notifMessage }
        />

        <CardDialog
          open={ this.state.openDialogConfirm }
          handleOpen={ this.handleConfirmAction }
          handleClose={ this.handleConfirmClose }
          message="Do you really want to continue this transaction ?"
        />
      </div>
    );
  }
}

DashboardInnerBooks.propType = {
  getIncompleteTransaction: PropTypes.func.isRequired,
  completeTransaction: PropTypes.func.isRequired,
  updatePendingTrx: PropTypes.func.isRequired
}

const styledComponent = withStyles(styles)(DashboardInnerBooks);
export default connect(null, { getIncompleteTransaction, completeTransaction, updatePendingTrx })(styledComponent);
