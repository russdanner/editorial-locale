import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  minWidth: '120px',
}));

const StyledMainButton = styled(StyledActionButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#7e9dbb',
  borderColor:'#6d90b2',
  '&:hover': {
    backgroundColor: '#5d84a9',
    color: theme.palette.common.white,
    borderColor: '#4e7294',
  }
}));

const StyledCancelButton = styled(StyledActionButton)(({ theme }) => ({
  color: '#333',
  backgroundColor: theme.palette.common.white,
  borderColor: '#ccc',
  '&:hover': {
    backgroundColor: '#e6e6e6',
    color: '#333',
    borderColor: '#adadad',
  }
}));

export { StyledCancelButton, StyledMainButton };

