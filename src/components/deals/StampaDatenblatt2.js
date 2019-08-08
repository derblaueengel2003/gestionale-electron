import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { PDFExport } from '@progress/kendo-react-pdf'

export class StampaDatenblatt extends React.Component {
    exportPDF = () => {
        this.resume.save();
    }
    render() {
        const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
        const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
        const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
        const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
        const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
        
        return (               
            <div>
                <button onClick={this.exportPDF}>download</button>
                <PDFExport paperSize={'Letter'}
                    fileName="_____.pdf"
                    title=""
                    subject=""
                    keywords=""
                    ref={(r) => this.resume = r}>
                    <div style={{
                        height: 792,
                        width: 612,
                        padding: 'none',
                        backgroundColor: 'white',
                        boxShadow: '5px 5px 5px black',
                        margin: 'auto',
                        overflowX: 'hidden',
                        overflowY: 'hidden'
                    }}>
                        content
                    </div>
                </PDFExport>
            </div>
        )

    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.dealId),
    clienti: state.clienti,
    oggetti: state.oggetti,
    uid: state.auth.uid
})

export default connect(mapStateToProps)(StampaDatenblatt)