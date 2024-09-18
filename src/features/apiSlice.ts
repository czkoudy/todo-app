import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tasksSchema } from './api.schema';
import { TaskProps } from '@/types';

export const tasksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  endpoints: (builder) => ({
    addTask: builder.mutation<TaskProps, Partial<TaskProps>>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const newTask = await baseQuery({
          body: arg,
          method: 'POST',
          url: 'tasks',
        });

        if (newTask.data) {
          api.dispatch(
            tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
              draft.unshift(newTask.data as TaskProps);
            })
          );
        }

        return { data: null };
      },
    }),
    completeAllTasks: builder.mutation<void, TaskProps[]>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const allTasks = arg;
        const incompleteTasks = allTasks.filter((task) => !task.completed);

        const completePromises = incompleteTasks.map((task) =>
          baseQuery({
            method: 'POST',
            url: `tasks/${task.id}/complete`,
          })
        );
        const completeResults = await Promise.all(completePromises);
        const errors = completeResults.filter((res) => res.error);

        if (errors.length > 0) {
          return { error: errors[0].error };
        }

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            draft.forEach((task) => {
              task.completed = true;
            });
          })
        );

        return { data: null };
      },
    }),
    completeTask: builder.mutation<TaskProps, TaskProps['id']>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          method: 'POST',
          url: `tasks/${arg}/complete`,
        });

        if (result.error) return { error: result.error };

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === arg);
            draft[taskIndex].completed = true;
            draft[taskIndex].completedDate = (
              result.data as TaskProps
            ).completedDate;
          })
        );

        return { data: null };
      },
    }),
    deleteAllCompletedTasks: builder.mutation<void, void>({
      queryFn: async (_arg, api, _extraOptions, baseQuery) => {
        const result = await baseQuery('tasks/completed');

        if (result.error) return { error: result.error };

        const completedTasks = result.data as TaskProps[];

        const deletePromises = completedTasks.map((task) =>
          baseQuery({
            method: 'DELETE',
            url: `tasks/${task.id}`,
          })
        );
        const deleteResults = await Promise.all(deletePromises);
        const errors = deleteResults.filter((res) => res.error);
        if (errors.length > 0) {
          return { error: errors[0].error };
        }

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            return draft.filter((task: TaskProps) => !task.completed);
          })
        );

        return { data: null };
      },
    }),
    deleteTask: builder.mutation<string, TaskProps['id']>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          method: 'DELETE',
          url: `tasks/${arg}`,
        });

        if (result.error) return { error: result.error };

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === arg);
            draft.splice(taskIndex, 1);
          })
        );

        return { data: null };
      },
    }),
    editTask: builder.mutation<TaskProps, Partial<TaskProps>>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          body: { text: arg.text },
          method: 'POST',
          url: `tasks/${arg.id}`,
        });

        if (result.error) return { error: result.error };

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === arg.id);
            draft[taskIndex].text = arg.text;
          })
        );

        return { data: null };
      },
    }),
    getAllTasks: builder.query<TaskProps[], void>({
      providesTags: ['Task'],
      query: () => 'tasks',
      transformResponse: (response): TaskProps[] => {
        const parsedResponse = tasksSchema.parse(response);
        return parsedResponse as TaskProps[];
      },
    }),
    incompleteTask: builder.mutation<TaskProps, TaskProps['id']>({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          method: 'POST',
          url: `tasks/${arg}/incomplete`,
        });

        if (result.error) return { error: result.error };

        api.dispatch(
          tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === arg);
            draft[taskIndex].completed = false;
            delete draft[taskIndex].completedDate;
          })
        );

        return { data: null };
      },
    }),
  }),
  reducerPath: 'tasksApi',
  tagTypes: ['Task'],
});

export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
  useDeleteAllCompletedTasksMutation,
  useCompleteAllTasksMutation,
  useEditTaskMutation,
} = tasksApi;
