import { List } from 'antd';
import "./ListComponent.scss";
import SkeletonComponent from '../SkeletonComponent/SkeletonComponent';

interface Iprops {
  children?: any;
  gridValues?: any;
  componentToRender?: any;
  itemLayout?: any;
  headerToRender?: any
  footerToRender?: any;
  hasBorder?: any;
  isLoading?: any;
  addListInMeta?: boolean;
}

function ListComponent(props: Iprops) {
  const { hasBorder = true, addListInMeta = false, gridValues, componentToRender, children, headerToRender, footerToRender, itemLayout = "horizontal", isLoading = false } = props;
  return (
    <List
      itemLayout={itemLayout}
      grid={gridValues}
      split={false}
      header={headerToRender}
      footer={footerToRender}
      bordered={hasBorder}
      dataSource={componentToRender}
      locale={{
        emptyText: <SkeletonComponent avatarValue={true} isLoading={isLoading}></SkeletonComponent>
      }}
      renderItem={(item: any) => (
        <SkeletonComponent isLoading={isLoading}>
          {addListInMeta ? <List.Item.Meta {...item} /> : <List.Item>{item} </List.Item>}
        </SkeletonComponent>
      )}
    >
      {children}
    </List>
  );
}

export default ListComponent;