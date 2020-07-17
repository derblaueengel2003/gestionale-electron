// import { ipcRenderer } from 'electron';

// state = {
// url: '',
// oggetto: null,

// handleFetch = async (e) => {
//   e.preventDefault();

//   ipcRenderer.send('oggetto:fetch', this.state.url);

//   ipcRenderer.on('oggetto:spinner', (event, spin) => {
//     spin
//       ? this.setState(() => ({ spinner: true }))
//       : this.setState(() => ({ spinner: false }));
//   });

//   ipcRenderer.on('oggetto:error', (event, error) => {
//     console.log(error);
//   });

//   ipcRenderer.on('oggetto:response', (event, oggetto) => {
//     if (!oggetto.affittoNetto) oggetto.affittoNetto = '0';
//     if (!oggetto.wohngeld) oggetto.wohngeld = '0';

//     for (let voce in oggetto) {
//       if (
//         voce === 'nazione' ||
//         voce == 'energieAusweisTyp' ||
//         voce === 'energieTraeger' ||
//         voce === 'heizungsart'
//       ) {
//         oggetto[voce] = this.props.t(oggetto[voce]);
//       }
//     }
//     oggetto.visible = true;
//     const indirizzo = oggetto.via.split(' ');
//     oggetto.numeroCivico = indirizzo.splice(-1)[0];
//     oggetto.via = indirizzo.join(' ');
//     oggetto.descrizioneDe = oggetto.descrizioneDe.replace(
//       /<\/?[^>]+(>|$)/g,
//       ''
//     );
//     oggetto.citta = oggetto.citta[0];

//     if (
//       oggetto.tipologia === 'Wohnungen' ||
//       oggetto.tipologia === 'Vermietete Wohnungen'
//     ) {
//       oggetto.tipologia = 'Eigentumswohnung';
//     }

//     console.log(oggetto);
//     oggetto.id && this.setState({ oggetto });
//   });
// };

// {
/* 
              <form className='form' onSubmit={this.handleFetch}>
                <div className='evaluation evaluation_rent'>
                  <input
                    type='text'
                    name='url'
                    value={this.state.url}
                    placeholder={this.props.t('property_slug')}
                    onChange={this.changeHandler}
                  />
                  <button className='btn green btn-margin'>
                    {this.props.t('property_fetch')}
                  </button>
                </div>
              </form>
              {this.state.spinner && (
                <div className='progress'>
                  <div className='indeterminate'></div>
                </div>
              )}
               */
// }
