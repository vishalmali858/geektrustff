import { Typography } from 'antd'
import SpaceComponent from './SpaceComponent/SpaceComponent';
import { FONT_COLOR_FOR_LABEL_COMPONENT } from '../utils/globalTypes';
const { Title } = Typography;

interface Iprops {
  headingLevel?: any;
  children?: any;
  color?: any;
  fontSizeValue?: any;
  showLine?: any;
  backgroundValue?: string;
  styleObjectValue?: any;
}

function LabelComponent(props: Iprops) {
  const { headingLevel, children, fontSizeValue = "2.6 rem", color = FONT_COLOR_FOR_LABEL_COMPONENT, showLine = false, styleObjectValue = {} } = props;
  return (<div className="labelComponent">
    <SpaceComponent styleObjectValue={styleObjectValue} size={showLine ? 2 : undefined } direction="vertical">
      <Title style={{ fontSize: fontSizeValue, color: color }} level={headingLevel}>{children}</Title>
      {showLine ? <div className="lineBelowText" /> : null}
    </SpaceComponent>
  </div>);
}

export default LabelComponent