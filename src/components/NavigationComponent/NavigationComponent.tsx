import { Button, Menu } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetClicked, setTourStatus, getSelectedPlanetData, getResultObject } from '../../features/cache/cacheSlice';
import { expandMenuIcon } from "../../utils/imageMapping";
import { NAVIGATION_BUTTONS_TEXT } from "../../utils/globalTypes";

function NavigationComponent(props: any) {
  const dispatch = useAppDispatch();
  let history = useHistory();

  let selectedPanelData = useAppSelector(getSelectedPlanetData);
  let selectedResultData = useAppSelector(getResultObject);

  function buttonClicked() {
    dispatch(resetClicked());
  }

  function checkStoreData(pathname: any) {
    let dataToStore = {};
    switch (pathname) {
      case '/':
      case 'dashboard':
        dataToStore = selectedPanelData;
        break;
      case '/result':
        dataToStore = selectedResultData;
        break;
    }
    return dataToStore
  }
  function planetClicked() {
    history.replace(location.pathname, { "storeData": checkStoreData(location.pathname) });
  }

  function vehicleClicked() {
    history.replace(location.pathname, { "storeData": checkStoreData(location.pathname) });
  }

  function showTour() {
    dispatch(setTourStatus(true));
  }

  const location: any = useLocation();

  return (
    <Menu mode="horizontal" triggerSubMenuAction={"click"} overflowedIndicator={expandMenuIcon} selectable={false}>
      {location && location.pathname !== '/' && location.pathname !== "/dashboard" ?
        <Menu.Item ><Link to="/dashboard"><Button className={location.pathname === "/dashboard" ? "selectedButton" : ''} shape={"round"} ghost={true} onClick={buttonClicked} key={"dashboard"}>{NAVIGATION_BUTTONS_TEXT[0]}</Button></Link></Menu.Item> :
        <Menu.Item ><Button shape={"round"} ghost={true} onClick={showTour} key={"startTour"}>{NAVIGATION_BUTTONS_TEXT[1]}</Button></Menu.Item>}
      <Menu.Item ><Link to="/planets" onClick={planetClicked}><Button className={`${location.pathname === "/planets" ? "selectedButton" : ''} planetsNavigationButton`} shape={"round"} ghost={true} key={"planets"}>{NAVIGATION_BUTTONS_TEXT[2]}</Button></Link></Menu.Item>
      <Menu.Item><Link to="/vehicles" onClick={vehicleClicked}><Button className={`${location.pathname === "/vehicles" ? "selectedButton" : ''} vehiclesNavigationButton`} shape={"round"} ghost={true} key={"vehicles"}>{NAVIGATION_BUTTONS_TEXT[3]}</Button></Link></Menu.Item>
    </Menu>
  )
}

export default NavigationComponent;