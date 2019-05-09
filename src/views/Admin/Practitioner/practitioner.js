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

class AdminPractitioner extends Component {
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
        email:"",
        cin:"",
        addressLine:"",
        city:"",
        states:"",
        zipCode:"",
        country:"",
        phone:"",
        speciality:"",
        idc:""
       
    };
 
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
 
  addPractitioner(){
    fetch('http://192.168.75.139:3000/api/model.Practitioner', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "$class": "model.Practitioner",
                "pratitionerId": this.state.id,
                 "firstName": this.state.fname,
                "lastName": this.state.lname,
                "email": this.state.email,
                "cin": this.state.cin,
                "Emprunt": this.state.idc,
                "address": {
                  "$class": "model.Address",
                  "addressLine": this.state.addressLine,
                  "city": this.state.city,
                   "state": this.state.states,
                   "zipCode": this.state.zipCode,
                 "country": this.state.country
                     }, 
                "phoneNumber": this.state.phone,
                "speciality": this.state.speciality
               
            })
          })
          
          swal("Add Practitioner", "Practitioner succefully Added", "success");
        
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
                <strong>Add Practitioner </strong>
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
                      <Label>Email</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="email" id="email-input" name="email" placeholder="Email" onChange={ this.handleInputChange } value={ this.state.email }  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Speciality</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="speciality-input" name="speciality" placeholder="Speciality" onChange={ this.handleInputChange } value={ this.state.speciality }  />
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
                <Button type="submit" size="sm" color="primary" onClick={this.addPractitioner.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminPractitioner;
