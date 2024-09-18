import { styles } from '@/App.styles';
import { Typography, Box } from '@mui/material';
import logo from '../../assets/logo.webp';

const AppHeader = () => {
  return (
    <>
      <Typography variant="h4" align="center">
        Morosystem's Task List
      </Typography>
      <Box sx={styles.companyLogo}>
        <img src={logo} alt="Morosystem's Logo" width="100%" height="100%" />
      </Box>
    </>
  );
};

export default AppHeader;
