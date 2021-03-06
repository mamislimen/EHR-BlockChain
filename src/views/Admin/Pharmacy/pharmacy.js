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

class AdminParmacy extends Component {
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
        name:"",
        addressLine:"",
        city:"",
        states:"",
        zipCode:"",
        country:"",
        phone:"",
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

  addParmacy(){
    fetch('http://192.168.75.139:3000/api/model.Pharmacy', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "$class": "model.Pharmacy",
                "pharmacyId": this.state.id,
                 "name": this.state.name,
                "address": {
                  "$class": "model.Address",
                  "addressLine": this.state.addressLine,
                  "city": this.state.city,
                   "state": this.state.states,
                   "zipCode": this.state.zipCode,
                 "country": this.state.country
                     },
                "Emprunt": this.state.idc,
                "phoneNumber": this.state.phone
            })
          })
          
          swal("Add Pharmacy", "Pharmacy succefully Added", "success");
        
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
                <strong>Add Pharmacy </strong>
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
                      <Label> Name</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Input type="text" id="fname-input" name="name" placeholder=" Name" onChange={ this.handleInputChange } value={ this.state.name } />
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
                <Button type="submit" size="sm" color="primary" onClick={this.addParmacy.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminParmacy;
