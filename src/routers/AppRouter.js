import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import DealDashboardPage from '../components/deals/DealDashboardPage';
import ReportPage from '../components/ReportPage';
import AddDealPage from '../components/deals/AddDealPage';
import EditDealPage from '../components/deals/EditDealPage';
import ViewDealPage from '../components/deals/ViewDealPage';
import AddUserPage from '../components/utenti/AddUserPage';
import EditUtentePage from '../components/utenti/EditUtentePage';
import ViewUtentiPage from '../components/utenti/ViewUtentiPage';
import UtentiDashboardPage from '../components/utenti/UtentiDashboardPage';
import AddFirmaPage from '../components/firma/AddFirmaPage';
import EditFirmaPage from '../components/firma/EditFirmaPage';
import ViewFirmaPage from '../components/firma/ViewFirmaPage';
import AddClientiPage from '../components/clienti/AddClientiPage';
import EditClientiPage from '../components/clienti/EditClientiPage';
import ViewClientiPage from '../components/clienti/ViewClientiPage';
import ClientiDashboardPage from '../components/clienti/ClientiDashboardPage';
import AddFatturaPage from '../components/fatture/AddFatturaPage';
import EditFatturaPage from '../components/fatture/EditFatturaPage';
import ViewFatturaPage from '../components/fatture/ViewFatturaPage';
import FattureDashboardPage from '../components/fatture/FattureDashboardPage';
import OggettiDashboardPage from '../components/oggetti/OggettiDashboardPage';
import AddOggettoPage from '../components/oggetti/AddOggettoPage';
import ViewOggettiPage from '../components/oggetti/ViewOggettiPage';
import EditOggettoPage from '../components/oggetti/EditOggettoPage';
import ViewOggettoMatchPage from '../components/leads/ViewOggettoMatchPage';
import LeadsDashboardPage from '../components/leads/LeadsDashboardPage';
import AddLeadPage from '../components/leads/AddLeadPage';
import EditLeadPage from '../components/leads/EditLeadPage';
import ViewLeadMatchPage from '../components/leads/ViewLeadMatchPage';
import ViewLeadPage from '../components/leads/ViewLeadPage';
import ModuliPage from '../components/moduli/ModuliList';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import StampaDatenblatt from '../components/moduli/StampaDatenblatt';
import MAAForm from '../components/moduli/MAAForm';
import VWBForm from '../components/moduli/VWBForm';
import VollmachtForm from '../components/moduli/VollmachtForm';
import ProvisionForm from '../components/moduli/ProvisionForm';
import NotarauftragForm from '../components/moduli/NotarauftragForm';

export const history = createHistory();

const AppRouter = ({ uid }) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path='/' component={LoginPage} exact={true} />
          <PrivateRoute path='/dashboard' component={DealDashboardPage} />
          <PrivateRoute path='/create' component={AddDealPage} />
          <PrivateRoute path='/edit/:id' component={EditDealPage} />
          <PrivateRoute path='/view/:id' component={ViewDealPage} />

          <PrivateRoute path='/users' component={UtentiDashboardPage} />
          <PrivateRoute path='/usercreate' component={AddUserPage} />
          <PrivateRoute path='/useredit/:id' component={EditUtentePage} />
          <PrivateRoute path='/userview/:id' component={ViewUtentiPage} />

          <PrivateRoute path='/customer' component={ClientiDashboardPage} />
          <PrivateRoute path='/customercreate' component={AddClientiPage} />
          <PrivateRoute path='/customeredit/:id' component={EditClientiPage} />
          <PrivateRoute path='/customerview/:id' component={ViewClientiPage} />

          <PrivateRoute path='/oggetti' component={OggettiDashboardPage} />
          <PrivateRoute path='/oggettocreate' component={AddOggettoPage} />
          <PrivateRoute path='/oggettoview/:id' component={ViewOggettiPage} />
          <PrivateRoute path='/oggettoedit/:id' component={EditOggettoPage} />
          <PrivateRoute
            path='/oggettomatchview/:id'
            component={ViewOggettoMatchPage}
          />

          <PrivateRoute path='/firmacreate' component={AddFirmaPage} />
          <PrivateRoute path='/firmaview/:id' component={ViewFirmaPage} />
          <PrivateRoute path='/firmaedit/:id' component={EditFirmaPage} />

          <PrivateRoute path='/fatture' component={FattureDashboardPage} />
          <PrivateRoute path='/fatturacreate' component={AddFatturaPage} />
          <PrivateRoute path='/fatturaview/:id' component={ViewFatturaPage} />
          <PrivateRoute path='/fatturaedit/:id' component={EditFatturaPage} />

          <PrivateRoute path='/leads' component={LeadsDashboardPage} />
          <PrivateRoute path='/leadscreate' component={AddLeadPage} />
          <PrivateRoute path='/leadedit/:id' component={EditLeadPage} />
          <PrivateRoute
            path='/leadmatchview/:id'
            component={ViewLeadMatchPage}
          />
          <PrivateRoute path='/leadview/:id' component={ViewLeadPage} />

          <PrivateRoute path='/report' component={ReportPage} />

          <PrivateRoute path='/datenblatt/:id' component={StampaDatenblatt} />
          <PrivateRoute path='/moduli' component={ModuliPage} />
          <PrivateRoute path='/makleralleinauftrag' component={MAAForm} />
          <PrivateRoute
            path='/provisionsbestaetigung'
            component={ProvisionForm}
          />
          <PrivateRoute path='/widerrufsbelehrung' component={VWBForm} />
          <PrivateRoute
            path='/vollmachtnotarauftrag'
            component={NotarauftragForm}
          />
          <PrivateRoute path='/vollmachtunterlagen' component={VollmachtForm} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(AppRouter);
