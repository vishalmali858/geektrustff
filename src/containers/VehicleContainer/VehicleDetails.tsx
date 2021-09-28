import { useAppSelector } from '../../app/hooks';
import { getAllVehiclesData } from '../../features/cache/cacheSlice';
import { vehicleMapping90Size } from "../../utils/imageMapping";
import { VEHICLES_DETAILS_ATTRIBUTE_TEXT, UNIT_VALUE_ARRAY, VEHICLES_PAGE_TEXT } from "../../utils/globalTypes";
import "./VehicleDetails.scss";
import LayoutDetailsHOCComponent from '../../utils/LayoutDetailsHOCComponent';
import MultipleCardWithBadgeComponent from '../../components/MultipleCardWithBadgeComponent';
import React from 'react';

function VehicleDetails() {
  const vehiclesData = useAppSelector(getAllVehiclesData);

  let dataSourceToSend = vehiclesData.map((vehicleData: any, vehicleIndex: number) => {
    return {
      uniqueKey: vehicleData.name + vehicleIndex,
      metaTitle: vehicleData.name,
      widthValue: "230px",
      coverValue: {
        altValue: vehiclesData.name,
        iconValue: vehicleMapping90Size[vehicleData.name]
      },
      uniqueKeyForList: "vehicleSkeletonFragment",
      uniqueKeyForDescriptionList: "vehiclesInnerDetails",
      descriptionArray: [
        {
          badgeText: `${vehicleData.max_distance} ${UNIT_VALUE_ARRAY[0]}`,
          cardDescription: VEHICLES_DETAILS_ATTRIBUTE_TEXT[0],
        },
        {
          badgeText: vehicleData.total_no,
          cardDescription: VEHICLES_DETAILS_ATTRIBUTE_TEXT[1],
        },
        {
          badgeText: `${vehicleData.speed} ${UNIT_VALUE_ARRAY[1]}`,
          cardDescription: VEHICLES_DETAILS_ATTRIBUTE_TEXT[2],
        },
      ]
    }
  });

  let propsToBePassed = {
    loadingSkeleton: vehiclesData.length ? false : true,
    skeletonCount: 4,
    cardMainHeaderText: VEHICLES_PAGE_TEXT,
    dataSource: dataSourceToSend,
    uniqueClassName: "vehicleDetails"
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

export default React.memo(VehicleDetails, propsAreEqual);