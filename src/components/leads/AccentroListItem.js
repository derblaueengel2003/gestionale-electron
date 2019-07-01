import React from 'react'
import numeral from 'numeral'

export const AccentroListItem = (props) => {
    return (
        <div className="row" key={props.id}>
            <div className="col-4-of-6">
                <h4 className="list-item__title">{props.Strasse}</h4>
                <div className="list-item__sub-title">WEG: {props.WEG}</div>
                <div className="list-item__sub-title">ETW: {props.ETW}</div>
                <div className="list-item__sub-title">Prezzo: {numeral(props.Kaufpreis / 100).format('0,0[.]00 $')}</div>
                <div className="list-item__sub-title">m2: {props.m2}</div>
                <div className="list-item__sub-title">Vani: {props.Vani}</div>
                <div className="list-item__sub-title">Quartiere: {props.Bezirk}</div>
            </div>
            <div className="col-2-of-6">
                <div className="list-item__sub-title">Piano: {props.Etage}</div>
                <div className="list-item__sub-title">Affitto netto: {numeral(props.Miete / 100).format('0,0[.]00 $')}</div>
                <div className="list-item__sub-title">Wohngeld: {numeral(props.Wohngeld / 100).format('0,0[.]00 $')}</div>
                <div className="list-item__sub-title">Balcone: {props.Balcone}</div>
                <div className="list-item__sub-title">Ascensore: {props.Aufzug}</div>
            </div>
        </div>

    )
}