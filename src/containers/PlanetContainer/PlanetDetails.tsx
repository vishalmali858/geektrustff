import { useAppSelector } from '../../app/hooks';
import { getAllPlanetsData } from '../../features/cache/cacheSlice';
import { planetMapping90Size } from "../../utils/imageMapping";
import "./PlanetDetails.scss";
import { PLANETS_DETAILS_ATTRIBUTE_TEXT, UNIT_VALUE_ARRAY, PLANETS_PAGE_TEXT } from "../../utils/globalTypes";
import LayoutDetailsHOCComponent from '../../utils/LayoutDetailsHOCComponent';
import MultipleCardWithBadgeComponent from '../../components/MultipleCardWithBadgeComponent';
import React from 'react';

function PlanetDetails() {
  const planetsData = useAppSelector(getAllPlanetsData);

  let dataSourceToSend = planetsData.map((planetData: any, vehicleIndex: number) => {
    return {
      uniqueKey: planetData.name + vehicleIndex,
      metaTitle: planetData.name,
      widthValue: "230px",
      coverValue: {
        altValue: planetData.name,
        iconValue: planetMapping90Size[planetData.name]
      },
      uniqueKeyForList: planetsData.length ? "planetFragment" : "planetSkeletonFragment",
      uniqueKeyForDescriptionList: "planetInnerDetails",
      descriptionArray: [
        {
          badgeText: `${planetData.distance} ${UNIT_VALUE_ARRAY[0]}`,
          cardDescription: PLANETS_DETAILS_ATTRIBUTE_TEXT[0],
        }
      ]
    }
  });

  let propsToBePassed = {
    loadingSkeleton: planetsData.length ? false : true,
    skeletonCount: 6,
    cardMainHeaderText: PLANETS_PAGE_TEXT,
    dataSource: dataSourceToSend,
    uniqueClassName: "planetDetails"
  };

  return (LayoutDetailsHOCComponent(MultipleCardWithBadgeComponent, propsToBePassed));
}

function propsAreEqual(prevProps: any, nextProps: any) {
  let returnFlag = false;
  if (prevProps.location && prevProps.location.pathname && nextProps.location && nextProps.location.pathname && prevProps.location.pathname === nextProps.location.pathname) {
    returnFlag = true;
  }
  return returnFlag
}

export default React.memo(PlanetDetails, propsAreEqual);