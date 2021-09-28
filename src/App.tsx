import React from 'react';
import { connect } from 'react-redux';
import MainContainer from './containers/MainContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.dark.css'
import { asyncLoadPlanets, asyncLoadVehicles } from './features/cache/cacheSlice';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { LoaderContextProvider } from './components/SpinnerComponent/LoaderContext';

interface Iprops {
  asyncLoadPlanets: Function;
  asyncLoadVehicles: Function;
  planets: any;
  vehicles: any;
  location?: any;
}

class App extends React.Component<Iprops> {
  componentDidMount() {
    const { props } = this;
    const { planets, vehicles } = props;
    !planets.length && this.props.asyncLoadPlanets();
    !vehicles.length && this.props.asyncLoadVehicles();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <LoaderContextProvider>
              <Route component={MainContainer} />
            </LoaderContextProvider>
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { cache } = state;
  const { planets, vehicles } = cache;
  return {
    planets: planets,
    vehicles: vehicles
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return bindActionCreators(
    {
      asyncLoadPlanets,
      asyncLoadVehicles
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
