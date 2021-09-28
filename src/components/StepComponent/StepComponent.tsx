import { Steps } from 'antd';
import "./StepComponent.scss";
const { Step } = Steps;

interface Iprops {
  stepDataSource?: any;
}

function StepComponent(props: Iprops) {
  const { stepDataSource } = props;
  return (
    <Steps className={"thirdStep"} responsive={true} labelPlacement={"vertical"}>
      {stepDataSource && stepDataSource.length && stepDataSource.map((stepData: any) => {
        return <Step subTitle={stepData.subTitle} key={stepData.title} title={stepData.title} description={stepData.description} icon={stepData.icon} status={stepData.status} />
      })}
    </Steps>)
}

export default StepComponent;