import { FOOTER_TEXT_ICON, FOOTER_COPYRIGHT_ICON, FOOTER_LOGO_ICON } from "../utils/imageMapping";
import LabelComponent from "./LabelComponent";
import SpaceComponent from "./SpaceComponent/SpaceComponent";
import React from 'react';

function FooterComponent() {
  return (
    <div className="footerComponent">
      <SpaceComponent>
        <SpaceComponent size={0} direction={"vertical"}>
          <LabelComponent headingLevel={5}>Made with {FOOTER_TEXT_ICON} in India !</LabelComponent>
          <LabelComponent fontSizeValue={"11px"}>{FOOTER_COPYRIGHT_ICON} 2021 Finding Falcone. No Rights Reserved</LabelComponent>
        </SpaceComponent>
        {FOOTER_LOGO_ICON}
      </SpaceComponent>
    </div>
  );
}

function propsAreEqual(prevProps: any, nextProps: any) {
  let returnFlag = true;
  if (prevProps.location && prevProps.location.pathname && nextProps.location && nextProps.location.pathname && prevProps.location.pathname !== nextProps.location.pathname) {
    returnFlag = false;
  }
  return returnFlag
}

export default React.memo(FooterComponent, propsAreEqual);