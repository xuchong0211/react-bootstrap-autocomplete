import React, {Component, PropTypes} from 'react';
import {Input, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.defaultValue = this.props.value;
        this.state = {
            id: null,
            value: this.props.value,
            searchTimeout: null,
            data: null
        };
        ['onChange', 'onBlur'].forEach((m) => {
            this[m] = this[m].bind(this);
        })
    }
    componentWillUnmount() {
        if (this.state.searchTimeout) {
            clearTimeout(this.state.searchTimeout);
        }
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
                this.props.onChangeCallback(value);
            }
        });
    }
    onBlur () {
        setTimeout( () => {
            if (this.state.id == null) {
                if (this.state.value == '' || this.state.value == undefined) {
                    this.defaultValue = '';
                }
                this.setState({value: this.defaultValue}, ()=> {
                    if (this.props.onBlurCallback) {
                        this.props.onBlurCallback();
                    }
                });
            }
        }, 300);
    }
    reset () {
        this.setState({
            id: null,
            value: this.props.value,
            searchTimeout: null,
            data: null
        });
    }
    render() {
        const self = this;
        const divStyles = {
            position: 'absolute',
            marginTop: -15,
            zIndex: 99999,
            display: this.state.value != this.props.value ? 'block' : 'none'
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
                                        self.defaultValue = self.props.getValue(item);
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
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    getId: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    request: PropTypes.func.isRequired,
    onBlurCallback: PropTypes.func,
    onChangeCallback: PropTypes.func,
    onSelectCallback: PropTypes.func,
    items: PropTypes.array,
    requestDelayTime: PropTypes.number
};

AutoComplete.defaultProps = {
    value: '',
    type: 'text',
    label: '',
    placeholder: '',
    requestDelayTime: 500,
    items: []
};
