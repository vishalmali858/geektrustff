import { Skeleton } from 'antd';

interface Iprops {
  children?: any;
  isLoading?: boolean;
  activeAnimation?: boolean;
  avatarValue?: boolean;
  uniqueKey?: string;
}

function SkeletonComponent(props: Iprops) {
  const { isLoading = false, children = null, activeAnimation = true, avatarValue = false, uniqueKey = undefined } = props;
  return (<Skeleton loading={isLoading} active={activeAnimation} round={true} avatar={avatarValue} key={uniqueKey}>{children}</Skeleton>);
}

export default SkeletonComponent;