import React from 'react'
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FastRewindIcon from 'material-ui-icons/FastRewind';
import FastForwardIcon from 'material-ui-icons/FastForward';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: theme.mixins.gutters({
        padding: 3,
    }),
  });

class PaginationButton extends React.Component{

    handleChangePage = (page) => {
        this.props.onChangePage(page)
    }

    render(){
        const { classes, page, totalPages } = this.props;
        var buttons = []
        if(page > 2){
            buttons.push(
                <Button key={ -1 } fab color="primary"  className={ classes.button } onClick={ () => this.handleChangePage(0) }>
                    <FastRewindIcon />
                </Button>
            );
        }
        let startPage = page - 2 > 0 ? page - 2 : 0
        let endPage = page + 2 < totalPages - 1 ? page + 2 : totalPages;
        for(let index = startPage; index < endPage; index++){
            let currentPage = index === page;
            buttons.push(
                <Button key={ index } fab color="primary" disabled={ currentPage } className={ classes.button } onClick={ () => this.handleChangePage(index) }>
                    { index + 1 }
                </Button>
            );
        }
        if(page < totalPages - 3){
            buttons.push(
                <Button key={ totalPages } fab color="primary"  className={ classes.button } onClick={ () => this.handleChangePage(totalPages - 1) }>
                    <FastForwardIcon />
                </Button>
            );
        }
        return (
            <Paper className={classes.root} elevation={4}>
                { buttons }
            </Paper>
        )
    }
}

PaginationButton.propTypes = {
    classes: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default withStyles(styles)(PaginationButton);