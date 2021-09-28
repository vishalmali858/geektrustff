import { Tabs } from 'antd';
import SkeletonComponent from '../SkeletonComponent/SkeletonComponent';
import "./TabComponent.scss";
const { TabPane } = Tabs;

interface Iprops {
  defaultActiveKeyValue?: any
  tabPositionValue?: any;
  tabPaneToRender?: any;
  className?: string;
  loadingSkeleton?: any;
}

function TabComponent(props: Iprops) {
  const { defaultActiveKeyValue = "0", tabPositionValue = "top", tabPaneToRender = null, className = '', loadingSkeleton = false } = props;
  const tabPaneComponent = tabPaneToRender && tabPaneToRender.map((tabPaneData: any) => {
    const { children = null, key, tabName } = tabPaneData;
    return <TabPane tab={tabName} key={key}>{children}</TabPane>
  })
  return (<SkeletonComponent isLoading={loadingSkeleton}><Tabs animated={{ inkBar: true, tabPane: true }} centered={true} className={className} defaultActiveKey={defaultActiveKeyValue} tabPosition={tabPositionValue}>{tabPaneComponent}</Tabs></SkeletonComponent>);
}

export default TabComponent;