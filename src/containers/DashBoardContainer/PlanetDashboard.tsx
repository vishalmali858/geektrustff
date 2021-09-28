import { useHistory, useLocation } from 'react-router-dom';
import { FOOTER_BUTTON_ICON } from "../../utils/imageMapping";
import { getCardDefaultGridAttribute, destinationDataArray, FOOTER_BUTTON_TEXT, MAIN_PAGE_SELECT_PLANET_TEXT } from "../../utils/globalTypes";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllVehiclesData, setCounterTime, getSelectedPlanetData, getAllPlanetsData, asyncLoadToken, asyncFindFalcone, resetClicked, setDestinationObject } from '../../features/cache/cacheSlice';
import { getSelectedPlanetAndVehicle, passPlanetDataAndVehicleData, getArrayToSendForFindingFalcone } from "../DashBoardContainer/DashBoardHelper";
import PlanetSelectionSummaryContainer from '../PlanetSelectionSummaryContainer/PlanetSelectionSummaryContainer';
import SpaceComponent from "../../components/SpaceComponent/SpaceComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import LabelComponent from "../../components/LabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TimerComponent from '../../components/TimerComponent/TimerComponent';
import { LoaderStatusService } from '../../components/SpinnerComponent/LoaderStatusService';

function PlanetDashboard() {
  let history = useHistory();
  let location: any = useLocation();
  const { showLoading, hideLoading } = LoaderStatusService();

  const dispatch = useAppDispatch();

  function populateButtonClicked() {
    let desObj: any = {};
    function shuffleArray(array: any) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    let a: any = [];
    let updatedVData: any = [];
    for (let p = 0; p < planetsData.length; p++) {
      a.push(p);
    }
    for (let v = 0; v < vehcileData.length; v++) {
      updatedVData.push({
        ...vehcileData[v],
        currentCounter: vehcileData[v].total_no
      });
    }
    updatedVData = updatedVData.sort(function (a: any, b: any) { return b.max_distance - a.max_distance });
    shuffleArray(a);
    a.splice(3, 2);
    let unSortedArray = [...a];
    let desVehicleDataPlanetWise: any = [];
    a = a.sort(function (a: any, b: any) { return b - a });
    a.forEach(function (index: any) {
      let vFound = updatedVData.find(function (abc: any) {
        return abc.max_distance >= planetsData[index].distance && abc.currentCounter !== 0
      });
      if (vFound) {
        vFound.currentCounter--;
        desVehicleDataPlanetWise[unSortedArray.indexOf(index)] = vFound;
      }
    });
    for (let i = 0; i < destinationDataArray.length; i++) {
      desObj["des_" + i] = {};
      desObj["des_" + i].planetDetails = planetsData[unSortedArray[i]];
      desObj["des_" + i].vehiclesDetails = desVehicleDataPlanetWise[i];
    }
    updatedVData = updatedVData.sort(function (a: any, b: any) { return a.max_distance - b.max_distance });
    dispatch(setDestinationObject({
      desObject: desObj,
      vehcileData: updatedVData
    }));
  }

  // after clicking Find Falcone Button
  async function buttonClicked(event: any) {
    showLoading();
    const tokenData: any = await dispatch(asyncLoadToken());
    let tokenString = tokenData.payload.token;
    let objectToSend = getArrayToSendForFindingFalcone(tokenString, selectedSegregatedData);
    await dispatch(asyncFindFalcone(objectToSend));
    dispatch(setCounterTime(planetAndVehicleDetails.timeCounter));
    history.replace(location.pathname, { "storeData": selectedPanelData });
    hideLoading();
    history.push('/result');
  }

  // after clicking reset button
  function resetButtonClicked(event: any) {
    history.replace(location.pathname, { "storeData": {} });
    dispatch(resetClicked());
  }

  const vehcileData = useAppSelector(getAllVehiclesData);
  const planetsData = useAppSelector(getAllPlanetsData);
  let selectedPanelData = useAppSelector(getSelectedPlanetData);
  selectedPanelData = location.state && location.state.hasOwnProperty("storeData") && location.state.storeData && Object.keys(location.state.storeData).length ? location.state.storeData : selectedPanelData;

  const selectedSegregatedData = getSelectedPlanetAndVehicle(selectedPanelData);
  let planetAndVehicleDetails = passPlanetDataAndVehicleData({ destinationDataArray, selectedSegregatedData, vehcileData, planetsData });

  let findButtonEnable = planetAndVehicleDetails.destinationDataArray.every((destinationDetail: any) => {
    return destinationDetail.vehicleIcon !== null
  });
  return (
    <div className="mainDashboardContainer">
      <SpaceComponent direction="vertical">
        <TimerComponent showInScroll={true} timerCounterValue={planetAndVehicleDetails.timeCounter} />
        <LabelComponent headingLevel={3}>{MAIN_PAGE_SELECT_PLANET_TEXT}</LabelComponent>
      </SpaceComponent>
      <CardComponent
        dataSource={planetAndVehicleDetails.destinationDataArray}
        gridValues={getCardDefaultGridAttribute}
        loadingSkeleton={!Object.keys(planetsData).length ? true : false}
        showLoadingSkeletonOfList={false}
      />
      <PlanetSelectionSummaryContainer selectedPanelData={selectedPanelData} />
      <SpaceComponent direction="vertical" className={"dashboardButtonContainer"}>
        <ButtonComponent sizeValue={findButtonEnable ? "large" : undefined} loadingValue={!findButtonEnable} className={"forthStep"} disabledValue={!findButtonEnable} onClickFunction={buttonClicked} iconToRender={FOOTER_BUTTON_ICON[0].iconToRender} key={FOOTER_BUTTON_TEXT[0].text}>{FOOTER_BUTTON_TEXT[0].text}</ButtonComponent>
        <SpaceComponent>
          <ButtonComponent onClickFunction={resetButtonClicked} iconToRender={FOOTER_BUTTON_ICON[1].iconToRender} key={FOOTER_BUTTON_TEXT[1].text}>{FOOTER_BUTTON_TEXT[1].text}</ButtonComponent>
          {Object.keys(planetsData).length ? <ButtonComponent onClickFunction={populateButtonClicked} iconToRender={FOOTER_BUTTON_ICON[2].iconToRender} key={FOOTER_BUTTON_TEXT[2].text}>{FOOTER_BUTTON_TEXT[2].text}</ButtonComponent> : null}
        </SpaceComponent>
      </SpaceComponent>
    </div>);
}

export default PlanetDashboard