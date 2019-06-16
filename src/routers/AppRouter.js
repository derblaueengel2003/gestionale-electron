import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import AddUserPage from '../components/AddUserPage'
import EditExpensePage from '../components/EditExpensePage'
import EditUtentePage from '../components/EditUtentePage'
import ViewExpensePage from '../components/ViewExpensePage'
import ViewUtentiPage from '../components/ViewUtentiPage'
import NotFoundPage from '../components/NotFoundPage'
import UtentiDashboardPage from '../components/UtentiDashboardPage'
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
                        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                        <PrivateRoute path="/create" component={AddExpensePage} />
                        <PrivateRoute path="/usercreate" component={AddUserPage} />
                        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                        <PrivateRoute path="/useredit/:id" component={EditUtentePage} />
                        <PrivateRoute path="/view/:id" component={ViewExpensePage} />
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
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/view/:id" component={ViewExpensePage} />
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