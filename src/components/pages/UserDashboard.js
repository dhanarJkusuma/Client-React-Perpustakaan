import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import StaticNavbar from '../common/StaticNavbar';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { connect } from 'react-redux';

import Icon from 'material-ui/Icon';
import BookIcon from 'material-ui-icons/Book';
import SwapVerticalCircleIcon from 'material-ui-icons/SwapVerticalCircle';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import AnnouncementIcon from 'material-ui-icons/Announcement';


import { Route, Switch } from 'react-router-dom';
import Badge from 'material-ui/Badge';

import DashboardInnerBooks from './DashboardInnerBooks';
import DashboardInnerBorrow from './DashboardInnerBorrow';
import DashboardInnerStatus from './DashboardInnerStatus';
import CardDialog from '../common/CardDialog';

import {updatePendingTrx, getIncompleteTransaction} from '../../actions/transaction';
const styles = theme => ({
  contentCard: {
    width: '100%'
  },

  botNavRoot: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
  },
});

class UserDashboard extends Component{
  state = {
    value: 'watch',
    openDialogLogout: false,
    menu: 'watch'
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.fetchIncompleteTransaction();
  }

  handleChange = (event, value) => {
     this.setState({ value });
     switch (value) {
       case 'watch':
          this.props.history.push('/dashboard/watch');
          this.setState({ menu: value })
          break;
       case 'borrow':
         this.props.history.push('/dashboard/borrow');
         this.setState({ menu: value })
         break;
       case 'status':
         this.props.history.push('/dashboard/status');
         this.setState({ menu: value })
         break;
       case 'logout':
         this.setState({ openDialogLogout: true });
         break;
       default:

         break;
     }

   };

   handleLogoutOpen = (e) => {
     this.setState({ openDialogLogout: true });
   };

   handleLogoutClose = (e) => {
     this.setState({ openDialogLogout: false });
     this.setState({ value: this.state.menu });
   };

   fetchIncompleteTransaction = () => this.props.getIncompleteTransaction().then(res => {
     this.handleUpdateCountPendingTransaction(res.length);
   })

   handleUpdateCountPendingTransaction = (count) => {
     this.props.updatePendingTrx(count);
   }

  render(){
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.contentCard}>
        <StaticNavbar title="E-Libra | Dashboard" />
        <Switch>
          <Route path='/dashboard/watch' component={DashboardInnerBooks}/>
          <Route path='/dashboard/borrow' component={DashboardInnerBorrow}/>
          <Route path='/dashboard/status' component={DashboardInnerStatus}/>
          {/* when none of the above match, <NoMatch> will be rendered */}
          <Route component={DashboardInnerBorrow}/>
        </Switch>

        <BottomNavigation value={value} onChange={this.handleChange} className={classes.botNavRoot}>
          <BottomNavigationAction label="Lihat Buku" value="watch" icon={<BookIcon />} />

          <BottomNavigationAction
            label="Pinjam Buku"
            value="borrow"
            icon={
              <Badge className={classes.badge} badgeContent={ this.props.cart.length } color="primary">
                <SwapVerticalCircleIcon />
              </Badge>
            } />
            <BottomNavigationAction
              label="Status Peminjaman"
              value="status"
              icon={
                <Badge className={classes.badge} badgeContent={ this.props.pendingTransaction } color="primary">
                  <AnnouncementIcon />
                </Badge>
              } />
          <BottomNavigationAction label="Keluar" value="logout" icon={<ExitToAppIcon/>} />
        </BottomNavigation>

        <CardDialog
          open={ this.state.openDialogLogout }
          handleOpen={ this.handleLogoutOpen }
          handleClose={ this.handleLogoutClose }
          message="Apakah anda yakin ingin keluar dari aplikasi ?"
        />

      </div>
    );
  }
}

UserDashboard.protoType = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchAllBook: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  pendingTransaction: PropTypes.object.isRequired,
  getIncompleteTransaction: PropTypes.func.isRequired,
  updatePendingTrx: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    cart: state.cart.data,
    pendingTransaction: state.transaction.pendingTransaction
  }
}

const styledComponent = withStyles(styles)(UserDashboard);
export default connect(mapStateToProps, {
  getIncompleteTransaction,
  updatePendingTrx
})(styledComponent)
