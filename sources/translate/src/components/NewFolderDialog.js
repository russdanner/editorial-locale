import React from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { StyledCancelButton, StyledMainButton } from './StyledButton';
import StyledDialogComponent from './StyledDialog';

import StudioAPI from '../api/studio';

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
      <StyledDialogComponent
        open={open}
        onClose={closeWithoutSubmit}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Create a New Folder</DialogTitle>
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
          <StyledMainButton
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Create
          </StyledMainButton>
          <StyledCancelButton
            variant="outlined"
            color="primary"
            onClick={closeWithoutSubmit}
          >
            Cancel
          </StyledCancelButton>
        </DialogActions>
      </StyledDialogComponent>
    </div>
  );
}