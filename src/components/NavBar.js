import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const NavBar = ({ uid }) => {
    const adminNavbar = (
        <div>
            <Link className="button page-header__button" to="/report">Report</Link>
            <Link className="button page-header__button" to="/oggetti">Oggetti</Link>
            <Link className="button page-header__button" to="/customer">Contatti</Link>
            <Link className="button page-header__button" to="/users">Utenti</Link>
        </div>
    )
    return (
        <div className="content-container page-header__navbar">
            <Link className="button page-header__button" to="/dashboard">Provvigioni</Link>
            <Link className="button page-header__button" to="/leads">Richieste</Link>
            <Link className="button page-header__button" to="/moduli">Modulistica</Link>
            {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && adminNavbar}
        </div>
)}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(NavBar)