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
import EditOfferedProperties from '../components/leads/EditOfferedProperties';
import AddOfferedProperties from '../components/leads/AddOfferedProperties';
import ModuliPage from '../components/moduli/ModuliList';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MAAForm from '../components/moduli/MAAForm';
import VWBForm from '../components/moduli/VWBForm';
import VollmachtForm from '../components/moduli/VollmachtForm';
import ProvisionForm from '../components/moduli/ProvisionForm';
import NotarauftragForm from '../components/moduli/NotarauftragForm';
import NotarDatenblattForm from '../components/moduli/NotarDatenblattForm';
import EvaluationDashboard from '../components/evaluation/EvaluationDashboard';

export const history = createHistory();

const AppRouter = ({ uid }) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path='/' component={LoginPage} exact={true} />

          {/* DEALS */}
          <PrivateRoute
            path='/dashboard'
            activeClass='dashboard'
            component={DealDashboardPage}
          />
          <PrivateRoute
            path='/create'
            activeClass='dashboard'
            component={AddDealPage}
          />
          <PrivateRoute
            path='/edit/:id'
            activeClass='dashboard'
            component={EditDealPage}
          />
          <PrivateRoute
            path='/view/:id'
            activeClass='dashboard'
            component={ViewDealPage}
          />

          {/* CLIENTI */}
          <PrivateRoute
            path='/customer'
            activeClass='customer'
            component={ClientiDashboardPage}
          />
          <PrivateRoute
            path='/customercreate'
            activeClass='customer'
            component={AddClientiPage}
          />
          <PrivateRoute
            path='/customeredit/:id'
            activeClass='customer'
            component={EditClientiPage}
          />
          <PrivateRoute
            path='/customerview/:id'
            activeClass='customer'
            component={ViewClientiPage}
          />

          {/* OGGETTI */}
          <PrivateRoute
            path='/oggetti'
            activeClass='oggetti'
            component={OggettiDashboardPage}
          />
          <PrivateRoute
            path='/oggettocreate'
            activeClass='oggetti'
            component={AddOggettoPage}
          />
          <PrivateRoute
            path='/oggettoview/:id'
            activeClass='oggetti'
            component={ViewOggettiPage}
          />
          <PrivateRoute
            path='/oggettoedit/:id'
            activeClass='oggetti'
            component={EditOggettoPage}
          />
          <PrivateRoute
            path='/oggettomatchview/:id'
            component={ViewOggettoMatchPage}
          />

          {/* VALUTAZIONI */}
          <PrivateRoute
            path='/evaluation'
            activeClass='evaluation'
            component={EvaluationDashboard}
          />

          {/* UTENTI E DITTA */}
          <PrivateRoute
            path='/users'
            activeClass='users'
            component={UtentiDashboardPage}
          />
          <PrivateRoute
            path='/usercreate'
            activeClass='users'
            component={AddUserPage}
          />
          <PrivateRoute
            path='/useredit/:id'
            activeClass='users'
            component={EditUtentePage}
          />
          <PrivateRoute
            path='/userview/:id'
            activeClass='users'
            component={ViewUtentiPage}
          />
          <PrivateRoute
            path='/firmacreate'
            activeClass='users'
            component={AddFirmaPage}
          />
          <PrivateRoute
            path='/firmaview/:id'
            activeClass='users'
            component={ViewFirmaPage}
          />
          <PrivateRoute
            path='/firmaedit/:id'
            activeClass='users'
            component={EditFirmaPage}
          />

          {/* FATTURE */}
          <PrivateRoute
            path='/fatture'
            activeClass='fatture'
            component={FattureDashboardPage}
          />
          <PrivateRoute
            path='/fatturacreate'
            activeClass='fatture'
            component={AddFatturaPage}
          />
          <PrivateRoute
            path='/fatturaview/:id'
            activeClass='fatture'
            component={ViewFatturaPage}
          />
          <PrivateRoute
            path='/fatturaedit/:id'
            activeClass='fatture'
            component={EditFatturaPage}
          />

          {/* LEADS E OFFERTE */}
          <PrivateRoute
            path='/leads'
            activeClass='leads'
            component={LeadsDashboardPage}
          />
          <PrivateRoute
            path='/leadscreate'
            activeClass='leads'
            component={AddLeadPage}
          />
          <PrivateRoute
            path='/leadedit/:id'
            activeClass='leads'
            component={EditLeadPage}
          />
          <PrivateRoute
            path='/leadmatchview/:id'
            activeClass='leads'
            component={ViewLeadMatchPage}
          />
          <PrivateRoute
            path='/leadview/:id'
            activeClass='leads'
            component={ViewLeadPage}
          />
          <PrivateRoute
            path='/editoffer/:id'
            activeClass='leads'
            component={EditOfferedProperties}
          />
          <PrivateRoute
            path='/createoffer'
            activeClass='leads'
            component={AddOfferedProperties}
          />

          {/* REPORT */}
          <PrivateRoute
            path='/report'
            activeClass='report'
            component={ReportPage}
          />

          {/* MODULI */}
          <PrivateRoute
            path='/moduli'
            activeClass='moduli'
            component={ModuliPage}
          />
          <PrivateRoute
            path='/makleralleinauftrag'
            activeClass='moduli'
            component={MAAForm}
          />
          <PrivateRoute
            path='/provisionsbestaetigung'
            activeClass='moduli'
            component={ProvisionForm}
          />
          <PrivateRoute
            path='/widerrufsbelehrung'
            activeClass='moduli'
            component={VWBForm}
          />
          <PrivateRoute
            path='/vollmachtnotarauftrag'
            activeClass='moduli'
            component={NotarauftragForm}
          />
          <PrivateRoute
            path='/vollmachtunterlagen'
            activeClass='moduli'
            component={VollmachtForm}
          />
          <PrivateRoute
            path='/notardatenblatt'
            activeClass='moduli'
            component={NotarDatenblattForm}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(AppRouter);
