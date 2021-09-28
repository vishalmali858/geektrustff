import { Drawer } from 'antd';
import "./DrawerComponent.scss";

interface Iprops {
  openDrawer?: any;
  titleDrawer?: any;
  onCloseClick?: Function;
  children?: any;
  closedIconForDrawer ?: any;
}

function DrawerComponent(props: Iprops) {
  const { openDrawer = false, titleDrawer = "Drawer", onCloseClick, children = null, closedIconForDrawer = null } = props;
  return (
    <Drawer
      closeIcon={closedIconForDrawer}
      title={titleDrawer}
      placement="top"
      onClose={() => {
        onCloseClick && onCloseClick();
      }}
      height={window.innerHeight}
      visible={openDrawer}
    >
      {children}
    </Drawer>)
}

export default DrawerComponent;