import React from 'react';
import DisableKeyboard from 'react-native-formik/src/withPickerValues/DisableKeyboard';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextField as MaterialTextInput } from 'react-native-material-textfield';
import { format } from 'date-fns';
import moment from 'moment';
import timezone from 'moment-timezone';

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    //Sets the value to the props value in the higher component.
    this.state = {
      pickerOpened: false,
      value: props.value ? props.value : null
    };
  }

  focus = () => this.openPicker();

  openPicker = () => {
    this.setState({ pickerOpened: true });
  };

  closePicker = () =>
    this.setState({ pickerOpened: false }, () => {
      this.props.setFieldTouched();
    });

  handleDatePicked = value => {
    //parse date in the visual format for the user
    let parsedDate = moment(value).format('DD-MM-YYYY HH:mm');
    //set this component state value to the parsed date, in order to the Material Text Input gets updated
    this.setState({ value: parsedDate });
    //Call the props setFieldValue, to handle the output in the higher level component
    this.props.setFieldValue(value);
    //close the picker
    this.closePicker();
    if (this.props.onSubmitEditing) this.props.onSubmitEditing();
  };

  render() {
    return (
      <React.Fragment>
        <DisableKeyboard onPress={this.openPicker}>
          <MaterialTextInput
            {...this.props}
            value={this.state.value || undefined}
          />
        </DisableKeyboard>
        <DateTimePicker
          mode='datetime'
          isVisible={this.state.pickerOpened}
          onConfirm={this.handleDatePicked}
          onCancel={this.closePicker}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default DatePicker;
