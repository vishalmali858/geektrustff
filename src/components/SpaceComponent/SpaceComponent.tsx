import { Space } from 'antd';

interface Iprops {
  direction?: any;
  children?: any;
  className?: any;
  size?: any;
  alignValue?: any;
  uniqueKey?: string;
  styleObjectValue?: any;
}

function SpaceComponent(props: Iprops) {
  const { direction = "horizontal", children = null, className = '', size, alignValue = undefined, uniqueKey = undefined, styleObjectValue = {} } = props;
  return (
    <Space className={className} direction={direction} size={size} align={alignValue} style={{ ...styleObjectValue }} key={uniqueKey}>{children}</Space>);
}

export default SpaceComponent;