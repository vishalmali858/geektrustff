import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPlanets, fetchVehicles, fetchToken, fetchFindFalcone } from './cacheAPI';
export interface cacheState {
  planets: any;
  vehicles: any;
  token: string;
  destinationObject: any;
  resultObject: any;
  timerCounter: Number;
  tourStatus: boolean;
}

const initialState: cacheState = {
  planets: [],
  vehicles: [],
  token: '',
  destinationObject: {},
  resultObject: {},
  timerCounter: 0,
  tourStatus: false,
};

export const asyncLoadPlanets = createAsyncThunk(
  'cache/fetchPlanets',
  async () => {
    try {
      const response = await fetchPlanets();
      return response;
    } catch (error) {
      return error
    }
  }
);

export const asyncLoadVehicles = createAsyncThunk(
  'cache/fetchVehicles',
  async () => {
    try {
      const response = await fetchVehicles();
      return response;
    } catch (error) {
      return error
    }
  }
);

export const asyncLoadToken = createAsyncThunk(
  'cache/fetchToken',
  async () => {
    try {
      const response: any = await fetchToken();
      return response;
    } catch (error) {
      return error
    }
  }
);

export const asyncFindFalcone = createAsyncThunk(
  'cache/fetchFindFalcone',
  async (reqBody: any) => {
    try {
      const response = await fetchFindFalcone(reqBody);
      return response;
    } catch (error) {
      return error
    }
  }
);

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    dropdownClicked: (state, action: PayloadAction<any>) => {
      const { optionSelected, desIndex } = action.payload;
      if (!state.destinationObject[desIndex]) {
        state.destinationObject[desIndex] = {};
      } else {
        if (state.destinationObject[desIndex].hasOwnProperty("vehiclesDetails")) {
          let vehicleName = state.destinationObject[desIndex].vehiclesDetails.name;
          state.destinationObject[desIndex] = {};
          vehicleName !== '' && updateDestinationObject(state.destinationObject, "incrementValue", vehicleName, state.vehicles);
        }
      }
      let optionFound = state.planets.find(function (planetData: any) {
        return planetData.name === optionSelected
      });
      if (optionFound) {
        state.destinationObject[desIndex].planetDetails = optionFound;
      }
    },
    resetDropdown: (state, action: PayloadAction<string>) => {
      if (state.destinationObject[action.payload]) {
        let vehicleName = '';
        if (state.destinationObject[action.payload].hasOwnProperty("vehiclesDetails")) {
          vehicleName = state.destinationObject[action.payload].vehiclesDetails.name;
        }
        delete state.destinationObject[action.payload];
        vehicleName !== '' && updateDestinationObject(state.destinationObject, "incrementValue", vehicleName, state.vehicles);
      }
    },
    radioClicked: (state, action: PayloadAction<any>) => {
      const { optionSelected, desIndex } = action.payload;
      if (!state.destinationObject[desIndex]) {
        state.destinationObject[desIndex] = {};
      } else {
        if (state.destinationObject[desIndex].vehiclesDetails && state.destinationObject[desIndex].vehiclesDetails.name) {
          updateDestinationObject(state.destinationObject, "incrementValue", state.destinationObject[desIndex].vehiclesDetails.name, state.vehicles);
        }
      }
      let optionFound = state.vehicles.find(function (vehicle: any) {
        return vehicle.name === optionSelected
      });
      if (optionFound) {
        updateDestinationObject(state.destinationObject, "decrementValue", optionFound.name, state.vehicles, desIndex);
      }
    },
    resetClicked: (state) => {
      state.resultObject = {};
      state.destinationObject = {};
      state.timerCounter = 0;
      state.vehicles.forEach(function (vehicleData: any) {
        vehicleData.currentCounter = vehicleData.total_no;
      });
    },
    setCounterTime: (state, action: PayloadAction<number>) => {
      state.timerCounter = action.payload;
    },
    setTourStatus: (state, action: PayloadAction<boolean>) => {
      state.tourStatus = action.payload;
    },
    setDestinationObject: (state, action: PayloadAction<any>) => {
      state.destinationObject = action.payload.desObject;
      state.vehicles = action.payload.vehcileData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoadPlanets.fulfilled, (state, action) => {
        if (action.payload.hasOwnProperty("errorCode")) {
          return
        }
        state.planets = action.payload;
        state.destinationObject = {};
      })
      .addCase(asyncLoadVehicles.fulfilled, (state, action) => {
        if (action.payload.hasOwnProperty("errorCode")) {
          return
        }
        state.vehicles = action.payload;
        state.destinationObject = {};
      })
      .addCase(asyncLoadToken.fulfilled, (state, action) => {
        if (action.payload.hasOwnProperty("errorCode")) {
          return
        }
        state.token = action.payload.token;
      })
      .addCase(asyncFindFalcone.fulfilled, (state, action) => {
        if (action.payload.hasOwnProperty("errorCode")) {
          return
        }
        state.resultObject = action.payload;
      })
  }
});

function updateDestinationObject(desObject: any, type: string, vehicleName: string, vehicleData: any, desIndex?: any) {
  let optionFound = vehicleData.find(function (vehicle: any) {
    return vehicle.name === vehicleName
  });
  let vehicleCounter: Number = -1;
  if (optionFound) {
    switch (type) {
      case "incrementValue":
        if (optionFound.hasOwnProperty("currentCounter")) {
          optionFound.currentCounter = optionFound.currentCounter + 1;
        } else {
          optionFound.currentCounter = optionFound.total_no;
        }
        vehicleCounter = optionFound.currentCounter;
        break;
      case "decrementValue":
        if (optionFound.hasOwnProperty("currentCounter")) {
          optionFound.currentCounter = optionFound.currentCounter - 1;
        } else {
          optionFound.currentCounter = optionFound.total_no - 1;
        }
        vehicleCounter = optionFound.currentCounter;
        desObject[desIndex].vehiclesDetails = optionFound;
        break;
    }
    Object.keys(desObject).forEach(function (desData: any) {
      let destinationWiseData = desObject[desData];
      if (destinationWiseData.hasOwnProperty("vehiclesDetails") && destinationWiseData.vehiclesDetails.hasOwnProperty("currentCounter")) {
        if (destinationWiseData.vehiclesDetails.hasOwnProperty("name") && destinationWiseData.vehiclesDetails.name === vehicleName) {
          if (vehicleCounter !== -1) destinationWiseData.vehiclesDetails.currentCounter = vehicleCounter;
        }
      }
    });
  }
}

export const { dropdownClicked, resetDropdown, radioClicked, resetClicked, setCounterTime, setTourStatus, setDestinationObject } = cacheSlice.actions;

export const getAllPlanetsData = (state: RootState) => state.cache.planets;
export const getAllVehiclesData = (state: RootState) => state.cache.vehicles;
export const getToken = (state: RootState) => state.cache.token;
export const getResultObject = (state: RootState) => state.cache.resultObject;
export const getSelectedPlanetData = (state: RootState) => state.cache.destinationObject;
export const getTimerCounter = (state: RootState) => state.cache.timerCounter;
export const getTourStatus = (state: RootState) => state.cache.tourStatus;

export default cacheSlice.reducer;