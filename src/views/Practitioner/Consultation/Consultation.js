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

class Consultation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.curr = new Date();
    //this.curr.setDate(this.curr.getDate() + 3);
    this.date = this.curr.toISOString().substr(0,10);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      date:this.date,
      reason:"",
      output:"",
      notes:"",
    };
    this.handleChange=this.handleChange.bind(this);
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
      title: "Are you sure you want to add this condition ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,

    }).then(willAdd => {
      if (willAdd) {
    let id = Math.floor(1000 + Math.random() * 9000);
    fetch('http://localhost:3000/api/model.PractitionerAddConsultation', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "$class": "model.PractitionerAddConsultation",
  "consultation": {
    "$class": "model.Consultation",
    "consultationId": id+"",
    "consultionDate": this.state.date+"",
    "reason": this.state.reason,
    "output": this.state.output,
    "notes": this.state.notes,
    "practitioner": "resource:model.Practitioner#2222"
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
                <strong>Consultation Form </strong>
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
                      <Label htmlFor="reason">Reason behind consultation</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" style={{fontFamily: 'arial !important'}} name="reason" id="reason" rows="9" onChange={this.handleChange} placeholder="Content..." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="output">Consultation output</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="output" id="output" rows="9" onChange={this.handleChange} placeholder="Content..." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="notes">Additional Notes</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="notes" id="notes" rows="9" onChange={this.handleChange} placeholder="Content..." />
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

export default Consultation;
