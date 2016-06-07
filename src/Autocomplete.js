import React from 'react';

export class Autocomplete extends React.Component {
    constructor () {
        super();

        this.state = {
            allElements: ['Abacaxi', 'Banana', 'Caqui',
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
            elements: []
        }

        // :/
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        const { allElements } = this.state;

        var filtro = e.target.value.toUpperCase();

        if (filtro == '') {
            this.setState({
                allElements,
                elements: []
            });
        }
        else {
            const LIMIT = 100;

            const elements = allElements
                .filter(function (nomeDaFruta, i) {
                    return nomeDaFruta.toUpperCase().indexOf(filtro) > -1 && i < LIMIT;
                })
                .map(function (nomeDaFruta) {
                    const index = nomeDaFruta.toUpperCase().indexOf(filtro);

                    const toReplace = nomeDaFruta.substr(index, filtro.length);

                    return nomeDaFruta.replace(toReplace, `<span class="mark">${toReplace}</span>`);
                });

            if (elements.length > 0) {
                this.setState({
                    allElements,
                    elements
                });
            }
            else {
                this.setState({
                    allElements,
                    elements: []
                });
            }
        }
    }

    render () {
        return (
            <div className="og-autocomplete">
                <div>
                    <input placeholder={this.props['placeholder-text']} type="text" className="og-input" onChange={this.onChange} />
                </div>
                <List items={this.state.elements}></List>
            </div>
        )
    }
}

class List extends React.Component {
    render () {
        let nodes = this.props.items.map(function (elemento) {
            return <ListItem key={elemento} text={elemento}>{elemento}</ListItem>;
        });

        return <div className="og-list">{nodes}</div>;
    }
}

class ListItem extends React.Component {
    render () {
        const markup = {
            __html: this.props.text
        };

        return <div className="og-list-item" dangerouslySetInnerHTML={markup}></div>;
    }
}
