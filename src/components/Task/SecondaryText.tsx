import { SecondaryTextProps } from '@/types';
import { format } from 'date-fns';

const SecondaryText = ({
  isCompleted,
  completedDate,
  createdDate,
}: SecondaryTextProps) => {
  if (isCompleted) {
    return `Completed: ${format(new Date(completedDate), 'dd/MM/yy, HH:mm')}`;
  }

  return `Created: ${format(new Date(createdDate), 'dd/MM/yy, HH:mm')}`;
};

export default SecondaryText;
