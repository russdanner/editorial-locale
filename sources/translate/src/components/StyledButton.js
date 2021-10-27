import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  minWidth: '120px',
}));

export default StyledActionButton;
