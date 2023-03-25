import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'components/Layout';
import PrivateRoute from './PrivateRoute';

import Home from '../containers/Home';
import CreateSpace from 'containers/CreateSpace';
import CreateProposal from 'containers/CreateProposal';

import SpaceDetail from 'containers/SpaceDetail';
import ProposalDetail from 'containers/ProposalDetail';





const Routes = (props: any) => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <PrivateRoute
      path="/home" // 
      component={Home}
      layout={Layout}
      props={props}
    />
    <PrivateRoute
      path="/create_space" // 
      component={CreateSpace}
      layout={Layout}
      props={props}
    />
    <PrivateRoute
      path="/create_proposal/:spaceId" // 
      component={CreateProposal}
      layout={Layout}
      props={props}
    />
    <PrivateRoute
      path="/space-detail/:spaceId" // 
      component={SpaceDetail}
      layout={Layout}
      props={props}
    />

    <PrivateRoute
      path="/proposal-detail/:proposalId"
      component={ProposalDetail}
      layout={Layout}
      props={props}
    />
  </Switch>
);

export default Routes;
