import { Spin } from 'antd';
import "./SpinnerComponent.scss";

interface Iprops {
  children?: any;
  className?: string;
  size?: any;
  iconToRender?: any;
  spinningValue?: boolean;
  tipValue?: string;
}

function SpinnerComponent(props: Iprops) {
  const { className = '', children = null, size = "large", spinningValue, iconToRender, tipValue = " loading..." } = props;
  return (<Spin className={className} size={size} indicator={iconToRender} spinning={spinningValue} tip={tipValue}>{children}</Spin>);
}

export default SpinnerComponent;