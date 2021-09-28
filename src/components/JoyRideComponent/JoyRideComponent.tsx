import Joyride from 'react-joyride';
import { useAppDispatch } from '../../app/hooks';
import "./JoyRideComponent.scss";
import { setTourStatus } from '../../features/cache/cacheSlice';

interface Iprops {
  showTourByButtonOption?: boolean;
  steps: any;
}

function JoyRideComponent(props: Iprops) {
  const { showTourByButtonOption = false, steps } = props;
  const dispatch = useAppDispatch();

  let tourToRender = false;
  tourToRender = showTourByButtonOption ? true : (localStorage && localStorage.hasOwnProperty("tourDone") && localStorage.tourDone ? false : true);
  return (!tourToRender ? null :
    <Joyride
      steps={steps}
      callback={(e) => {
        if (e.status === 'finished' || e.status === 'skipped') {
          localStorage.setItem('tourDone', 'true');
          dispatch(setTourStatus(false));
        } else if (e.index === 0 && e.status === "running" && !showTourByButtonOption) {
          dispatch(setTourStatus(true));
        }
      }}
      showProgress={true}
      continuous={true}
      showSkipButton={true}
      disableOverlayClose={true}
      run={true}
      locale={{
        "back": "Previous Step",
        "next": "Next Step",
        "last": "Start Finding Falcone",
        "skip": "Skip Tour"
      }}
    />);
}

export default JoyRideComponent;