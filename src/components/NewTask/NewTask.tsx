import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAddTaskMutation } from '@/features/apiSlice';
import { styles } from './NewTask.styles';
import { z } from 'zod';

const newTaskSchema = z.string().min(1);

const NewTask = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState(null);
  const [addTask] = useAddTaskMutation();

  const validateTask = (task: string) => {
    const parseResult = newTaskSchema.safeParse(task);
    if (parseResult.success) {
      setError(null);
      return true;
    } else {
      setError(parseResult.error.issues[0].message);
      return false;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = e.target.value;
    setTask(newTask);
    if (newTask.trim() !== '') {
      validateTask(newTask);
    } else {
      setError(null);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && validateTask(task)) {
      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    try {
      await addTask({ text: task });
      setTask('');
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };
  return (
    <TextField
      value={task}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      css={styles.newTaskInput}
      placeholder="What needs to be done?"
      helperText={error ? error : ''}
      error={!!error}
    />
  );
};

export default NewTask;
