import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AppHeader from './AppHeader';
import NewTask from '../NewTask/NewTask';
import FilterTasks from '../FilterTasks/FilterTasks';
import { styles } from '@/App.styles';

const AppBody = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Grid container css={styles.container}>
        <AppHeader />
        <NewTask />
        <FilterTasks />
        {children}
      </Grid>
    </Container>
  );
};

export default AppBody;
