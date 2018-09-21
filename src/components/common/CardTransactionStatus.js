import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AssignmentReturnIcon from 'material-ui-icons/AssignmentReturn';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import VisibilityIcon from 'material-ui-icons/Visibility';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { ZonedDateTime } from 'js-joda';

import ResponsiveBookDialog from '../common/ResponsiveBookDialog';

const styles = theme => ({
  item: {
    width: '100%'
  },
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    margin: theme.spacing.unit,
    width: 16
  },
  chip: {
    margin: theme.spacing.unit,
  }
});

class CardTransactionStatus extends Component {

  state = {
    selectedBook: {
      code: "N/A",
      title: "N/A",
      author: "N/A",
      editor: "N/A",
      publisher: "N/A",
      categories: "N/A",
      year: 0,
      quantity: 0
    },
    openBookDetail: false
  }

  handleCompleteTransaction = () => {
    let now = ZonedDateTime.now().withFixedOffsetZone().toString();
    let trxId = this.props.transaction.publicId;
    let payload = {
      returnDate: now
    }
    this.props.onCompleteTransaction(trxId, payload);
  }

  handleDetail = book => () => {
    this.setState({ selectedBook: book, openBookDetail: true });
  }

  handleCloseDetailBook = () => {
    let initBook = {
        code: "N/A",
        title: "N/A",
        author: "N/A",
        editor: "N/A",
        publisher: "N/A",
        categories: "N/A",
        year: 0,
        quantity: 0
    };
    this.setState({ selectedBook: initBook, openBookDetail: false })
  }

  render(){
    const { classes } = this.props;
    const parsedZonedDateTime = ZonedDateTime.parse(this.props.transaction.borrowDate);
    const date = parsedZonedDateTime.dayOfMonth()
    + " "
    + parsedZonedDateTime.month()
    + " "
    + parsedZonedDateTime.year()
    + " "
    + parsedZonedDateTime.hour()
    + ":"
    + parsedZonedDateTime.minute()
    + ":"
    + parsedZonedDateTime.second();
    const books = this.props.transaction.books.map((book, index) => {
      return (
        <Chip
           key={ index }
           avatar={
             <Avatar>
               { book.quantity }
             </Avatar>
           }
           label={ book.title }
           onDelete={ this.handleDetail(book) }
           className={ classes.chip }
           deleteIcon={<VisibilityIcon />}
         />
      )
    });
    const isWaitingForApprove = this.props.transaction.returnDate != null;
    const label = isWaitingForApprove ? "Waiting For Approval" : "Not Yet Returned ";

    return (
      <div className={classes.item}>
        <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <div className={classes.column}>
             <Typography className={classes.heading}>{ this.props.transaction.publicId }</Typography>
           </div>
           <div className={classes.column}>
             <Typography className={classes.secondaryHeading}>{ date }</Typography>
           </div>
           <div className={classes.column}>
             <Chip label={ label } className={classes.chip} />
           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.details}>
           <div className={classes.column}>
            { books }
           </div>
         </ExpansionPanelDetails>
         <Divider />
         <ExpansionPanelActions>
          { this.props.transaction.returnDate == null ?
            <Button size="small" color="primary" onClick={ this.handleCompleteTransaction }>
             Return Item
             <AssignmentReturnIcon className={classes.rightIcon} />
            </Button>
            : ""
          }

         </ExpansionPanelActions>
       </ExpansionPanel>
       <ResponsiveBookDialog
          open={ this.state.openBookDetail }
          book={ this.state.selectedBook }
          onClose={ this.handleCloseDetailBook }
       />
      </div>
    );
  }
}

CardTransactionStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  onCompleteTransaction: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(CardTransactionStatus);
