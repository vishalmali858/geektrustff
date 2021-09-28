import logoPng from "../assets/images/logoIcon/logoFF.png";
import { Image } from 'antd';
import LabelComponent from '../components/LabelComponent';
import ModalQuestionFFComponent from "./ModalQuestionFFComponent/ModalQuestionFFComponent";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SpaceComponent from "./SpaceComponent/SpaceComponent";

function IconFFComponent() {
    const location = useLocation();
    const [drawerStatus, setDrawerStatus] = useState(location.pathname === "/" ? true : false);

    const onShowDrawer = () => {
        setDrawerStatus(true);
    };

    const onDrawerClose = () => {
        setDrawerStatus(false);
    };
    return (<SpaceComponent>
        <ModalQuestionFFComponent drawerStatus={drawerStatus} onDrawerClose={onDrawerClose} />
        <LabelComponent showLine={true} headingLevel={3} fontSizeValue={"1.4rem"}>Finding </LabelComponent>
        <Image className={"logoHeader"} width={80} wrapperStyle={{ top: "15px" }} src={logoPng} preview={false} onClick={onShowDrawer} />
        <LabelComponent showLine={true} headingLevel={3} fontSizeValue={"1.4rem"}> Falcone</LabelComponent>
    </SpaceComponent>);
}

export default IconFFComponent