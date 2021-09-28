import React from 'react';
import DropdownComponent from "../DropdownComponent/DropdownComponent";
import RadioComponent from "../RadioComponent/RadioComponent";
import { useAppDispatch } from '../../app/hooks';
import { dropdownClicked, resetDropdown, radioClicked } from '../../features/cache/cacheSlice';
import SpaceComponent from "../SpaceComponent/SpaceComponent";

interface Iprops {
  planetData: any;
  vehcileData: any;
  uniqueKey: any;
  selectedVehicle?: any;
  selectedPlanet?: any;
  loadingSkeleton?: any;
}

function FFCardContentComponent(props: Iprops) {
  const { planetData, vehcileData, uniqueKey, selectedVehicle, selectedPlanet, loadingSkeleton } = props;
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <SpaceComponent direction="vertical">
        <DropdownComponent
          dropdownOptions={planetData}
          selectOption={selectedPlanet}
          loadingSkeleton={loadingSkeleton}
          uniqueKey={uniqueKey}
          onChangeFunction={
            function (optionSelected: any) {
              dispatch(dropdownClicked({ optionSelected, desIndex: props.uniqueKey }))
            }
          }
          onClearFunction={() => dispatch(resetDropdown(props.uniqueKey))}
        />
        <RadioComponent
          radioOptions={vehcileData}
          selectedOption={selectedVehicle}
          uniqueKey={uniqueKey}
          onChangeFunction={
            function (optionSelected: any) {
              dispatch(radioClicked({ optionSelected, desIndex: props.uniqueKey }))
            }
          }
        />
      </SpaceComponent>
    </React.Fragment>
  );
}

export default FFCardContentComponent;