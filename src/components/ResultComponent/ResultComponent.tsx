import { Result } from 'antd';
import { errorCodeObject } from "../../utils/globalTypes";

interface Iprops {
  children?: any;
  className?: any;
  status?: any;
  title?: any;
  subTitle?: any;
  extra?: any;
  icon?: any;
}

function ResultComponent(props: Iprops) {
  const { children = null, className = '', extra = null, icon = null } = props;
  let { status = "404", title = '404', subTitle = '' } = props;
  switch (status) {
    case "403":
    case "500":
      let statusObject403 = errorCodeObject[status];
      status = statusObject403.status;
      title = title ? title : statusObject403.title;
      subTitle = subTitle ? subTitle : statusObject403.subTitle;
      break;
    case "success":
    case "warning":
    case "error":
    case "info":
      break;
    case "404":
    default:
      let statusObject404 = errorCodeObject["404"];
      title = title ? title : status;
      status = statusObject404.status;
      subTitle = subTitle ? subTitle : statusObject404.subTitle;
      break;
  }
  return (
    <Result className={className} status={status} title={title} subTitle={subTitle} icon={icon} extra={extra}>{children}</Result>);
}

export default ResultComponent;