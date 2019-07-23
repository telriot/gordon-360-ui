import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../../../theme';

export default class RemoveHoursDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removeOfficeHoursOpen: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onDialogSubmit();
    this.props.handleRemoveOfficeHoursClose();
  };



  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <Fragment>
        <Dialog
          open={this.props.removeOfficeHoursOpen}
          keepMounted
          onClose={this.props.handleRemoveOfficeHoursClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="title">Are you sure about removing this event?</DialogTitle>
          <DialogActions className="buttons">
            <Button
              onClick={this.props.handleRemoveOfficeHoursClose}
              variant="contained"
              style={button}
            >
              No
            </Button>
            <Button variant="contained" onClick={this.handleSubmit} style={button}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
