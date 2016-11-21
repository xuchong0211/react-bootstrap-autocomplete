
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
               ref='address'
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

