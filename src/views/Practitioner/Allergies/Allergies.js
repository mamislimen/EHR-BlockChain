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
import swal from 'sweetalert';

class Allergies extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.curr = new Date();
    //this.curr.setDate(this.curr.getDate() + 3);
    this.date = this.curr.toISOString().substr(0,10);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      allergy:"",
      treatment:"",
      date:this.date
    };

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  submit = (e) => {
    swal({
      title: "Are you sure you want to add this allergy ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,

    }).then(willAdd => {
      if (willAdd) {
    let id = Math.floor(1000 + Math.random() * 9000);
    fetch('http://localhost:3000/api/model.PractitionerAddAllergie', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "$class": "model.PractitionerAddAllergie",
  "allergie": {
    "$class": "model.Allergies",
    "allergyId": id+"",
    "name": this.state.allergy,
    "practitioner": "resource:model.Practitioner#2222",
    "treatmentBrief": this.state.treatment
  },
  "patient": "resource:model.Patient#1111",
  "practitioner": "resource:model.Practitioner#2222"
  })
}).then(function(response) {
  if(response.status==200){
    swal("Added!", "Condition added succefully to record", "success");
  }else{
    swal("Error!", "An error accured", "error");
  }
  console.log (response.text())
}, function(error) {
  console.log (error.message) //=> String
})
}
});
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Allergies Form </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Patient's name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">Username</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Practitioner's name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">Username</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date">Date of Consultataion</Label>
                    </Col>
                    <Col xs="12" md="9">

                      <Input type="date" id="date" name="date" placeholder="date" defaultValue={this.date} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="allergy">Name of the Allergy
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="allergy"  id="allergy" placeholder="Allergy" onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="treatment">Treatement brief</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="treatment" id="treatment" rows="9" onChange={this.handleChange} placeholder="Treatement brief..." />
                    </Col>
                  </FormGroup>
                
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.submit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Allergies;
