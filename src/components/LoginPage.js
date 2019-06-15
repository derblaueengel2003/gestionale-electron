import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Gestionale m2Square</h1>
            <p>Per accedere inserire email e password</p>
            <input id="email" type="email" name="email" placeholder="email"/>
            <input id="password" type="password" name="password" placeholder="password"/>
            <button className="button" onClick={startLogin}>Login</button>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
