import PlanetDashboard from '../DashBoardContainer/PlanetDashboard';
import JoyRideComponent from '../../components/JoyRideComponent/JoyRideComponent';
import { initialStepsForHelp } from "../../utils/globalTypes";
import { useAppSelector } from '../../app/hooks';
import { getAllPlanetsData, getTourStatus } from '../../features/cache/cacheSlice';

function DashBoard() {
  const planetArray = useAppSelector(getAllPlanetsData);
  const getTourStatusValue = useAppSelector(getTourStatus);
  return (<div className="dashBoardContainer">
    {planetArray && planetArray.length ? <JoyRideComponent steps={initialStepsForHelp} showTourByButtonOption={getTourStatusValue} /> : null}
    <PlanetDashboard />
  </div>);
}

export default DashBoard