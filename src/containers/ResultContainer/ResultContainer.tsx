import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getResultObject, resetClicked, getTimerCounter } from '../../features/cache/cacheSlice';
import { planetMapping90Size, FOOTER_BUTTON_ICON, MESSAGE_ICON } from "../../utils/imageMapping";
import { SUCCESS_MESSAGE_TEXT, FAILED_MESSAGE_TEXT, PLANET_FOUND_TEXT, ERROR_MESSAGE_TEXT, ERROR404_TEXT, NAVIGATE_TO_DASHBOARD } from "../../utils/globalTypes";
import ResultComponent from '../../components/ResultComponent/ResultComponent';
import LabelComponent from "../../components/LabelComponent";
import SpaceComponent from '../../components/SpaceComponent/SpaceComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import TimerComponent from '../../components/TimerComponent/TimerComponent';
import { Link, useLocation, useHistory } from 'react-router-dom';
import "./ResultContainer.scss";

function ResultContainer() {
  const dispatch = useAppDispatch();
  let history = useHistory();
  let location: any = useLocation();
  function buttonClicked() {
    dispatch(resetClicked());
    history.replace(location.pathname, { "storeData": resultData });
    history.push('/dashboard');
  }

  function getSubTitleForResult(planetName: any, timerCounter: any) {
    return (<LabelComponent headingLevel={3}>
      <br />
      <SpaceComponent direction={"vertical"} size={25}>
        <LabelComponent headingLevel={3}>{PLANET_FOUND_TEXT}</LabelComponent>
        {planetMapping90Size[planetName]}
        <LabelComponent showLine={true} headingLevel={3}>{planetName}</LabelComponent>
        <TimerComponent timerCounterValue={timerCounter} />
      </SpaceComponent>
    </LabelComponent>)
  }

  function getButtonToRender(text: any, buttonIcon: any) {
    return (<SpaceComponent direction="vertical">
      <Link to="/dashboard">
        <ButtonComponent iconToRender={buttonIcon} onClickFunction={buttonClicked} key={text}>{text}</ButtonComponent>
      </Link>
    </SpaceComponent>)
  }

  let resultData = useAppSelector(getResultObject);
  resultData = location.state && location.state.hasOwnProperty("storeData") ? location.state.storeData : resultData;
  let timerCounter = useAppSelector(getTimerCounter);
  let planetName = (resultData && resultData.planet_name) || '';

  const resultObject = {
    "pass": {
      resultTitle: SUCCESS_MESSAGE_TEXT,
      resultStatus: "success",
      resultIcon: MESSAGE_ICON[0],
      resultSubTitle: planetName !== '' && getSubTitleForResult(planetName, timerCounter),
      buttonExtraProps: getButtonToRender("Start Again", FOOTER_BUTTON_ICON[1].iconToRender)
    },
    "fail": {
      resultTitle: FAILED_MESSAGE_TEXT,
      resultStatus: "error",
      resultIcon: MESSAGE_ICON[1],
      resultSubTitle: null,
      buttonExtraProps: getButtonToRender("Start Again", FOOTER_BUTTON_ICON[1].iconToRender)
    },
    "error": {
      resultTitle: ERROR_MESSAGE_TEXT,
      resultStatus: "warning",
      resultIcon: null,
      resultSubTitle: NAVIGATE_TO_DASHBOARD,
      buttonExtraProps: getButtonToRender("Dashboard", FOOTER_BUTTON_ICON[1].iconToRender)
    },
    "errorSpam": {
      resultTitle: ERROR404_TEXT,
      resultStatus: "404",
      resultIcon: null,
      resultSubTitle: NAVIGATE_TO_DASHBOARD,
      buttonExtraProps: getButtonToRender("Dashboard", FOOTER_BUTTON_ICON[1].iconToRender)
    }
  }

  let resultStatusObjectValue: any = !timerCounter ? resultObject.errorSpam : resultObject.error;
  if (resultData && Object.keys(resultData).length) {
    if (resultData.hasOwnProperty("status")) {
      resultStatusObjectValue = resultData.status === "success" ? resultObject.pass : resultObject.fail;
    } else if (resultData.hasOwnProperty("error")) {
      resultStatusObjectValue = resultObject.error;
    }
  }
  const { resultTitle, resultStatus, resultIcon, resultSubTitle, buttonExtraProps } = resultStatusObjectValue;

  return (<div className="resultContainer">
    {<ResultComponent
      status={resultStatus}
      icon={resultIcon}
      title={<LabelComponent headingLevel={3}>{resultTitle}</LabelComponent>}
      subTitle={<LabelComponent headingLevel={5}>{resultSubTitle}</LabelComponent>}
      extra={buttonExtraProps}
    />}
  </div>);
}

export default ResultContainer