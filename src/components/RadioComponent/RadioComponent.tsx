import { Radio } from 'antd';
import './RadioComponent.scss';
import SpaceComponent from "../SpaceComponent/SpaceComponent";
import React from 'react';

interface Iprops {
  radioOptions?: any;
  direction?: any;
  onChangeFunction?: any;
  selectedOption?: any;
  uniqueKey?: any;
}

function RadioComponent(props: Iprops) {
  const { radioOptions, direction = "vertical", uniqueKey, onChangeFunction, selectedOption = '' } = props;
  return (
    <div className={`radioComponent_${uniqueKey}`}>
      <Radio.Group
        name={"radiogroup"}
        value={selectedOption}
        onChange={function (event: any) {
          onChangeFunction && onChangeFunction(event.target.value);
        }}
        key={`radioComponentGroup_${uniqueKey}`}
      >
        <SpaceComponent className={"radioComponentIcon"} direction={direction}>
          {radioOptions.map(function (data: any) {
            return <React.Fragment key={uniqueKey + data.name + "fragment"}><SpaceComponent size={data.gapRequired}><Radio
              disabled={data.disabled}
              value={data.name}
              key={uniqueKey + data.name}
            >{data.label}
            </Radio>{data.icon}
            </SpaceComponent></React.Fragment>
          })}
        </SpaceComponent>
      </Radio.Group>
    </div>
  );
}

export default RadioComponent;