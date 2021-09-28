import { Select } from 'antd';
import "./DropdownComponent.scss";

interface Iprops {
  dropdownOptions: any;
  widthValue?: string;
  placeHolder?: String;
  valueSelected?: string;
  onChangeFunction?: Function;
  onClearFunction?: Function;
  selectOption?: any;
  loadingSkeleton?: any;
  uniqueKey?: any;
}

function DropdownComponent(props: Iprops) {
  const { dropdownOptions, uniqueKey = '', selectOption, loadingSkeleton, widthValue = "200", placeHolder = "Search Hideouts", onChangeFunction, onClearFunction } = props;
  return (
    <div className={`dropdownComponent_${uniqueKey}`}>
      <Select
        style={{ "width": widthValue + "px" }}
        options={dropdownOptions}
        placeholder={placeHolder}
        allowClear={true}
        showSearch={true}
        loading={loadingSkeleton}
        value={selectOption === '' ? null : selectOption}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onClear={() => {
          onClearFunction && onClearFunction();
        }}
        onSelect={(value) => {
          onChangeFunction && value && onChangeFunction(value);
        }}
      />
    </div>
  );
}

export default DropdownComponent;