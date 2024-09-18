import { setFilterBy } from '@/features/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Box, Button, Typography } from '@mui/material';

const FilterTasks = () => {
  const { filterBy } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" component="h2">
        Filter Tasks
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(setFilterBy('completed'))}
          disabled={filterBy === 'completed'}
        >
          Completed
        </Button>
        |
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(setFilterBy('incomplete'))}
          disabled={filterBy === 'incomplete'}
        >
          Incomplete
        </Button>
        |
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(setFilterBy(undefined))}
          disabled={filterBy === undefined}
        >
          All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterTasks;
