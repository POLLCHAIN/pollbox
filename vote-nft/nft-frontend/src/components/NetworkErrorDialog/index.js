import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import {
  Button,
  Paper,
  ModalContents
} from './styled';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const NetworkErrorDialog = (props) => {

  const classes = useStyles();
  const { open, handleClose, onClose, message } = props;

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <Paper>
          <ModalContents>
            <p>{ message }</p>
            <Button size='medium' onClick={handleClose}>
              CLOSE
            </Button>
          </ModalContents>         
        </Paper>
      </Fade>
    </Modal>
  )
}

export default NetworkErrorDialog
