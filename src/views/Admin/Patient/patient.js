import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert';

class AdminPatient extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
     
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

        id:"",
        fname:"",
        lname:"",
        date:"",
        gender:"",
        cin:"",
        addressLine:"",
        city:"",
        states:"",
        zipCode:"",
        country:"",
        phone:"",
        emergencyPhone:"",
        email:"",
        occupation:"",
        bloodType:"",
        photo:"",
        username:"",
        password:"",
        height:"",
        weight:"0",
        idc:""
       
    };
    this.curr = new Date();
    this.id="0000";
    this.fname="Not Defined";
    this.lname="Not Defined";
 //   this.date="2019-04-25T22:53:06.736Z";
    this.cin="00000000";
    this.addressLine="Not Defined";
    this.city="Not Defined";
    this.states="Not Defined";
    this.zipCode="0000";
    this.country="Not Defined";
    this.phone="00000000";
    this.emergencyPhone="00000000";
    this.email="Not_Defined@gmail.com";
    this.occupation="Not Defined";
    this.bloodType="Not Defined";
    this.username="Not Defined";
    this.password="Not Defined";
    this.height=0;
    this.weight=0;
    this.idc="Not Defined";
    this.date = this.curr.toISOString().substr(0,10);
  }
  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}
getIdCard()
{
   fetch('http://localhost:4000/api/auth/card')
   .then(data => data.json())
   .then((data) => { if(typeof(data[0]) !== 'undefined'){this.setState({ idc: data[0] })} ;
   console.log(data[0]);
});

};
getFiles(files){
    this.setState({ photo: files.base64 })
  }
  addPatient(){
    fetch('http://192.168.75.139:3000/api/model.Patient', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "$class": "model.Patient",
                "patientId": this.state.id,
                 "firstName": this.state.fname,
                "lastName": this.state.lname,
                "photo": this.state.photo,
                 "Emprunt": this.state.idc,
                "gender": this.state.gender,
                 "dateOfBirth": this.state.date,
                "cin": this.state.cin,
                "address": {
                  "$class": "model.Address",
                  "addressLine": this.state.addressLine,
                  "city": this.state.city,
                   "state": this.state.states,
                   "zipCode": this.state.zipCode,
                 "country": this.state.country
                     },
                "phone": this.state.phone,
                "emergencyPhone": this.state.emergencyPhone,
                "email": this.state.email,
                "occupation": this.state.occupation,
                "bloodType":this.state.bloodType,
                "username":this.state.username,
                "password": this.state.password,
                "height": this.state.height,
                "weight": this.state.weight
            })
          })
          
          swal("Add Patient", "Patient succefully Added", "success");
        
    }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Add Patient </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <FormGroup row>
                    <Col md="3">
                      <Label>ID</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="id-input" name="id" placeholder="ID" onChange={ this.handleInputChange } value={ this.state.id }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>First Name</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="fname-input" name="fname" placeholder="First Name" onChange={ this.handleInputChange } value={ this.state.fname } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="lname-input" name="lname" placeholder="Last Name"  onChange={ this.handleInputChange } value={ this.state.lname } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Date of Birth</Label>
                    </Col>
                    <Col xs="12" md="9">

                      <Input type="date" id="date-input" name="date" placeholder="Date of Birth"  onChange={ this.handleInputChange } value={ this.state.date }  />
                    </Col> 
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Select Image</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <FileBase64
        multiple={ false }
        onDone={ this.getFiles.bind(this) } />
                      {/* <Input type="file" id="file-multiple-input" name="file-multiple-input"   /> */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Gender</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="gender" id="select" onChange={ this.handleInputChange } value={ this.state.gender }>
                        <option value="MALE">Please select</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>CIN</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="cin-input" name="cin" placeholder="CIN" onChange={ this.handleInputChange } value={ this.state.cin } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Address Line</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="addressLine-input" name="addressLine" placeholder="Address Line" onChange={ this.handleInputChange } value={ this.state.addressLine } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>city</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="city-input" name="city" placeholder="City" onChange={ this.handleInputChange } value={ this.state.city } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>State</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="state-input" name="states" placeholder="State" onChange={ this.handleInputChange } value={ this.state.states } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Zip Code</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="zipCode-input" name="zipCode" placeholder="Zip Code" onChange={ this.handleInputChange } value={ this.state.zipCode }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Country</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="country-input" name="country" placeholder="Country"  onChange={ this.handleInputChange } value={ this.state.country }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Phone</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="phone-input" name="phone" placeholder="Phone" onChange={ this.handleInputChange } value={ this.state.phone }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Emergency Phone</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="emergencyPhone" name="emergencyPhone" placeholder="Emergency Phone" onChange={ this.handleInputChange } value={ this.state.emergencyPhone }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Email</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="email" id="email-input" name="email" placeholder="Email" onChange={ this.handleInputChange } value={ this.state.email }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Occupation</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="occupation-input" name="occupation" placeholder="Occupation" onChange={ this.handleInputChange } value={ this.state.occupation }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Blood Type</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="bloodType-input" name="bloodType" placeholder="Blood Type" onChange={ this.handleInputChange } value={ this.state.bloodType }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Username</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="username-input" name="username" placeholder="Username" onChange={ this.handleInputChange } value={ this.state.username } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Password</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="password" id="password-input" name="password" placeholder="Password" onChange={ this.handleInputChange } value={ this.state.password }/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Height</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="height-input" name="height" placeholder="Height" onChange={ this.handleInputChange } value={ this.state.height }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Weight</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="number" id="weight-input" name="weight" placeholder="Weight" onChange={ this.handleInputChange } value={ this.state.weight }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>ID Card</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="idc-input" name="idc" placeholder="ID Card" onChange={ this.handleInputChange } value={ this.state.idc }  />
                    <Button color="danger" onClick={this.getIdCard.bind(this)}>GetId</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.addPatient.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminPatient;
