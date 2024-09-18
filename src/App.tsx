import { Alert, Box } from '@mui/material';
import TaskList from './components/TaskList/TaskList';
import { useGetAllTasksQuery } from './features/apiSlice';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import { styles } from './App.styles';
const App = () => {
  const { data, isFetching, isLoading, isError, isUninitialized } =
    useGetAllTasksQuery();

  const numberOfSkeletons = 3;
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i);

  if (isLoading || isUninitialized || isFetching)
    return (
      <>
        {skeletonArray.map((i) => (
          <Box key={i} css={styles.loaderWrapper}>
            <SkeletonLoader />
          </Box>
        ))}
      </>
    );

  if (isError) {
    return (
      <Alert severity="error" sx={{ marginTop: '10px' }}>
        Something went wrong
      </Alert>
    );
  }

  return <TaskList tasks={data} />;
};

export default App;
