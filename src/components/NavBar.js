import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const NavBar = ({ uid }) => {

    return (
        <div className="content-container page-header__navbar">
            <div className="show-for-mobile">            
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/dashboard"><li>Provvigioni</li></Link>
                        <Link to="/leads"><li>Richieste</li></Link>
                        <Link to="/moduli"><li>Modulistica</li></Link>
                        <Link to="/oggetti"><li>Oggetti</li></Link>
                        <Link to="/customer"><li>Contatti</li></Link>
                        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link to="/report"><li>Report</li></Link>}
                        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link to="/users"><li>Utenti</li></Link>}
                    </ul>
                </div>
            </div>
            <div className="content-container show-for-desktop">            
                <Link className="button page-header__button" to="/dashboard">Provvigioni</Link>
                <Link className="button page-header__button" to="/leads">Richieste</Link>
                <Link className="button page-header__button" to="/moduli">Modulistica</Link>
                <Link className="button page-header__button" to="/oggetti">Oggetti</Link>
                <Link className="button page-header__button" to="/customer">Contatti</Link>
                {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link className="button page-header__button" to="/report">Report</Link>}
                {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link className="button page-header__button" to="/users">Utenti</Link>}
            </div>
        </div>
)}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(NavBar)