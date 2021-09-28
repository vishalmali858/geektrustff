import { Divider } from 'antd';
import { modalQuestionFF, INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT, UNIT_VALUE_ARRAY, MISSION_PROBLEM_TEXT } from '../../utils/globalTypes';
import ListComponent from '../../components/ListComponent/ListComponent';
import TabComponent from '../../components/TabComponent/TabComponent';
import { useAppSelector } from '../../app/hooks';
import LabelComponent from '../../components/LabelComponent';
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent';
import { getAllPlanetsData, getAllVehiclesData } from '../../features/cache/cacheSlice';
import { planetMapping30Size, planetMapping90Size, vehicleMapping60Size, SPINNER_ICON, SPINNER_WHILE_FINDING_FALCONE } from '../../utils/imageMapping';
import CardComponent from '../../components/CardComponent/CardComponent';
import SpaceComponent from "../../components/SpaceComponent/SpaceComponent";
import LayoutDetailsHOCComponent from '../../utils/LayoutDetailsHOCComponent';
import MultipleCardWithBadgeComponent from '../../components/MultipleCardWithBadgeComponent';
interface Iprops {
    onDrawerClose?: Function;
    drawerStatus?: boolean;
}

function ModalQuestionFFComponent(props: Iprops) {
    const { onDrawerClose, drawerStatus } = props;
    const planetArray = useAppSelector(getAllPlanetsData);
    const vehicleArray = useAppSelector(getAllVehiclesData);

    const getTabName = (data: any) => {
        return (<SpaceComponent>
            {planetMapping30Size[data.name]}
        </SpaceComponent>);
    }

    const getContentOfTab = (data: any, vehcileData: any) => {
        let dataSourceToSend: any = [];

        let planetDetailsComponent = (
            <ListComponent
                hasBorder={false}
                isLoading={planetArray.length ? false : true}
                componentToRender={[{
                    title: <SpaceComponent direction="vertical">
                        {planetMapping90Size[data.name]}
                        {data.name}
                    </SpaceComponent>,
                    description: <SpaceComponent alignValue={"start"}>
                        <LabelComponent fontSizeValue={"15px"}>{`${INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT[0]}`}</LabelComponent>
                        <LabelComponent showLine={true} fontSizeValue={"15px"}>{data.distance}{UNIT_VALUE_ARRAY[0]}</LabelComponent>
                    </SpaceComponent>
                }]}
                addListInMeta={true}
            />
        );

        vehcileData.forEach((vData: any) => {
            if (data.distance <= vData.max_distance) {
                dataSourceToSend.push({
                    className: "vehicleName",
                    avatar: vehicleMapping60Size[vData.name],
                    title: <Divider>{vData.name}</Divider>,
                    descriptionArray: [
                        {
                            badgeText: `${vData.speed}${UNIT_VALUE_ARRAY[1]}`,
                            cardDescription: INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT[2],
                        },
                        {
                            badgeText: `${data.distance / vData.speed}${UNIT_VALUE_ARRAY[2]}`,
                            cardDescription: INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT[1],
                        },
                        {
                            badgeText: `${vData.max_distance} ${UNIT_VALUE_ARRAY[0]}`,
                            cardDescription: INITIAL_VEHICLES_DETAILS_ATTRIBUTE_TEXT[3],
                        },
                    ]
                });
            }
        });

        let propsToBePassed = {
            addDataInCard: false,
            headerToRender: planetDetailsComponent,
            loadingSkeleton: vehicleArray.length ? false : true,
            skeletonCount: 6,
            cardMainHeaderText: '',
            dataSource: dataSourceToSend,
            uniqueClassName: "initialPlanetsAndVehiclesData"
        };

        return (LayoutDetailsHOCComponent(MultipleCardWithBadgeComponent, propsToBePassed));
    }
    let tabbedDataToRender = planetArray.map(function (data: any, index: any) {
        return {
            tabName: getTabName(data),
            key: index,
            children: getContentOfTab(data, vehicleArray)
        }
    });

    // Adding Problem Statement
    let dataSource = Object.keys(modalQuestionFF);
    let cardData: any = [];
    if (dataSource && dataSource.length) {
        Object.keys(modalQuestionFF).forEach(function (destDetails: any) {
            cardData.push({
                hovered: false,
                uniqueKey: destDetails,
                description: <LabelComponent fontSizeValue={"15px"} headingLevel={2}>{modalQuestionFF[destDetails]}</LabelComponent>
            })
        });
    }
    return (
        <DrawerComponent onCloseClick={onDrawerClose} openDrawer={drawerStatus} closedIconForDrawer={<SpaceComponent direction="vertical" size={1}>{SPINNER_ICON[SPINNER_WHILE_FINDING_FALCONE]} Close </SpaceComponent>} titleDrawer={<LabelComponent headingLevel={3}>{MISSION_PROBLEM_TEXT}</LabelComponent>}>
            <SpaceComponent direction="vertical">
                <CardComponent addCardInList={false} showLoadingSkeletonOfList={false} loadingSkeleton={cardData.length ? false : true} className={"initialQuestionData"} dataSource={cardData} />
                <TabComponent loadingSkeleton={planetArray.length ? false : true} className={"initialPlanetAndQuestionData"} tabPaneToRender={tabbedDataToRender} />
            </SpaceComponent>
        </DrawerComponent>
    );
}

export default ModalQuestionFFComponent