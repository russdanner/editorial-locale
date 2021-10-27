import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Popover from '@mui/material/Popover';

const StyledMenu = styled((props) => (
  <Popover
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ActionMenu({ anchorEl, onClose, position, onCreateFolder, onRenameFolder }) {
  const open = Boolean(anchorEl);
  const { pageX, pageY, path } = position;

  return (
    <div>
      <StyledMenu
        anchorReference="anchorPosition"
        anchorPosition={{ top: pageY, left: pageX }}
        open={open}
        onClose={onClose}
      >
        <MenuItem onClick={onCreateFolder} disableRipple>
          <CreateNewFolderIcon />
          Create new folder
        </MenuItem>
        <MenuItem onClick={onRenameFolder} disableRipple>
          <BorderColorIcon />
          Rename
        </MenuItem>
      </StyledMenu>
    </div>
  );
}