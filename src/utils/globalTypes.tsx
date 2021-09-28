export const FONT_COLOR_FOR_LABEL_COMPONENT = "#e2d0ad";
const destinationUniqueClassNameForCardAndFirstNavigation = {
  0: "destination_1",
  1: "destination_2",
  2: "destination_3",
  3: "destination_4",
}

export const destinationDataArray = [
  {
    title: 'Destination 1',
    size: "small",
    className: destinationUniqueClassNameForCardAndFirstNavigation[0]
  },
  {
    title: 'Destination 2',
    size: "small",
    className: destinationUniqueClassNameForCardAndFirstNavigation[1]
  },
  {
    title: 'Destination 3',
    size: "small",
    className: destinationUniqueClassNameForCardAndFirstNavigation[2]
  },
  {
    title: 'Destination 4',
    size: "small",
    className: destinationUniqueClassNameForCardAndFirstNavigation[3]
  },
];

export const getCardDefaultGridAttribute = {
  gutter: 16,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 4,
  xl: 4,
  xxl: 4
}

const VEHICLE = "Space Vehicle";
const PLANET = "Planet";

export const stepSideBarData = {
  CHOOSE_SPACE_VEHICLE: `Choose ${VEHICLE}`,
  CHOOSE_PLANET: `Choose ${PLANET}`
}

export const WAIT_STATE_VALUE: any = "wait";
export const PROCESS_STATE_VALUE: any = "process";
export const FINISH_STATE_VALUE: any = "finish";

const contentHelperText = "Please select or search a planet from the dropdown and then select a space vehicle, if it can reach the selected planet.";

export const MISSION_PROBLEM_TEXT = "Mission: Queen of Falicornia";
export const initialStepsForHelp = [
  {
    target: '.logoHeader',
    title: `Welcome to ${MISSION_PROBLEM_TEXT}`,
    content: 'Clicking on highlighted icon will give you insights about the potential hideouts of queen and vehicles to reach the planets.',
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: `.${destinationUniqueClassNameForCardAndFirstNavigation[0]}`,
    content: contentHelperText,
    title: `Select Fisrst ${PLANET} and ${VEHICLE}`,
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: `.${destinationUniqueClassNameForCardAndFirstNavigation[1]}`,
    content: contentHelperText,
    title: `Select Second ${PLANET} and ${VEHICLE}`,
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: `.${destinationUniqueClassNameForCardAndFirstNavigation[2]}`,
    content: contentHelperText,
    title: `Select Third ${PLANET} and ${VEHICLE}`,
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: `.${destinationUniqueClassNameForCardAndFirstNavigation[3]}`,
    content: contentHelperText,
    title: `Select Fourth ${PLANET} and ${VEHICLE}`,
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: ".thirdStep",
    content: 'Detailed analysis of planets and vehicles selected. Distance, speed and time to reach a particular planet',
    title: "Summary Of Planets and Vehicles",
    disableBeacon: true,
    hideCloseButton: true
  },
  {
    target: ".forthStep",
    content: 'After selecting all the planets and vehicles and verifying the time required to find the queen. Launch the vehicles',
    title: "Click to Find Falcone",
    disableBeacon: true,
    hideCloseButton: true
  }
];

export const modalQuestionFF: any = {
  introduction: "In the planet of Lengaburu, in the distant galaxy of Tara B.",
  paragraph1: "After the recent war with neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years. Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years",
  question1: "King Shan has received intelligence that Al Falcone is in hiding in one of the 6 planets. However he has limited resources at his disposal & can send his army to only 4 of the planets.",
  navigation: "Help King Shan find Al Falcone. Below are the details of potential hideouts of the Queen and vehicle's summary to reach the planet."
}

export const NAVIGATION_BUTTONS_TEXT = [
  "Prepare For Mission",
  "Start Mission Tour",
  "Check Planets",
  "Check Vehicles"
];

export const MAIN_PAGE_SELECT_PLANET_TEXT = "Select planets you want to search in:";
export const PLANETS_PAGE_TEXT = "Potential Hideouts";
export const VEHICLES_PAGE_TEXT = "Available Vehicles";
export const TIME_TAKEN_TEXT = "Time Taken: "

export const VEHICLE_COUNTER_COLOUR = [
  "grey",
  "green"
];

export const FOOTER_BUTTON_TEXT = [
  {
    text: "Find Falcone",
  },
  {
    text: "Reset",
  },
  {
    text: "Populate",
  }
];

export const SELECTED_PLANET_DATA_SIDEBAR = ["Distance: ", "Speed: ", "Time: "];

export const PLANETS_DETAILS_ATTRIBUTE_TEXT = [
  "Distance From Lengaburu"
];

export const VEHICLES_DETAILS_ATTRIBUTE_TEXT = [
  "Maximum Distance Covered",
  "Number Of Units",
  "Maximum Vehicle Speed"
];

export const INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT = [
  "Maximum distance from Lengaburu ",
  `Time Taken To Travel From Lengaburu `,
  `${VEHICLES_DETAILS_ATTRIBUTE_TEXT[2]} `,
  `${VEHICLES_DETAILS_ATTRIBUTE_TEXT[0]} `,
];

export const UNIT_VALUE_ARRAY = [
  " megamiles",
  " megamiles/hour",
  " seconds"
];

export const UNIT_VALUE_ARRAY_SHORTFORM = [
  " mm",
  " mm/hr",
  " sec"
]

export const SUCCESS_MESSAGE_TEXT = "Success! Congratulations on Finding Falcone. King Shan is mighty pleased.";
export const FAILED_MESSAGE_TEXT = "Failed ! King Shan might be very angry today!";
export const ERROR_MESSAGE_TEXT = "Sorry, There was an issue in finding falcone.";

export const ERROR403_TEXT = "Sorry, you are not authorized to access this page.";
export const ERROR404_TEXT = "Sorry, the page you have visited does not exist.";
export const ERROR500_TEXT = "Sorry, something went wrong. Its us, not yours. Sorry For inconvenience !";

export const NAVIGATE_TO_DASHBOARD = "Please click the below button to try again";

export const PLANET_FOUND_TEXT = "Planet Found: ";

export const errorCodeObject: any = {
  "403": {
    title: "403",
    status: "403",
    subTitle: ERROR403_TEXT
  },
  "404": {
    title: "404",
    status: "404",
    subTitle: ERROR404_TEXT
  },
  "500": {
    title: "500",
    status: "500",
    subTitle: ERROR500_TEXT
  }
}

export const FINDING_FALCONE_SPINNER_TIP_VALUE = "Finding Falcone...";
