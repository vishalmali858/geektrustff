import { createStepDataForPlanet } from "../../components/StepComponent/StepHelper";
import StepComponent from "../../components/StepComponent/StepComponent";

interface Iprops {
  selectedPanelData: any;
}

function PlanetSelectionSummaryContainer(props: Iprops) {
  const { selectedPanelData } = props;
  let stepComponentDataFetched: any = createStepDataForPlanet(selectedPanelData);
  return (<div className="sideBarContainer">
    <StepComponent stepDataSource={stepComponentDataFetched} />
  </div>);
}

export default PlanetSelectionSummaryContainer