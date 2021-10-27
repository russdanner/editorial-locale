import Draggable from 'react-draggable';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';

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

export default function StyledDialogComponent(props) {
  return (
    <StyledDialog
      maxWidth="md"
      PaperComponent={PaperComponent}
      {...props}
    />
  );
};
