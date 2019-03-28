import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { Form } from 'react-advanced-form';
import { Input, Button, Textarea } from 'react-advanced-form-addons'
import logo from '../../assets/img/logos/f1d0807f8ffad0197757d840bdc97d0b-medical-record-icon-by-vexels.png';
import './custom-animation.css';
import Drawer from 'react-drag-drawer'

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
      <div className="modal">
        <Drawer
          open={open}
          onRequestClose={this.onCloseModal}

        >
          <div className={"messages"}>
            <h3>Woops! Looks Like This the first time you are using our service?</h3>
          <strong>In Order To Resume Using Our Service, We Need To Ensure First stat You Created Your Medical Record.</strong>
           <br />
            <pre>Please Fill In Your Details Below</pre>
          </div>
            <img src={logo} alt="medical record logo" height="200px" width="200px" style={{display: "block", margin: "auto"}}/>
          <Form action={this.registerUser} style={{textAlign: "center", margin: "auto", width: "800px"}}>
            <Input className="inputs"
              name="firstName"
              type="text"
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
            <label className="sc-bwzfXH dybocD">Do you have any previous relevant diseases ?</label>
              <textarea cols="35" rows="4" name="prevDiseases"/>
              <br />
            <Button primary>Register</Button>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default RecordModal;
