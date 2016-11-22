
var Creator = React.createClass({
    request(value) {
        this.setState({items:results});
    },

    render() {
        return (
           <AutoComplete
               type={'textarea'}
               label={'XXX'}
               placeholder={'XXX required'}
               ref='refs'
               items={this.state.items}
               request={this.request}
               onChangeCallback={this.onChange}
               onSelectCallback={this.onSelceted}
               getId={
                   (item) => item.id
               }
               getValue={
                   (item) => item.value
               }
              />
        );
    },

});


var Updater = React.createClass({
    request(value) {
        this.setState({items:results});
    },

    render() {
        return (
           <AutoComplete
                    value={this.props.value}
                    type={'textarea'}
                    label={'Address'}
                    placeholder={'placeholder'}
                    ref='address'
                    items={this.state.items}
                    request={this.request}
                    onChangeCallback={this.onChange}
                    onSelectCallback={this.onSelceted}
                    onBlurCallback={this.onBlur}
                    getId={
                        (item) => item.id
                    }
                    getValue={
                        (item) => item.value
                    }
                />
        );
    },

});

