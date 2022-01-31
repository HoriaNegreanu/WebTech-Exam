import React, { Component } from 'react';
import DatePicker from "react-datepicker";

class Simpledatepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
        }
    }
    onChangeEvent = event => {
        console.log(event);
        this.setState({ selectedDate: event });
    };

    render() {
        return (
            <div>
                <p> date picker Simple example </p>
                <DatePicker
                
                    selected={this.state.selectedDate}
                    onChange={this.onChangeEvent}
                />
            </div>
        );
    }
}

export default Simpledatepicker;