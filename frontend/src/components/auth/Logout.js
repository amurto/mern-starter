import React, { useState, useContext } from 'react';

import { AuthContext } from '../context/auth-context';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Logout = () => {
    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button color="inherit" onClick={handleClickOpen}>
            Logout
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to logout?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                No
            </Button>
            <Button onClick={auth.logout} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default Logout;