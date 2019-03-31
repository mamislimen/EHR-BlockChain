import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { Form } from 'react-advanced-form';
import { Input, Button, Textarea } from 'react-advanced-form-addons'
import logo from '../../assets/img/logos/f1d0807f8ffad0197757d840bdc97d0b-medical-record-icon-by-vexels.png';
import './custom-animation.css';
import Drawer from 'react-drag-drawer'
import style from './custom-animation.css';
const blacklistedEmails = ['john@doe.com'];

class RecordModal extends Component{

  state = {
    open: this.props.modalStatus,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  registerUser = ({ serialized, fields, form }) => {
    alert(JSON.stringify(serialized, null, 2));

    /* Perform async request with the serialized data */
    return new Promise(resolve => resolve());
  };

  validateEmail = ({ value, fieldProps, fields, form }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValidEmail = !blacklistedEmails.includes(value);

        resolve({
          /* "valid" is reserved property stating that the field is valid */
          valid: isValidEmail,

          /**
           * You can pass any extra properties to be accessible in the
           * validation message resolver.
           */
          reason: 'Blacklisted!'
        });
      }, 2000);
    });
  };
  render() {

    const { open } = this.state;
    return (
      <div className="modal container">
        <Drawer
          open={open}
          onRequestClose={this.onCloseModal}
        >
          <div className={"messages"}>
            <h3>Woops! Looks Like This the first time you are using our service?</h3>
          <strong>In Order To Continue Using Our Service, We Need To Ensure First that You Created Your Medical Record.</strong>
          </div>
            <img src={logo} alt="medical record logo" height="180px" width="180px" style={{display: "block", margin: "auto"}} className="logo-record"/>
          <div className="col-md-12">
            <Form action={this.registerUser} style={{textAlign: "center", margin: "auto", width: "800px"}} className="row medical-record">
            <div className="col-md-12 form-border">
              <Input
              name="firstName"
              type="text"
              cssModule={style.inputForm}
              label="First Name"
              required />
            <Input className="inputs"
              name="lastName"
              type="text"
              label="Last Name"
              required/>
            <Input className="inputs"
              name="userEmail"
              type="email"
              label="E-mail"
              asyncRule={ this.validateEmail }
              required />
            <label className="sc-bwzfXH dybocD">Do you have any chronic condition ?</label>
              <textarea cols="10" rows="3" name="prevDiseases" className="diseases" placeholder="Example: Stroke, diabetes..."/>
              <br />
            </div>
              <button className="btn btn-primary save-btn" style={{width: "150px"}}>Save Record</button>
            </Form>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default RecordModal;
