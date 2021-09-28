import { Badge } from 'antd';
import "./BadgeComponent.scss";

interface Iprops {
  children?: any;
  text?: any;
  badgeCSSProperty?: any;
  placement?: any;
  className?: string;
  color?: string;
  badgeRibbon?: boolean;
  showZeroValue?: boolean;
  overflowCountValue?: number;
}

function BadgeComponent(props: Iprops) {
  const { badgeRibbon = false, children = null, className = "", color = "transparent", placement = "start", text = "This is Badge Component !", showZeroValue = false, badgeCSSProperty = {}, overflowCountValue = 100000000 } = props;
  return (badgeRibbon ? <Badge.Ribbon
    className={className}
    color={color}
    placement={placement}
    text={text}
  >
    {children}
  </Badge.Ribbon> : <Badge className={className} overflowCount={overflowCountValue} style={badgeCSSProperty} count={text} showZero={showZeroValue}>{children}</Badge>)
}

export default BadgeComponent;