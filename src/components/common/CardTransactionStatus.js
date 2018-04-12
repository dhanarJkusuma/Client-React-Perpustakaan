import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import BookIcon from 'material-ui-icons/Book';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import AssignmentReturnIcon from 'material-ui-icons/AssignmentReturn';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import { ZonedDateTime, DateTimeFormatter } from 'js-joda';

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
    monthConstant : [
      'Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'
    ]
  }

  constructor(props){
    super(props);
  }

  handleClick = () => {
    console.log('test');
  }

  handleCompleteTransaction = () => {
    let now = ZonedDateTime.now().withFixedOffsetZone().toString();
    let trxId = this.props.transaction.publicId;
    let payload = {
      returnDate: now
    }
    this.props.onCompleteTransaction(trxId, payload);
  }

  render(){
    const { classes, theme } = this.props;
    const parsedZonedDateTime = ZonedDateTime.parse(this.props.transaction.borrowDate);
    const date = parsedZonedDateTime.dayOfMonth()
    + " "
    + this.state.monthConstant[parsedZonedDateTime.monthValue()-1]
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
           onClick={ this.handleClick }
           className={ classes.chip }
         />
      )
    });
    const isWaitingForApprove = this.props.transaction.returnDate != null;
    const label = isWaitingForApprove ? "Menunggu Persetujuan" : "Belum Dikembalikan";

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
             Kembalikan
             <AssignmentReturnIcon className={classes.rightIcon} />
            </Button>
            : ""
          }

         </ExpansionPanelActions>
       </ExpansionPanel>
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
