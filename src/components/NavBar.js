import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const NavBar = ({ uid }) => {
    const adminNavbar = (
        <div>
            <Link className="button" to="/dashboard">Provvigioni</Link>
            <Link className="button" to="/report">Report</Link>
            <Link className="button" to="/oggetti">Oggetti</Link>
            <Link className="button" to="/customer">Contatti</Link>
            <Link className="button" to="/users">Utenti</Link>
            <Link className="button" to="/fatture">Fatture</Link>
        </div>
    )
    return (
        <div className="content-container page-header__actionss">
        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && adminNavbar}
    </div>
)}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(NavBar)