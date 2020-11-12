import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class OggettoForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { oggetti } = this.props.data;

    const wohngeld = parseFloat(oggetti.wohngeld.replace(/,/, '.'), 10) * 100;
    const affittoNetto =
      parseFloat(oggetti.affittoNetto.replace(/,/, '.'), 10) * 100;
    const kaufpreis = parseFloat(oggetti.kaufpreis.replace(/,/, '.'), 10) * 100;

    if (!oggetti.via || !oggetti.rifId) {
      this.props.renderError(this.props.t('property_form_submit_error'));
    } else {
      this.props.renderError('');

      this.props.onSubmit({
        affittoNetto,
        amtsgericht: oggetti.amtsgericht,
        ascensore: oggetti.ascensore,
        bagni: oggetti.bagni,
        balcone: oggetti.balcone,
        baujahr: oggetti.baujahr,
        cap: oggetti.cap,
        citta: oggetti.citta,
        cantina: oggetti.cantina,
        condizioni: oggetti.condizioni,
        cloudURL: oggetti.cloudURL,
        dataInserimentoOggetto: oggetti.dataInserimentoOggetto
          ? oggetti.dataInserimentoOggetto.valueOf()
          : null,
        dataModificaOggetto: oggetti.dataModificaOggetto
          ? oggetti.dataModificaOggetto.valueOf()
          : null,
        descrizione: oggetti.descrizione,
        descrizioneDe: oggetti.descrizioneDe,
        descrizioneEn: oggetti.descrizioneEn,
        downloadURLs: oggetti.downloadURLs || [],
        downloadURLsId: oggetti.downloadURLsId || [],
        downloadURLsCover: oggetti.downloadURLsCover || [],
        downloadURLsCoverId: oggetti.downloadURLsCoverId || [],
        downloadURLsGrundriss: oggetti.downloadURLsGrundriss || [],
        downloadURLsGrundrissId: oggetti.downloadURLsGrundrissId || [],
        energieAusweisTyp: oggetti.energieAusweisTyp,
        energieAusweisBis: oggetti.energieAusweisBis,
        energieBedarf: oggetti.energieBedarf,
        energieTraeger: oggetti.energieTraeger,
        featuredProperty: oggetti.featuredProperty,
        filenames: oggetti.filenames,
        filenamesCover: oggetti.filenamesCover,
        filenamesGrundriss: oggetti.filenamesGrundriss,
        giardino: oggetti.giardino,
        grundbuch: oggetti.grundbuch,
        grundbuchBlatt: oggetti.grundbuchBlatt,
        heizungsart: oggetti.heizungsart,
        inquilinoId: oggetti.inquilinoId,
        kaufpreis,
        m2: oggetti.m2,
        mobilio: oggetti.mobilio,
        nazione: oggetti.nazione,
        note: oggetti.note,
        numeroCivico: oggetti.numeroCivico,
        numeroAppartamento: oggetti.numeroAppartamento,
        piano: oggetti.piano,
        prenotato: oggetti.prenotato,
        proprietarioId: oggetti.proprietarioId,
        proprietarioId2: oggetti.proprietarioId2,
        provvigione: oggetti.provvigione,
        quartiere: oggetti.quartiere,
        rifId: oggetti.rifId,
        ruecklage: oggetti.ruecklage,
        stato: oggetti.stato,
        status: oggetti.status,
        themeSlider: oggetti.themeSlider,
        tipologia: oggetti.tipologia,
        titolo: oggetti.titolo,
        titoloEn: oggetti.titoloEn,
        titoloDe: oggetti.titoloDe,
        vani: oggetti.vani,
        verwalter: oggetti.verwalter,
        venduto: oggetti.venduto,
        via: oggetti.via,
        videoId: oggetti.videoId,
        visible: oggetti.visible,
        wohngeld,
      });
    }
  };
  render() {
    const {
      t,
      renderTextArea,
      renderCheckbox,
      renderSelect,
      renderInput,
      renderUploadImage,
      changeHandlerValuta,
    } = this.props;

    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- ${t('company')} ${cliente.ditta}`
      }`,
    }));

    const optionsQuartiere = [
      'Charlottenburg',
      'Friedrichshain',
      'Hohenschonhausen',
      'Kreuzberg',
      'Lichtenberg',
      'Lichtenrade',
      'Mitte',
      'Moabit',
      'Neukölln',
      'Pankow',
      'Prenzlauer Berg',
      'Reinickendorf',
      'Schöneberg',
      'Spandau',
      'Steglitz',
      'Tegel',
      'Tempelhof',
      'Tiergarten',
      'Treptow-Köpenick',
      'Wedding',
      'Weißensee',
      'Wilmersdorf',
      'Zehlendorf',
    ].map((quartiere) => ({
      value: quartiere,
      label: quartiere,
    }));

    const optionsTipologia = [
      'property_apt',
      'property_commercial',
      'property_nursing_home',
      'property_other',
    ].map((dealType) => ({
      value: dealType,
      label: t(dealType),
    }));
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}{' '}
        <div className='fixed-action-btn'>
          <button className='btn-floating blue btn-large'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        <div className='row'>
          <div className='col s12'>
            <ul
              ref={(Tabs) => {
                this.Tabs = Tabs;
              }}
              className='tabs'
            >
              <li className='tab col s4'>
                <a className='active' href='#test1'>
                  {t('Dati principali')}
                </a>
              </li>
              <li className='tab col s4'>
                <a href='#test2'>Exposé</a>
              </li>
              <li className='tab col s4'>
                <a href='#test3'>{t('Immagini')}</a>
              </li>
            </ul>
          </div>
          <div id='test1' className='col s12'>
            <div label='Eckdaten'>
              {renderSelect(
                'oggetti',
                'tipologia',
                optionsTipologia,
                t('Tipo di immobile')
              )}
              {renderInput(
                'oggetti',
                'via',
                t('address'),
                undefined,
                undefined,
                undefined,
                undefined,
                '*'
              )}
              {renderInput('oggetti', 'numeroCivico', 'Nr.')}
              {renderInput('oggetti', 'cap', t('zipcode'))}
              {renderSelect(
                'oggetti',
                'quartiere',
                optionsQuartiere,
                t('Quartiere')
              )}
              {renderSelect(
                'oggetti',
                'citta',
                [
                  { value: 'Berlin', label: 'Berlin' },
                  { value: 'Leipzig', label: 'Leipzig' },
                ],
                t('city')
              )}
              {renderInput('oggetti', 'nazione', t('nation'))}
              {renderInput(
                'oggetti',
                'numeroAppartamento',
                t('Numero appartamento')
              )}
              {renderInput(
                'oggetti',
                'rifId',
                t('Rif') + '. ID',
                undefined,
                undefined,
                undefined,
                undefined,
                '*'
              )}
              {renderInput(
                'oggetti',
                'amtsgericht',
                t('Pretura (Amtsgericht)')
              )}
              {renderInput(
                'oggetti',
                'grundbuch',
                t('Libro Fondiario (Grundbuch)')
              )}
              {renderInput('oggetti', 'grundbuchBlatt', t('Foglio'))}
              {renderInput('oggetti', 'm2', 'M2')}
              {renderInput('oggetti', 'piano', t('Piano'))}
              {renderTextArea('oggetti', 'mobilio', t('Mobili e valore'))}
              {renderSelect(
                'oggetti',
                'stato',
                [
                  { value: 'vacant', label: t('vacant') },
                  { value: 'rented', label: t('rented') },
                ],
                t('Stato abitativo')
              )}
              {renderInput(
                'oggetti',
                'wohngeld',
                t('Quota condominiale'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'oggetti',
                'ruecklage',
                t('Fondo di accantonamento per manutenzione'),
                undefined,
                undefined,
                undefined,
                'Gesamt oder anteilig?'
              )}
              {renderInput(
                'oggetti',
                'affittoNetto',
                t('Affitto netto'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'oggetti',
                'kaufpreis',
                t('Prezzo di vendita'),
                'text',
                changeHandlerValuta
              )}
              {renderSelect(
                'oggetti',
                'verwalter',
                options,
                t('Amministratore di condominio')
              )}
              {renderSelect(
                'oggetti',
                'proprietarioId',
                options,
                t('Proprietario')
              )}
              {renderSelect(
                'oggetti',
                'proprietarioId2',
                options,
                '2. ' + t('Proprietario')
              )}
              {renderSelect('oggetti', 'inquilinoId', options, t('Inquilino'))}
              {renderInput(
                'oggetti',
                'cloudURL',
                'Cloud URL',
                undefined,
                undefined,
                undefined,
                'http://www...'
              )}
              {renderInput('oggetti', 'videoId', 'YouTube Video ID')}
              {renderTextArea('oggetti', 'note')}

              {renderCheckbox('oggetti', 'status', t('property_status'))}
              {renderCheckbox('oggetti', 'venduto', t('Venduto'))}
              {renderCheckbox('oggetti', 'prenotato', t('reserved'))}

              {renderCheckbox(
                'oggetti',
                'featuredProperty',
                t('featured_property')
              )}

              {this.props.utente && this.props.utente.role === 'Admin'
                ? renderCheckbox('oggetti', 'visible', t('visible'))
                : ''}
            </div>
          </div>
          <div id='test2' className='col s12'>
            <div label='Exposé'>
              {/* Exposé */}
              {renderInput(
                'oggetti',
                'titolo',
                `${t('Titolo principale')} ${t('italiano')}`,
                undefined,
                undefined,
                undefined,
                'Titolo in italiano'
              )}
              {renderTextArea(
                'oggetti',
                'descrizione',
                `${t('Descrizione')} ${t('italiano')}`
              )}
              {renderInput(
                'oggetti',
                'titoloDe',
                `${t('Titolo principale')} ${t('tedesco')}`,
                undefined,
                undefined,
                undefined,
                'Überschrift des Exposés'
              )}
              {renderTextArea(
                'oggetti',
                'descrizioneDe',
                `${t('Descrizione')} ${t('tedesco')}`
              )}
              {renderInput(
                'oggetti',
                'titoloEn',
                `${t('Titolo principale')} ${t('inglese')}`,
                undefined,
                undefined,
                undefined,
                'English title'
              )}
              {renderTextArea(
                'oggetti',
                'descrizioneEn',
                `${t('Descrizione')} ${t('inglese')}`
              )}
              {renderInput('oggetti', 'vani', t('Vani'))}
              {renderInput('oggetti', 'bagni', t('Bagni'))}
              {renderSelect(
                'oggetti',
                'condizioni',
                [
                  { value: 'new', label: t('new') },
                  { value: 'good', label: t('good') },
                  {
                    value: 'to_renovate',
                    label: t('to_renovate'),
                  },
                ],
                t('property_condition')
              )}
              {renderInput('oggetti', 'baujahr', t('Anno di costruzione'))}
              {renderSelect(
                'oggetti',
                'energieAusweisTyp',
                [
                  {
                    value: 'based_on_consumption',
                    label: t('based_on_consumption'),
                  },
                  {
                    value: 'based_on_requirement',
                    label: t('based_on_requirement'),
                  },
                ],
                t('Certificato energetico - tipologia')
              )}
              {renderInput(
                'oggetti',
                'energieAusweisBis',
                t('Certificato energetico - valido fino al')
              )}
              {renderSelect(
                'oggetti',
                'heizungsart',
                [
                  {
                    value: 'heating_central',
                    label: t('heating_central'),
                  },
                  {
                    value: 'heating_floor',
                    label: t('heating_floor'),
                  },
                ],
                t('Tipologia riscaldamento')
              )}
              {renderSelect(
                'oggetti',
                'energieTraeger',
                [
                  {
                    value: 'heating_gas',
                    label: t('heating_gas'),
                  },
                  {
                    value: 'heating_oil',
                    label: t('heating_oil'),
                  },
                  {
                    value: 'heating_district',
                    label: t('heating_district'),
                  },
                ],
                t('Fonte energetica')
              )}

              {renderInput(
                'oggetti',
                'energieBedarf',
                t('energy_consumption_kwh')
              )}
              {renderInput(
                'oggetti',
                'provvigione',
                t('Provvigione'),
                undefined,
                undefined,
                undefined,
                t("IVA inclusa, senza '%'")
              )}
              {renderCheckbox('oggetti', 'balcone', t('Balcone'))}
              {renderCheckbox('oggetti', 'ascensore', t('Ascensore'))}
              {renderCheckbox('oggetti', 'giardino', t('Giardino'))}
              {renderCheckbox('oggetti', 'cantina', t('Cantina'))}
            </div>
          </div>
          <div id='test3' className='col s12'>
            <ul className='collection'>
              {/* Cover */}
              {renderUploadImage('oggetti', 'downloadURLsCover', 'Cover')}

              {/* Bilder */}
              {renderUploadImage('oggetti', 'downloadURLs', t('images'))}

              {/* Grundriss */}
              {renderUploadImage(
                'oggetti',
                'downloadURLsGrundriss',
                t('floor_plan')
              )}
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  clienti: state.clienti,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(OggettoForm))
);
