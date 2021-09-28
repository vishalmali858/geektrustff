import { Card } from 'antd';
import BadgeComponent from '../BadgeComponent/BadgeComponent';
import ListComponent from '../ListComponent/ListComponent';
import SkeletonComponent from '../SkeletonComponent/SkeletonComponent';
import React from 'react';
import "./CardComponent.scss";

const { Meta } = Card;
interface Iprops {
  dataSource: any;
  gridValues?: any;
  loadingSkeleton?: boolean;
  borderValue?: boolean;
  className?: string;
  addCardInList?: boolean;
  avatarValue?: any;
  showLoadingSkeletonOfList?: boolean;
}

function CardComponent(props: Iprops) {
  const { showLoadingSkeletonOfList = false, gridValues, dataSource, loadingSkeleton = false, borderValue = false, className = '', addCardInList = true, avatarValue = false } = props;

  // Creating Ribbon inside Ribbon and at the end the card component
  const getRibbonComponent = (rDataArray: any, lastCardComponent: any, rIndex: number) => {
    const rData = rDataArray[rIndex];
    rIndex = rIndex + 1;
    return (<BadgeComponent
      className={rData.className}
      text={rData.text}
      placement={rData.placement}
      badgeRibbon={rData.badgeRibbon}
    >
      {rIndex === rDataArray.length ? lastCardComponent : getRibbonComponent(rDataArray, lastCardComponent, rIndex)}
    </BadgeComponent>)
  }

  let componentToRender = null;
  if (dataSource && dataSource.length) {
    componentToRender = dataSource.map(function (destDetails: any) {
      const { title = '', uniqueKey = undefined, size = "small", description = '', className = '', cardRibbonArray = [], hovered = true, cover = null, metaTitle = '', widthValue = '' } = destDetails;
      let cardRibbonComponent: any = null;
      let cardComponent = (<React.Fragment key={`${uniqueKey}cardfragment`}>
        <SkeletonComponent uniqueKey={`skeleton${uniqueKey}`} avatarValue={avatarValue} isLoading={addCardInList ? false : loadingSkeleton}>
          <Card loading={loadingSkeleton} key={uniqueKey} hoverable={hovered} title={title} className={className} style={{ "width": widthValue }} bordered={borderValue} size={size} cover={cover}>
            <Meta
              key={uniqueKey + "meta"}
              title={metaTitle}
              description={description}
            />
          </Card>
        </SkeletonComponent></React.Fragment>);

      if (cardRibbonArray && cardRibbonArray.length) {
        cardRibbonComponent = getRibbonComponent(cardRibbonArray, cardComponent, 0);
      }
      return cardRibbonComponent ? cardRibbonComponent : cardComponent;
    });
  }
  return (addCardInList ? (<div className={`${className} cardComponent`}>
    <ListComponent
      hasBorder={borderValue}
      gridValues={gridValues}
      componentToRender={componentToRender}
      isLoading={showLoadingSkeletonOfList}
    />
  </div>) : componentToRender
  );
}

export default CardComponent;