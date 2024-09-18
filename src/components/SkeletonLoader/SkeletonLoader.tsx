import { Skeleton, Box } from '@mui/material';
import { styles } from './SkeletonLoader.styles';

const SkeletonLoader = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="30px"
        height="25px"
        css={styles.skeletonStyle}
      />
      <Box css={styles.boxStyle}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="30px"
          css={styles.skeletonBottomStyle}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="15px"
        />
      </Box>
    </>
  );
};

export default SkeletonLoader;
