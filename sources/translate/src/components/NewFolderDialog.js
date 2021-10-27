import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import DialogContentText from '@mui/material/DialogContentText';

import { StyledCancelButton, StyledMainButton } from './StyledButton';

import StudioAPI from '../api/studio';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '45%',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function NewFolderDialog({ open, onClose, path }) {
  const [folderName, setFolderName] = React.useState('');

  const onSubmit = async () => {
    if (folderName && path) {
      const res = await StudioAPI.createFolder(path, folderName);
      setFolderName('');
      onClose(res);
    }
  };

  const closeWithoutSubmit = () => {
    setFolderName('');
    onClose();
  };

  return (
    <div>
      <StyledDialog
        maxWidth="md"
        open={open}
        onClose={closeWithoutSubmit}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>Create a New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Parent path: {path}<br />
            Please enter a folder name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value.trim())}
          />
        </DialogContent>
        <DialogActions>
          <StyledCancelButton
            variant="outlined"
            color="primary"
            onClick={closeWithoutSubmit}
          >
            Cancel
          </StyledCancelButton>
          <StyledMainButton
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Create
          </StyledMainButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}