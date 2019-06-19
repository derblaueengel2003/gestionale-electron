import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import DealDashboardPage from '../components/deals/DealDashboardPage'
import AddDealPage from '../components/deals/AddDealPage'
import EditDealPage from '../components/deals/EditDealPage'
import ViewDealPage from '../components/deals/ViewDealPage'
import AddUserPage from '../components/utenti/AddUserPage'
import EditUtentePage from '../components/utenti/EditUtentePage'
import ViewUtentiPage from '../components/utenti/ViewUtentiPage'
import UtentiDashboardPage from '../components/utenti/UtentiDashboardPage'
import AddClientiPage from '../components/clienti/AddClientiPage'
import EditClientiPage from '../components/clienti/EditClientiPage'
import ViewClientiPage from '../components/clienti/ViewClientiPage'
import ClientiDashboardPage from '../components/clienti/ClientiDashboardPage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = ({ uid }) => {
    if (uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2') {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true} />
                        <PrivateRoute path="/dashboard" component={DealDashboardPage} />
                        <PrivateRoute path="/create" component={AddDealPage} />
                        <PrivateRoute path="/usercreate" component={AddUserPage} />
                        <PrivateRoute path="/customercreate" component={AddClientiPage} />
                        <PrivateRoute path="/edit/:id" component={EditDealPage} />
                        <PrivateRoute path="/useredit/:id" component={EditUtentePage} />
                        <PrivateRoute path="/customeredit/:id" component={EditClientiPage} />
                        <PrivateRoute path="/view/:id" component={ViewDealPage} />
                        <PrivateRoute path="/userview/:id" component={ViewUtentiPage} />
                        <PrivateRoute path="/customerview/:id" component={ViewClientiPage} />
                        <PrivateRoute path="/users" component={UtentiDashboardPage} />
                        <PrivateRoute path="/customer" component={ClientiDashboardPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        )
    } else {
        return <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DealDashboardPage} />
                <PrivateRoute path="/view/:id" component={ViewDealPage} />
                <PrivateRoute path="/customer" component={ClientiDashboardPage} />
                <PrivateRoute path="/customercreate" component={AddClientiPage} />
                <PrivateRoute path="/customeredit/:id" component={EditClientiPage} />
                <PrivateRoute path="/customerview/:id" component={ViewClientiPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AppRouter)