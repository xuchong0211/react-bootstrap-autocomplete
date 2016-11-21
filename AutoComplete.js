import React, {Component, PropTypes} from 'react';
import {Input, ListGroup, ListGroupItem} from 'react-bootstrap';

const initialState = {
    id: null,
    value: '',
    searchTimeout: null,
    data: null
};

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        ['onChange', 'onBlur'].forEach((m) => {
            this[m] = this[m].bind(this);
        })
    }
    onChange(event) {
        if (this.state.searchTimeout != null) {
            clearTimeout(this.state.searchTimeout);
        }
        const value = event.target.value;
        let searchTimeout = null;
        if (value != '') {
            searchTimeout = setTimeout( () => {
                this.props.request(value);
            }, this.props.requestDelayTime);
        }
        this.setState({
            id: null,
            value,
            searchTimeout,
        }, () => {
            if (this.props.onChangeCallback) {
                this.props.onChangeCallback();
            }
        });
    }
    onBlur () {
        setTimeout( () => {
            if (this.state.id == null) {
                this.setState({value: ''});
            }
        }, 300);
    }
    reset () {
        this.setState(initialState);
    }
    render() {
        const self = this;
        const divStyles = {
            position: 'absolute',
            marginTop: -15,
            zIndex: 99999,
            display: this.state.value != '' ? 'block' : 'none'
        };

        return <div>
            <Input
                type={this.props.type}
                label={this.props.label}
                placeholder={this.props.placeholder}
                rows={5}
                onChange={this.onChange}
                onBlur={this.onBlur}
                value={this.state.value}
                />
            <div style={divStyles}>
                <ListGroup style={{position: 'relative', top: 0, left: 0, margin: 0}}>
                    {
                        this.props.items.length > 0 ?
                            this.props.items.map((item, index) =>
                                <ListGroupItem
                                    key={'auto_complete_' + index}
                                    onClick={() => {
                                        self.setState({
                                            value: this.props.getValue(item),
                                            id: this.props.getId(item)
                                        }, ()=> {
                                            if (this.props.onSelectCallback) {
                                                this.props.onSelectCallback(item)
                                            }
                                        });
                                    }}
                                >
                                    {this.props.getValue(item)}
                                </ListGroupItem>
                            )
                            : null
                    }
                </ListGroup>
            </div>
        </div>
    }
}

AutoComplete.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    getId: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    request: PropTypes.func.isRequired,
    onChangeCallback: PropTypes.func,
    onSelectCallback: PropTypes.func,
    items: PropTypes.array,
    requestDelayTime: PropTypes.number
};

AutoComplete.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    requestDelayTime: 500,
    items: []
};
