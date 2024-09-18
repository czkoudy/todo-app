import Grid from '@mui/material/Grid2';
import { Alert, Button, List } from '@mui/material';
import Task from '../Task/Task';
import { styles } from './TaskList.styles';
import { useMemo } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  useCompleteAllTasksMutation,
  useDeleteAllCompletedTasksMutation,
} from '@/features/apiSlice';
import { TaskListProps } from '@/types';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useAppSelector } from '@/redux/hooks';

const TaskList = ({ tasks }: TaskListProps) => {
  const { filterBy } = useAppSelector((state) => state.filter);
  const [deleteAllCompletedTasks] = useDeleteAllCompletedTasksMutation();
  const [completeAllTasks] = useCompleteAllTasksMutation();
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filterBy === 'completed') {
          return task.completed;
        } else if (filterBy === 'incomplete') {
          return !task.completed;
        }
        return true;
      }),
    [filterBy, tasks]
  );
  const completedTask = filteredTasks.filter((task) => task.completed);

  const remainingTask = filteredTasks.filter((task) => !task.completed);

  const handleOnDeleteAll = async () => {
    await deleteAllCompletedTasks();
  };

  const handleOnCompleteAll = async () => {
    await completeAllTasks(tasks);
  };

  const getTaskText = (count: number) => `${count} task${count > 1 ? 's' : ''}`;

  const completedText = getTaskText(completedTask.length);
  const totalText = getTaskText(filteredTasks.length);

  return (
    <Grid css={styles.wrapper}>
      <List>
        {filteredTasks.length === 0 && (
          <Alert css={styles.alert}>No tasks were found!</Alert>
        )}
        {remainingTask.length > 0 && (
          <Alert
            severity="warning"
            css={styles.alert}
            action={
              <Button
                variant="contained"
                color="warning"
                size="small"
                css={styles.alertButton}
                onClick={handleOnCompleteAll}
              >
                <DoneAllIcon /> Complete all tasks
              </Button>
            }
          >
            {remainingTask.length} tasks left to sort out!
          </Alert>
        )}
        {completedTask.length > 0 && (
          <Alert
            css={styles.alert}
            action={
              <Button
                variant="contained"
                size="small"
                css={styles.alertButton}
                onClick={handleOnDeleteAll}
              >
                <DeleteForeverIcon /> Delete All Completed
              </Button>
            }
          >
            {completedText} <span css={styles.boldText}>completed</span> out of{' '}
            {totalText}!
          </Alert>
        )}
        {filteredTasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </List>
    </Grid>
  );
};

export default TaskList;
