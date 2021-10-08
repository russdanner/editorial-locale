/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import SelectedItems from './components/SelectedItems';
import TreeView from './components/TreeView';

import { copyDestSub } from './service/subscribe';
import StudioAPI from './api/studio';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NoSelectedItems() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="error">
        <AlertTitle>Error</AlertTitle>
        Please select at least one item to copy.
      </Alert>
    </Stack>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [desPath, setDesPath] = useState('');

  React.useEffect(() => {
    copyDestSub.subscribe((path) => {
      setDesPath(path);
    });

    return () => {
      copyDestSub.unsubscribe();
    }
  }, []);

  const handleContentMenuChanged = () => {
    const items = StudioAPI.getSelectedItems();
    setSelectedItems(items);
  }

  React.useEffect(() => {
    CStudioAuthoring.Events.contentSelected.subscribe(function (evtName, contentTO) {
      handleContentMenuChanged();
    });
  }, []);

  React.useEffect(() => {
    CStudioAuthoring.Events.contentUnSelected.subscribe(function (evtName, contentTO) {
      handleContentMenuChanged();
    });
  }, []);

  const handleClose = () => setOpen(false);

  const handleCopy = async (event) => {
    event.preventDefault();

    const paths = StudioAPI.getSelectedItems().map(item => item.path);
    for (let i =0; i < paths.length; i += 1) {
      if (await StudioAPI.clipboardCopy(paths[i])) {
        const res = await StudioAPI.clipboardPaste(desPath);
        if (res) {
          setOpen(false);
          setOpenNotification(true);
        }
      }
    }
  }

  return (
    <div>
      {selectedItems.length > 0 && (
        <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', top: 0, right: 0 }}>
          <Fab variant="extended" onClick={() => setOpen(true)}>
            <TranslateIcon sx={{ mr: 1 }} />
              Translate
          </Fab>
        </Box>
      )}
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Translate</DialogTitle>
        <DialogContent>
          {selectedItems.length === 0 ?
            <NoSelectedItems /> :
            (
              <>
                <SelectedItems selectedItems={selectedItems} />
                <TreeView />
              </>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button sx={{ minWidth: '100px'}} variant="contained" onClick={handleCopy} color="primary">Translate</Button>
          <Button sx={{ minWidth: '100px'}} variant="outlined" onClick={handleClose} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openNotification} autoHideDuration={6000} onClose={() => setOpenNotification(false)}>
          <Alert onClose={() => setOpenNotification(false)} severity="success" sx={{ width: '100%' }}>
            Selected files are copied to destination folder.
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
