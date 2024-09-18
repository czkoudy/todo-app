import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useIncompleteTaskMutation,
} from '../../features/apiSlice';
import { styles } from './Task.styles';
import { useEffect, useState } from 'react';
import { TaskProps } from '@/types';
import SecondaryText from './SecondaryText';

const Task = ({
  text,
  id,
  createdDate,
  completed,
  completedDate = null,
}: TaskProps) => {
  const [taskText, setTaskText] = useState(text);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsCompleted(completed);
    return () => {};
  }, [completed]);

  const handleDeleteTask = async () => {
    await deleteTask(id);
  };

  const toggleCompletion = () => {
    const action = isCompleted ? incompleteTask : completeTask;
    action(id);
    setIsCompleted(!isCompleted);
  };

  const handleEditTask = () => {
    editTask({ id, text: taskText });
    setIsEditable(false);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditTask();
  };

  const handleOnBlur = () => handleEditTask();

  const handleOnDoubleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (e.detail === 2) {
      setIsEditable(true);
    }
  };

  const handleOnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDeleteTask}
          sx={styles.deleteIconButton}
          disabled={isEditable}
        >
          <DeleteIcon />
        </IconButton>
      }
      css={styles.listItem}
      onDoubleClick={handleOnDoubleClick}
    >
      <ListItemAvatar>
        <Checkbox
          checked={isCompleted}
          color="primary"
          onChange={toggleCompletion}
          disabled={isEditable}
        />
      </ListItemAvatar>
      {isEditable ? (
        <TextField
          value={taskText}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnTextChange}
          onBlur={handleOnBlur}
          css={styles.editableTextField}
        />
      ) : (
        <ListItemText
          primary={text}
          secondary={
            <SecondaryText
              isCompleted={isCompleted}
              completedDate={completedDate}
              createdDate={createdDate}
            />
          }
          css={styles.listItemText(isCompleted)}
        />
      )}
    </ListItem>
  );
};

export default Task;
