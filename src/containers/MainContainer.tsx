import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { Layout } from 'antd';
import DashBoard from './DashBoardContainer/DashBoard';
import PlanetDetails from './PlanetContainer/PlanetDetails';
import VehicleDetails from './VehicleContainer/VehicleDetails';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import ResultContainer from './ResultContainer/ResultContainer';
import ResultComponent from "../components/ResultComponent/ResultComponent";
import { LoaderStatusService } from "../components/SpinnerComponent/LoaderStatusService";
import SpinnerComponent from "../components/SpinnerComponent/SpinnerComponent";
import { SPINNER_WHILE_FINDING_FALCONE, SPINNER_ICON } from "../utils/imageMapping";
import { FINDING_FALCONE_SPINNER_TIP_VALUE } from "../utils/globalTypes";
import { ScrollToTop } from './ScrollTop';

const { Header, Footer, Content } = Layout;
function MainContainer(props: any) {
  const { loading } = LoaderStatusService();
  return (
    <SpinnerComponent
      iconToRender={SPINNER_ICON[SPINNER_WHILE_FINDING_FALCONE]}
      spinningValue={loading} tipValue={FINDING_FALCONE_SPINNER_TIP_VALUE}>
      <div className="appMainContainer">
        <Router>
          <Layout>
            <Header>
              <Route component={HeaderComponent} />
            </Header>
            <Content>
              <ScrollToTop />
              <Switch>
                <Route exact={true} path={["/", "/dashboard"]} component={DashBoard} />
                <Route exact={true} path="/planets" component={PlanetDetails} />
                <Route exact={true} path="/vehicles" component={VehicleDetails} />
                <Route exact={true} path="/result" component={ResultContainer} />
                <Route component={ResultComponent} />
              </Switch>
            </Content>
            <Footer>
              <Route component={FooterComponent} />
            </Footer>
          </Layout>
        </Router>
      </div>
    </SpinnerComponent>
  )
}

export default MainContainer;