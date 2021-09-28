import { destinationDataArray, stepSideBarData, WAIT_STATE_VALUE, PROCESS_STATE_VALUE, FINISH_STATE_VALUE, SELECTED_PLANET_DATA_SIDEBAR, UNIT_VALUE_ARRAY_SHORTFORM } from "../../utils/globalTypes";
import { rocketIconConfig } from "../../utils/imageMapping";
import SpaceComponent from "../SpaceComponent/SpaceComponent";
import LabelComponent from "../LabelComponent";
const stepSelectionStateArray: any =
    [
        {
            "status": WAIT_STATE_VALUE,
            "icon": rocketIconConfig[WAIT_STATE_VALUE],
            "description": stepSideBarData.CHOOSE_SPACE_VEHICLE,
            "title": stepSideBarData.CHOOSE_PLANET,
        },
        {
            "status": PROCESS_STATE_VALUE,
            "icon": rocketIconConfig[PROCESS_STATE_VALUE],
            "description": stepSideBarData.CHOOSE_SPACE_VEHICLE,
            "title": stepSideBarData.CHOOSE_PLANET,
        },
        {
            "status": FINISH_STATE_VALUE,
            "icon": rocketIconConfig[FINISH_STATE_VALUE],
            "description": stepSideBarData.CHOOSE_SPACE_VEHICLE,
            "title": stepSideBarData.CHOOSE_PLANET,
        }
    ];

export function createStepDataForPlanet(dataFetchedFromState: any) {
    let stepArrayToBeSent: any = [];
    if (dataFetchedFromState) {
        Object.keys(dataFetchedFromState).forEach(function (uniqueKey: string) {
            let objectToBePushed: any = {
                // Wait State
                ...stepSelectionStateArray[0]
            }
            if (dataFetchedFromState[uniqueKey]) {
                objectToBePushed = (dataFetchedFromState[uniqueKey].planetDetails && dataFetchedFromState[uniqueKey].vehiclesDetails) ? { ...stepSelectionStateArray[2] } : { ...stepSelectionStateArray[1] };
            }
            objectToBePushed.title = (dataFetchedFromState[uniqueKey] && dataFetchedFromState[uniqueKey].planetDetails && dataFetchedFromState[uniqueKey].planetDetails.name) || objectToBePushed.title;
            objectToBePushed.subTitle = (dataFetchedFromState[uniqueKey] && dataFetchedFromState[uniqueKey].vehiclesDetails && dataFetchedFromState[uniqueKey].vehiclesDetails.name) || objectToBePushed.subTitle;
            if (dataFetchedFromState[uniqueKey] && dataFetchedFromState[uniqueKey].vehiclesDetails && dataFetchedFromState[uniqueKey].vehiclesDetails.speed) {
                let des = <SpaceComponent direction={"vertical"}>
                    <SpaceComponent>
                        <LabelComponent fontSizeValue={"14px"} >{SELECTED_PLANET_DATA_SIDEBAR[0]}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{dataFetchedFromState[uniqueKey].planetDetails.distance}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{UNIT_VALUE_ARRAY_SHORTFORM[0]}</LabelComponent>
                    </SpaceComponent>
                    <SpaceComponent>
                        <LabelComponent fontSizeValue={"14px"} >{SELECTED_PLANET_DATA_SIDEBAR[1]}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{dataFetchedFromState[uniqueKey].vehiclesDetails.speed}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{UNIT_VALUE_ARRAY_SHORTFORM[1]}</LabelComponent>
                    </SpaceComponent>
                    <SpaceComponent>
                        <LabelComponent fontSizeValue={"14px"} >{SELECTED_PLANET_DATA_SIDEBAR[2]}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{dataFetchedFromState[uniqueKey].planetDetails.distance / dataFetchedFromState[uniqueKey].vehiclesDetails.speed}</LabelComponent>
                        <LabelComponent fontSizeValue={"14px"} >{UNIT_VALUE_ARRAY_SHORTFORM[2]}</LabelComponent>
                    </SpaceComponent>
                </SpaceComponent>
                objectToBePushed.description = des;
            }
            stepArrayToBeSent.push(objectToBePushed);
        });
    }
    if (destinationDataArray.length !== stepArrayToBeSent.length) {
        for (let v = stepArrayToBeSent.length; v < destinationDataArray.length; v++) {
            let objectToBePushed: any = {
                ...stepSelectionStateArray[0]
            }
            stepArrayToBeSent.push(objectToBePushed);
        }
    }
    return stepArrayToBeSent
}