import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import DealDashboardPage from '../components/deals/DealDashboardPage';
import ReportPage from '../components/ReportPage';
import EditDealPage from '../components/deals/EditDealPage';
import ViewDealPage from '../components/deals/ViewDealPage';
import EditUtentePage from '../components/utenti/EditUtentePage';
import ViewUtentiPage from '../components/utenti/ViewUtentiPage';
import UtentiDashboardPage from '../components/utenti/UtentiDashboardPage';
import EditFirmaPage from '../components/firma/EditFirmaPage';
import ViewFirmaPage from '../components/firma/ViewFirmaPage';
import EditClientiPage from '../components/clienti/EditClientiPage';
import ViewClientiPage from '../components/clienti/ViewClientiPage';
import ClientiDashboardPage from '../components/clienti/ClientiDashboardPage';
import EditFatturaPage from '../components/fatture/EditFatturaPage';
import ViewFatturaPage from '../components/fatture/ViewFatturaPage';
import FattureDashboardPage from '../components/fatture/FattureDashboardPage';
import OggettiDashboardPage from '../components/oggetti/OggettiDashboardPage';
import ViewOggettiPage from '../components/oggetti/ViewOggettiPage';
import EditOggettoPage from '../components/oggetti/EditOggettoPage';
import ViewOggettoMatchPage from '../components/leads/ViewOggettoMatchPage';
import LeadsDashboardPage from '../components/leads/LeadsDashboardPage';
import EditLeadPage from '../components/leads/EditLeadPage';
import ViewLeadMatchPage from '../components/leads/ViewLeadMatchPage';
import ViewLeadPage from '../components/leads/ViewLeadPage';
import EditOfferedProperties from '../components/leads/EditOfferedProperties';
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
import EditEvaluation from '../components/evaluation/EditEvaluation';
import ViewEvaluation from '../components/evaluation/ViewEvaluation';
import NewsletterDashboard from '../components/newsletter/NewsletterDashboard';
import EditNewsletter from '../components/newsletter/EditNewsletter';
import ViewNewsletter from '../components/newsletter/ViewNewsletter';
import AddPage from '../components/common/AddPage';

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path='/' component={LoginPage} exact={true} />

          {/* DEALS */}
          <PrivateRoute
            path='/deals'
            activeClass='deals'
            component={DealDashboardPage}
          />
          <PrivateRoute
            path='/create'
            activeClass='deals'
            component={AddPage}
          />
          <PrivateRoute
            path='/edit/:id'
            activeClass='deals'
            component={EditDealPage}
          />
          <PrivateRoute
            path='/view/:id'
            activeClass='deals'
            component={ViewDealPage}
          />

          {/* CLIENTI */}
          <PrivateRoute
            path='/clienti'
            activeClass='clienti'
            component={ClientiDashboardPage}
          />
          <PrivateRoute
            path='/clienticreate'
            activeClass='clienti'
            component={AddPage}
          />
          <PrivateRoute
            path='/clientiedit/:id'
            activeClass='clienti'
            component={EditClientiPage}
          />
          <PrivateRoute
            path='/clientiview/:id'
            activeClass='clienti'
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
            component={AddPage}
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
            path='/evaluations'
            activeClass='evaluations'
            component={EvaluationDashboard}
          />
          <PrivateRoute
            path='/evaluationcreate'
            activeClass='evaluations'
            component={AddPage}
          />
          <PrivateRoute
            path='/evaluationedit/:id'
            activeClass='evaluations'
            component={EditEvaluation}
          />
          <PrivateRoute
            path='/evaluationview/:id'
            activeClass='evaluations'
            component={ViewEvaluation}
          />

          {/* NEWSLETTER */}
          <PrivateRoute
            path='/newsletters'
            activeClass='newsletters'
            component={NewsletterDashboard}
          />
          <PrivateRoute
            path='/newslettercreate'
            activeClass='newsletters'
            component={AddPage}
          />
          <PrivateRoute
            path='/newsletteredit/:id'
            activeClass='newsletters'
            component={EditNewsletter}
          />
          <PrivateRoute
            path='/newsletterview/:id'
            activeClass='newsletters'
            component={ViewNewsletter}
          />

          {/* UTENTI E DITTA */}
          <PrivateRoute
            path='/utenti'
            activeClass='utenti'
            component={UtentiDashboardPage}
          />
          <PrivateRoute
            path='/utenticreate'
            activeClass='utenti'
            component={AddPage}
          />
          <PrivateRoute
            path='/utentiedit/:id'
            activeClass='utenti'
            component={EditUtentePage}
          />
          <PrivateRoute
            path='/utentiview/:id'
            activeClass='utenti'
            component={ViewUtentiPage}
          />
          <PrivateRoute
            path='/firma'
            activeClass='firma'
            component={UtentiDashboardPage}
          />
          <PrivateRoute
            path='/firmacreate'
            activeClass='firma'
            component={AddPage}
          />
          <PrivateRoute
            path='/firmaview/:id'
            activeClass='firma'
            component={ViewFirmaPage}
          />
          <PrivateRoute
            path='/firmaedit/:id'
            activeClass='firma'
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
            component={AddPage}
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
            component={AddPage}
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
            activeClass='offers'
            component={EditOfferedProperties}
          />
          <PrivateRoute
            path='/createoffer'
            activeClass='offers'
            component={AddPage}
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
