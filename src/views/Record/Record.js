import React, { Component } from 'react';
import RecordModal from '../Modals/RecordModal';
class Record extends Component{
  state = {
    role : ""
  };
  constructor(props) {
    super(props);
    this.state = {
      role : "admin",
      hasMedicalRecord : false,
    }
  };

  /**
   * This Method fetch from the api if the user has a medical record or not
   * Normally should be called in the constructor to initialize the state
   */
  hasMedicalRecord = () => {
    fetch("")
      .then(data => ()=> {
        data.json();
        this.setState({hasMedicalRecord : data});
      })
  };

  /**
   * This Method is to send a POST request to send the patient's medicalRecord info to the server in order to persist it
   * @param record
   */
  saveMedicalReord = (record) => {
    fetch("", {
      method: 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        age: record.age,
        previousDiseases: record.previousDiseases
      })
    })
  };
  /**
   * This Method updates the Modal status
   * @returns {boolean}
   */
  modalStatus = () => {
    return (this.state.role === 'user' && !this.state.hasMedicalRecord);
  };

  render() {
      return (
        <RecordModal modalStatus = {this.modalStatus()} />
        )
  };

}

export default Record;
