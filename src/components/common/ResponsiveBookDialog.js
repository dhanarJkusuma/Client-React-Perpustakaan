import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

class ResponsiveBookDialog extends React.Component {

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> Book Detail </DialogTitle>
          <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>{ this.props.book.code != null ? this.props.book.code : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{ this.props.book.title != null ? this.props.book.title: "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>{ this.props.book.author != null ? this.props.book.author: "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Editor</TableCell>
                <TableCell>{ this.props.book.editor != null ? this.props.book.editor : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Publisher</TableCell>
                <TableCell>{ this.props.book.publisher != null ? this.props.book.publisher : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>{ this.props.book.year != null ? this.props.book.year : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{ this.props.book.quantity }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell>{ this.props.book.categories != null ? this.props.book.categories : "N/A" }</TableCell>
              </TableRow>
            </TableBody>
           </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveBookDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withMobileDialog()(ResponsiveBookDialog);
