import { Avatar } from 'antd';

interface Iprops {
  children?: any;
  className?: string;
  shape?: any;
  size?: any;
  alt?: string;
  icon?: any;
}

function AvatarComponent(props: Iprops) {
  const { children = null, className = '', shape = "square", alt = '', icon = null, size = 230 } = props;
  return (
    <Avatar className={className} shape={shape} alt={alt} icon={icon} size={size}>{children}</Avatar>);
}

export default AvatarComponent;