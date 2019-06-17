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
                        <PrivateRoute path="/edit/:id" component={EditDealPage} />
                        <PrivateRoute path="/useredit/:id" component={EditUtentePage} />
                        <PrivateRoute path="/view/:id" component={ViewDealPage} />
                        <PrivateRoute path="/userview/:id" component={ViewUtentiPage} />
                        <PrivateRoute path="/users" component={UtentiDashboardPage} />
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