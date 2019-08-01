import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import {
    Document,
    Page,
    Text,
    View,
    Image,
    PDFDownloadLink,
    StyleSheet
} from "@react-pdf/renderer"

export class StampaDatenblatt extends React.Component {

    render() {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
            const styles = StyleSheet.create({
                page: {
                    flexDirection: "row",
                    bottom: 40
                },
                image: {
                    width: "30%",
                    paddingLeft: 30,
                    paddingTop: 30
                },
                alignImage: {
                    flexGrow: 1
                },
                title: {
                    width: "100%",
                    marginTop: 20,
                    textAlign: "center",

                },
                header: {
                    width: "100%",
                    marginTop: 20,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                    color: "#212121"
                },
                text: {
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 30
                }
            });
            const MyDoc = () => (
                <Document>
                    <Page style={styles.page} size="A4">
                        <View style={styles.alignImage}>
                            <Image style={styles.image} src="/images/logo.png" />
                            <Text style={styles.title}>
                                Datenblatt Wohnungskauf
                            </Text>
                            <Text style={styles.header}>
                                Objekt
                            </Text>
                            <Text style={styles.text}>
                                {`Adresse: ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}
                            </Text>
                            <Text style={styles.text}>
                                {`Grundbuch von ${oggetto.grundbuch}, Blatt Nr. ${oggetto.grundbuchBlatt}`}
                            </Text>
                            <Text style={styles.text}>
                                {`m2: ${oggetto.m2}`}
                            </Text>
                            <Text style={styles.text}>
                                {`Etage: ${oggetto.piano}`}
                            </Text>
                            <Text style={styles.text}>
                                {`Status: ${oggetto.stato}`}
                            </Text>
                            {oggetto.stato === 'vermietet' && <Text style={styles.text}>{`Kaltmiete: ${numeral(oggetto.affittoNetto / 100).format('0,0[.]00 $')}`}</Text>}
                            <Text style={styles.text}>
                                {`Wohngeld: ${numeral(oggetto.wohngeld / 100).format('0,0[.]00 $')}`}
                            </Text>
                            <Text style={styles.text}>
                                {`Kaufpreis: ${numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}`}
                            </Text>
                            <Text style={styles.text}>
                                Belastungsvollmacht: {this.props.deal.belastungsVollmacht ? `Ja` : `Nein`}
                            </Text>
                            <Text style={styles.text}>
                                {oggetto.mobilio && `Einrichtung: siehe Liste`}
                            </Text>
                            <Text style={styles.header}>Verkäufer</Text>
                            <Text style={styles.text}>
                                {`${venditore.titolo} ${venditore.nome} ${venditore.cognome} ${venditore.ditta && ` - Firma: ${venditore.ditta}`}`}
                            </Text>
                            <Text style={styles.text}>
                                Anschrift: {`${venditore.indirizzo} ${venditore.cap}, ${venditore.nazione}`}
                            </Text>
                            <Text style={styles.text}>
                                Kontaktdaten: {`Tel.: ${venditore.telefono1} - E-Mail: ${venditore.email}`}
                            </Text>
                            {this.props.deal.venditoreId2.length > 0 && <View>
                                <Text style={styles.header}>Verkäufer Nr. 2</Text>
                                <Text style={styles.text}>
                                   {`${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta && ` - Firma: ${venditore2.ditta}`}`}
                                </Text>
                                <Text style={styles.text}>
                                    Anschrift: {`${venditore2.indirizzo} ${venditore2.cap}, ${venditore2.nazione}`}
                                </Text>
                                <Text style={styles.text}>
                                    Kontaktdaten: {`Tel.: ${venditore2.telefono1} - E-Mail: ${venditore2.email}`}
                                </Text>
                            </View>
                            }   
                            <Text style={styles.header}>Käufer</Text>
                            <Text style={styles.text}>
                                {`${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta && ` - Firma: ${acquirente.ditta}`}`}
                            </Text>
                            <Text style={styles.text}>
                                Anschrift: {`${acquirente.indirizzo} ${acquirente.cap}, ${acquirente.nazione}`}
                            </Text>
                            <Text style={styles.text}>
                                Kontaktdaten: {`Tel.: ${acquirente.telefono1} - E-Mail: ${acquirente.email}`}
                            </Text>
                            {this.props.deal.acquirenteId2.length > 0 && <View>
                                <Text style={styles.header}>Käufer Nr. 2</Text>
                                <Text style={styles.text}>
                                    {`${acquirente2.titolo} ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}`}
                                </Text>
                                <Text style={styles.text}>
                                    Anschrift: {`${acquirente2.indirizzo} ${acquirente2.cap}, ${acquirente2.nazione}`}
                                </Text>
                                <Text style={styles.text}>
                                    Kontaktdaten: {`Tel.: ${acquirente2.telefono1} - E-Mail: ${acquirente2.email}`}
                                </Text>
                            </View>
                            }
                            <Text style={styles.header}>Verwalter</Text>
                            <Text style={styles.text}>
                                {`${oggetto.verwalter}`}
                            </Text>
                        </View>
                    </Page>
                    {oggetto.mobilio !== '' && <Page style={styles.page} size="A4">
                            <View style={styles.alignImage}>
                                <Image style={styles.image} src="/images/logo.png" />
                                <Text style={styles.header}>Einrichtung</Text>
                                <Text style={styles.text}>
                                    {`${oggetto.mobilio}`}
                                </Text>
                            </View>
                        </Page>}
                </Document>
            );
            const App = () => (
                <div>
                    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Danteblatt Notar')}
                    </PDFDownloadLink>
                </div>
            )

            return (               
                    <div>
                        <App />
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