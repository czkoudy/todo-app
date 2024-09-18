export type TaskProps = {
  completed: boolean;
  completedDate?: number;
  createdDate: number;
  id: string;
  text: string;
};

export type TaskListProps = {
  tasks: TaskProps[];
};

export type SecondaryTextProps = {
  completedDate?: number;
  createdDate: number;
  isCompleted: boolean;
};
