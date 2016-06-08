import React from 'react';

export class Autocomplete extends React.Component {
    constructor () {
        super();

        this.state = {
            elementos: ['Abacaxi', 'Banana', 'Caqui',
                'Damasco', 'Figo', 'Goiaba',
                'Jaca', 'Kiwi', 'Laranja',
                'Melancia', 'Nectarina', 'Pessego',
                'Romã', 'Tangerina', 'Uva',
                'Abacate', 'Açaí', 'Acerola',
                'Amora', 'Cacau', 'Caju',
                'Graviola', 'Groselha', 'Guaraná',
                'Limão', 'Manga', 'Morango',
                'Tomate'
            ],
            elementosSelecionados: [],
            filtro: ''
        }

        // :/
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        const { elementos } = this.state;

        var filtro = e.target.value.toUpperCase();

        if (filtro == '') {
            this.setState({
                elementos,
                elementosSelecionados: [],
                filtro: ''
            });
        }
        else {
            const elementosSelecionados = elementos.filter((nomeDaFruta, i) => nomeDaFruta.toUpperCase().indexOf(filtro) > -1);

            this.setState({
                elementos,
                elementosSelecionados: elementosSelecionados,
                filtro: filtro
            });
        }
    }

    render () {
        return (
            <div className="og-autocomplete">
                <div>
                    <input placeholder={this.props['placeholder-text']} type="text" className="og-input" onChange={this.onChange} />
                </div>
                <List items={this.state.elementosSelecionados} filtro={this.state.filtro}></List>
            </div>
        );
    }
}

class List extends React.Component {
    render () {
        let itens = this.props.items.map((elemento) => <ListItem key={elemento} text={elemento} filtro={this.props.filtro}></ListItem>);

        if (itens.length == 0 && this.props.filtro != '') {
            return (
                <div className="og-list">
                    <div className="og-list-item og-list-item-not-found">Urgh! :(</div>
                </div>
            );
        }
        else {
            return (
                <div className="og-list">{itens}</div>
            );
        }
    }
}

class ListItem extends React.Component {
    render () {
        const nomeDaFruta = this.props.text;
        const index = nomeDaFruta.toUpperCase().indexOf(this.props.filtro);
        const toReplace = nomeDaFruta.substr(index, this.props.filtro.length);
        const nomeDaFrutaMarkup = nomeDaFruta.replace(toReplace, `<span class="mark">${toReplace}</span>`);

        const markup = {
            __html: `<div class="og-list-item-content">${nomeDaFrutaMarkup}</div>`
        };

        return (
            <div className="og-list-item" dangerouslySetInnerHTML={markup}></div>
        );
    }
}
