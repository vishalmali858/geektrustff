import { RocketFilled, ReloadOutlined, GlobalOutlined, DingtalkCircleFilled, SmallDashOutlined, HeartFilled, CopyrightOutlined } from '@ant-design/icons';
import { ReactComponent as mercuryIcon } from '../assets/images/planets/mercury.svg';
import { ReactComponent as saturnIcon } from '../assets/images/planets/saturn.svg';
import { ReactComponent as venusIcon } from '../assets/images/planets/venus.svg';
import { ReactComponent as neptuneIcon } from '../assets/images/planets/neptune.svg';
import { ReactComponent as jupiterIcon } from '../assets/images/planets/jupiter.svg';
import { ReactComponent as marsIcon } from '../assets/images/planets/mars.svg';
import { ReactComponent as spacePodIcon } from '../assets/images/vehicles/spacePod.svg';
import { ReactComponent as spaceShuttleIcon } from '../assets/images/vehicles/spaceShuttle.svg';
import { ReactComponent as spaceRocketIcon } from '../assets/images/vehicles/spaceRocket.svg';
import { ReactComponent as spaceShipIcon } from '../assets/images/vehicles/spaceShip.svg';
import Icon from '@ant-design/icons';
import { WAIT_STATE_VALUE, PROCESS_STATE_VALUE, FINISH_STATE_VALUE } from "./globalTypes";

export const expandMenuIcon = <SmallDashOutlined style={{ fontSize: "20px" }} rotate={90} />;

const DonlonIcon = (props: any) => <Icon component={venusIcon} style={props.styleObject} />;
const EnchaiIcon = (props: any) => <Icon component={mercuryIcon} style={props.styleObject} />;
const JebingIcon = (props: any) => <Icon component={jupiterIcon} style={props.styleObject} />;
const SapirIcon = (props: any) => <Icon component={neptuneIcon} style={props.styleObject} />;
const LerbinIcon = (props: any) => <Icon component={saturnIcon} style={props.styleObject} />;
const PingasorIcon = (props: any) => <Icon component={marsIcon} style={props.styleObject} />;

const planetMapping = (iconStyles: any) => {
	return ({
		"Donlon": <DonlonIcon styleObject={iconStyles} />,
		"Enchai": <EnchaiIcon styleObject={iconStyles} />,
		"Jebing": <JebingIcon styleObject={iconStyles} />,
		"Sapir": <SapirIcon styleObject={iconStyles} />,
		"Lerbin": <LerbinIcon styleObject={iconStyles} />,
		"Pingasor": <PingasorIcon styleObject={iconStyles} />
	});
}

export const planetMapping30Size: any = planetMapping({ fontSize: "30px" });
export const planetMapping90Size: any = planetMapping({ fontSize: "90px" });

const SpacePodIcon = (props: any) => <Icon className={"spacePodIcon"} component={spacePodIcon} style={props.styleObject} />;
const SpaceShuttleIcon = (props: any) => <Icon className={"spaceShuttleIcon"} component={spaceShuttleIcon} style={props.styleObject} rotate={-90} />;
const SpaceRocketIcon = (props: any) => <Icon className={"spaceRocketIcon"} component={spaceRocketIcon} style={props.styleObject} />;
const SpaceShipIcon = (props: any) => <Icon className={"spaceShipIcon"} component={spaceShipIcon} style={props.styleObject} />;

const vehicleMapping = (iconStyles: any) => {
	return {
		"Space pod": <SpacePodIcon styleObject={iconStyles} />,
		"Space shuttle": <SpaceShuttleIcon styleObject={iconStyles} />,
		"Space rocket": <SpaceRocketIcon styleObject={iconStyles} />,
		"Space ship": <SpaceShipIcon styleObject={iconStyles} />
	}
}

export const vehicleMapping30Size: any = vehicleMapping({ fontSize: "30px" });
export const vehicleMapping60Size: any = vehicleMapping({ fontSize: "60px" });
export const vehicleMapping90Size: any = vehicleMapping({ fontSize: "90px" });


export const rocketIconConfig = {
	[WAIT_STATE_VALUE]: (<RocketFilled style={{ color: "red" }} />),
	[PROCESS_STATE_VALUE]: (<RocketFilled spin={true} />),
	[FINISH_STATE_VALUE]: (<RocketFilled style={{ color: "green" }} rotate={180} />),
}

export const SPINNER_WHILE_FINDING_FALCONE = "whileFindingFalcone";

export const SPINNER_ICON: any = {
	[SPINNER_WHILE_FINDING_FALCONE]: <DingtalkCircleFilled style={{ fontSize: "32px" }} />
}

export const MESSAGE_ICON = [
	<DingtalkCircleFilled style={{ color: "green" }} />,
	<DingtalkCircleFilled style={{ color: "red" }} />
]

export const FOOTER_BUTTON_ICON = [
	{
		iconToRender: <GlobalOutlined />
	},
	{
		iconToRender: <ReloadOutlined />
	},
	{
		iconToRender: <RocketFilled />
	}
];

export const FOOTER_TEXT_ICON = (<HeartFilled />);
export const FOOTER_COPYRIGHT_ICON = <CopyrightOutlined />;
export const FOOTER_LOGO_ICON = <DingtalkCircleFilled style={{ fontSize: "40px", color: "green" }} />;