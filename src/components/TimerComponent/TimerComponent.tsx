import SpaceComponent from "../../components/SpaceComponent/SpaceComponent";
import LabelComponent from "../../components/LabelComponent";
import BadgeComponent from "../../components/BadgeComponent/BadgeComponent";
import { TIME_TAKEN_TEXT } from "../../utils/globalTypes";
import { BackTop } from "antd";

interface Iprops {
  timerCounterValue?: any;
  showInScroll?: boolean;
}

function TimerComponent(props: Iprops) {
  const { timerCounterValue = 0, showInScroll = false } = props;

  return (
    <SpaceComponent direction={"vertical"} size={2}>
      <SpaceComponent alignValue={"end"}>
        <LabelComponent headingLevel={3}>{TIME_TAKEN_TEXT}</LabelComponent>
        <BadgeComponent
          className={"timerCounter"}
          overflowCountValue={1000000000}
          showZeroValue={true}
          text={timerCounterValue} />
        {showInScroll ? <BackTop visibilityHeight={30}>
          <BadgeComponent
            overflowCountValue={1000000000}
            className={"timerBackTopCounter"}
            showZeroValue={true}
            text={timerCounterValue} /></BackTop> : null}
      </SpaceComponent>
      <div className="lineBelowText" />
    </SpaceComponent>
  );
}

export default TimerComponent;