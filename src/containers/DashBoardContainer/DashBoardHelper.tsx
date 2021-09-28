import { planetMapping30Size, vehicleMapping30Size } from "../../utils/imageMapping";
import { VEHICLE_COUNTER_COLOUR } from "../../utils/globalTypes";
import BadgeComponent from "../../components/BadgeComponent/BadgeComponent";
import SpaceComponent from "../../components/SpaceComponent/SpaceComponent";
import FFCardContentComponent from "../../components/FFCardContentComponent/FFCardContentComponent";

function createLabelDataForDropdown(planetName: any) {
	return (<div className={"dropdownPlanet"}>
		<SpaceComponent alignValue={"center"}>
			{planetName}
			{planetMapping30Size[planetName]}
		</SpaceComponent>
	</div>)
}

function createLabelDataForRadio(vehicleName: any) {
	return (<div className={"radioSpaceVehicle"}>
		<span>{vehicleName}</span>
	</div>)
}

function createIconDataForRadioCount(vehicleName: any, counterValue: any, disableFlag: any) {
	let cssPropertyObject = {
		"backgroundColor": (disableFlag ? VEHICLE_COUNTER_COLOUR[0] : VEHICLE_COUNTER_COLOUR[1])
	};
	return (<SpaceComponent>
		{vehicleMapping30Size[vehicleName]}
		<BadgeComponent badgeCSSProperty={cssPropertyObject} text={counterValue} showZeroValue={true} />
	</SpaceComponent>)
}

export function getSelectedPlanetAndVehicle(selectedObject: any) {
	let selectedPlanet: any = [];
	let selectedVehicle: any = [];
	Object.keys(selectedObject).forEach(function (selectedDestination: any) {
		let selectedDestinationData = selectedObject[selectedDestination];
		let selectedIndex = selectedDestination.split("_")[1];
		if (selectedDestinationData.planetDetails) {
			if (!selectedPlanet[selectedIndex]) {
				selectedPlanet[selectedIndex] = {};
			}
			selectedPlanet[selectedIndex] = selectedDestinationData.planetDetails
		}
		if (selectedDestinationData.vehiclesDetails) {
			if (!selectedVehicle[selectedIndex]) {
				selectedVehicle[selectedIndex] = {};
			}
			selectedVehicle[selectedIndex] = selectedDestinationData.vehiclesDetails
		}
	});
	return { planets: selectedPlanet, vehicles: selectedVehicle };
}

export function createPlanetData(planetArray: any, selectedPlanetArray: any) {
	let planetObject: any = [];
	planetArray.forEach(function (planetDetails: any, index: Number) {
		const { name, distance } = planetDetails;
		let selectedPlanetIndex = selectedPlanetArray.findIndex((planetWiseDetails: any) => { return planetWiseDetails && planetWiseDetails.name === name });
		if (selectedPlanetIndex === -1) {
			planetObject.push({
				value: name,
				label: createLabelDataForDropdown(name),
				distance: distance
			});
		}
	});
	return planetObject;
}

function createVehicleData(vechileArray: any, selectedVehicleArray: any, selectedIndexPlanetData: any) {
	let vehicleObject: any = [];
	let vehicleArrayGapRequired: any = [35, 25, 22, 40];
	vechileArray.forEach(function (vehicleDetails: any, index: any) {
		const { name, total_no, max_distance } = vehicleDetails;
		let currentCounter = total_no;
		let isSelected = false;
		let selectedVehicleData = selectedVehicleArray.find((vehicleDetails: any) => { return vehicleDetails && vehicleDetails.name === name });
		if (selectedVehicleData) {
			// Updated counter with current value
			isSelected = true;
			currentCounter = selectedVehicleData.currentCounter;
		}
		let disableFlag = max_distance >= selectedIndexPlanetData.distance && currentCounter !== 0 ? false : true;
		vehicleObject.push({
			name: name,
			label: createLabelDataForRadio(name),
			icon: createIconDataForRadioCount(name, currentCounter, disableFlag),
			disabled: disableFlag,
			max_distance: max_distance,
			checked: isSelected,
			gapRequired: vehicleArrayGapRequired[index]
		});
	});
	return vehicleObject
}

export function passPlanetDataAndVehicleData(data: any) {
	const { destinationDataArray, selectedSegregatedData, vehcileData, planetsData } = data;
	const planetDataToBeSend = createPlanetData(planetsData, selectedSegregatedData.planets);
	let timeCounter = 0;
	destinationDataArray.forEach(function (data: any, index: any) {
		let vehicleOptionalData = [];
		data.cardRibbonArray = [];
		if (selectedSegregatedData.planets && selectedSegregatedData.planets[index] && selectedSegregatedData.planets[index].name) {
			data.planetIcon = selectedSegregatedData.planets[index].name;
			data.cardRibbonArray.push({
				text: planetMapping30Size[data.planetIcon],
				className: "planetIcon",
				badgeRibbon: true
			});
			const vehcileDataToBeSend = createVehicleData(vehcileData, selectedSegregatedData.vehicles, selectedSegregatedData.planets[index]);
			vehicleOptionalData = vehcileDataToBeSend;
		} else {
			data.planetIcon = null;
		}
		if (selectedSegregatedData.vehicles && selectedSegregatedData.vehicles[index] && selectedSegregatedData.vehicles[index].name) {
			data.vehicleIcon = selectedSegregatedData.vehicles[index].name;
			data.cardRibbonArray.push({
				text: vehicleMapping30Size[data.vehicleIcon],
				className: "vehicleIcon",
				badgeRibbon: true,
				placement: "end"
			});
			let timeRequiredToTravel = selectedSegregatedData.planets[index].distance / selectedSegregatedData.vehicles[index].speed;
			timeCounter += timeRequiredToTravel;
		} else {
			data.vehicleIcon = null;
		}
		data.description = (
			<FFCardContentComponent loadingSkeleton={!Object.keys(planetsData).length ? true : false} uniqueKey={"des_" + index} selectedPlanet={data.planetIcon === null ? '' : data.planetIcon} selectedVehicle={data.vehicleIcon === null ? '' : data.vehicleIcon} planetData={planetDataToBeSend} vehcileData={vehicleOptionalData}
			/>)
	})
	return { destinationDataArray, timeCounter };
}

export function getArrayToSendForFindingFalcone(tokenData: string, selectedSegregatedData: any) {
	let objectToSend: any = {};
	objectToSend.token = tokenData;
	let planetDataToSend: any = [];
	let vehicleDataToSend: any = [];
	selectedSegregatedData.planets.forEach(function (planetDetails: any) {
		planetDataToSend.push(planetDetails.name);
	})
	selectedSegregatedData.vehicles.forEach(function (vehicleDetails: any) {
		vehicleDataToSend.push(vehicleDetails.name);
	})
	objectToSend.planet_names = planetDataToSend;
	objectToSend.vehicle_names = vehicleDataToSend;
	return objectToSend
}