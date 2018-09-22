import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import SearchIcon  from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    paper: {
        margin: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 1.5,
    },
    button: {
        padding:5,
        width: '100%',
        marginTop:'-2px'
    },
    bootstrapRoot: {
        padding: 0,
        display: 'block',
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        display: 'block',
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '5px 7px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
});

class SearchForm extends React.Component {
    state = {
        query: ''
    }

    onSearchClick = () => {
        this.props.searchEvent(this.state.query);
    }

    handleChangeField = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={4}>
                    <Grid container padding={6}>
                        <Grid item sm={10} xs={6}>
                            <TextField
                                placeholder="Title Keyword Search..."
                                id="bootstrap-input"
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        root: classes.bootstrapRoot,
                                        input: classes.bootstrapInput,
                                    },
                                }}
                                fullWidth
                                name="query"
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.bootstrapFormLabel,
                                }}
                                onChange={this.handleChangeField}
                            />
                        </Grid>
                    
                        <Grid item sm={2} xs={6}>
                            <Button className={classes.button} raised color="primary" onClick={ this.onSearchClick }>
                            Search &nbsp;  <SearchIcon className={classes.rightIcon} />
                        </Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </div>
        )
    }
}

SearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
    searchEvent: PropTypes.func.isRequired
}

export default withStyles(styles)(SearchForm)