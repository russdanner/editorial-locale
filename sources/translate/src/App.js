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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

import SelectedItems from './components/SelectedItems';
import TreeView from './components/TreeView';

import { copyDestSub } from './service/subscribe';
import StudioAPI from './api/studio';

const DEFAULT_WEBSITE_PATH = '/site/website';
const DEFAULT_COMPONENT_PATH = '/site/components';

/**
 * Get root directory
 * If all /site/website => root directory
 * If all /site/components => root directory
 * Default: /site
 * @returns root directory
 */
  const getRootDir = (items) => {
  if (items.every((elm) => elm.path && elm.path.startsWith(DEFAULT_WEBSITE_PATH))) {
    return DEFAULT_WEBSITE_PATH;
  }

  if (items.every((elm) => elm.path && elm.path.startsWith(DEFAULT_COMPONENT_PATH))) {
    return DEFAULT_COMPONENT_PATH;
  }

  return null;

};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NoSelectedItems = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="error">
        <AlertTitle>Error</AlertTitle>
        Please select at least one item to copy.
      </Alert>
    </Stack>
  );
};

const MixedSelectedItems = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="error">
        <AlertTitle>Error</AlertTitle>
        Mixed content types are selected. All items must be in the same category (Pages or Components).
      </Alert>
    </Stack>
  );
}

const StyledPopupButton = styled('a')(({ theme }) => ({
  cursor: 'pointer',
  paddingLeft: 0,
  paddingRight: '10px',
  paddingTop: '16.5px',
  paddingBottom: '16.5px',
  color: '#777',
  lineHeight: '17px',
  position: 'relative',
  display: 'block',
  textDecoration: 'none',
  '&:hover': {
    color: '#333',
    textDecoration: 'none',
  }
}));

const StyledActionButton = styled(Button)(({ theme }) => ({
  minWidth: '120px',
}));

export default function App() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [rootDir, setRootDir] = useState(null);
  const [desPath, setDesPath] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const onCloseAlert = () => {
    setAlert(Object.assign({}, {
      open: false,
      severity: alert.severity,
      message: alert.message,
     }));
  }

  const handleCopy = async (event) => {
    event.preventDefault();

    setIsProcessing(true);
    const paths = StudioAPI.getSelectedItems().map(item => item.path);

    for (let i =0; i < paths.length; i += 1) {
      if (await StudioAPI.clipboardCopy(paths[i])) {
        const res = await StudioAPI.clipboardPaste(desPath);
        if (!res) {
          setIsProcessing(false);
          return setAlert({
            open: true,
            severity: 'error',
            message: `There is an error while traslating file: ${paths[i]}`,
          });
        }
      } else {
        setIsProcessing(false);
        return setAlert({
          open: true,
          severity: 'error',
          message: `There is an error while copying file: ${paths[i]}`,
        });
      }
    }

    setAlert({
      open: true,
      severity: 'success',
      message: 'Selected files are translated to destination folder.',
    });
    setIsProcessing(false);
    setOpen(false);
  }

  React.useEffect(() => {
    const handleContentMenuChanged = () => {
      const items = StudioAPI.getSelectedItems();
      setSelectedItems(items);
      setRootDir(getRootDir(items));
    }

    CStudioAuthoring.Events.contentSelected.subscribe(handleContentMenuChanged, { subscriber: 'translate-plugin' });
    CStudioAuthoring.Events.contentUnSelected.subscribe(handleContentMenuChanged, { subscriber: 'translate-plugin' });

    return () => {
      CStudioAuthoring.Events.contentSelected.unsubscribe(handleContentMenuChanged);
      CStudioAuthoring.Events.contentUnSelected.unsubscribe(handleContentMenuChanged);
    }
  }, []);

  React.useEffect(() => {
    copyDestSub.subscribe((path) => {
      setDesPath(path);
    });

    return () => {
      copyDestSub.unsubscribe();
    }
  }, []);

  return (
    <div>
      {selectedItems.length > 0 && (
        <li className="acn-link" onClick={() => setOpen(true)}>
          <StyledPopupButton className="ItemTranslate cursor">
            Translate
          </StyledPopupButton>
          <img id="itemtranslate-loading" src="/studio/static-assets/themes/cstudioTheme/images/treeview-loading.gif" />
        </li>
      )}
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">Translate</DialogTitle>
        <DialogContent>
          {selectedItems.length === 0 ?
            <NoSelectedItems /> :
            (
              <>
                <SelectedItems selectedItems={selectedItems} />
                { !!rootDir ? (
                  <TreeView selectedItems={selectedItems} rootDir={rootDir} />
                ) : (
                  <MixedSelectedItems />
                )}
              </>
            )
          }
        </DialogContent>
        <DialogActions>
          <StyledActionButton
            variant="contained"
            color="primary"
            onClick={handleCopy}
            disabled={isProcessing || !rootDir}
          >
            Translate
          </StyledActionButton>
          <StyledActionButton
            variant="outlined"
            color="primary"
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancel
          </StyledActionButton>
        </DialogActions>
      </Dialog>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alert && alert.open} autoHideDuration={6000} onClose={onCloseAlert}>
          <Alert onClose={onCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
