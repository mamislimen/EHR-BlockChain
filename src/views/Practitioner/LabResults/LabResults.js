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

class LabResults extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.curr = new Date();
    this.date = this.curr.toISOString().substr(0,10);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      labres:"",
      date:this.date,
      data:null,
      select:""
    };

  }
  componentWillMount() {
    fetch(`http://localhost:3000/api/model.PractitionerAddConsultation`)
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
    .then(data => {
      this.setState({data});
      console.log(this.state.data);
  })
    // Catch any errors we hit and update the app
    .catch(error => console.log(error));
  }
    

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  getFiles(files){
    console.log(files.base64);
    this.setState({ labres: files.base64 })
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  submit = (e) => {
    swal({
      title: "Are you sure you want to add this Lab result ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,

    }).then(willAdd => {
      if (willAdd) {
    let id = Math.floor(1000 + Math.random() * 9000);
    fetch('http://localhost:3000/api/model.PractitionerAddLabRes', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "$class": "model.PractitionerAddLabRes",
    "labTestResults": {
      "$class": "model.LabTestResults",
      "labTestResultId": id+"",
      "establishment": "estab",
      "testDate": this.state.date+"",
      "reference": this.state.labres,
      "consultation": "resource:model.Consultation#"+this.state.select
    },
    "patient": "resource:model.Patient#1111",
    "practitioner": "resource:model.Practitioner#2222"
  })
}).then(function(response) {
  if(response.status==200){
    swal("Added!", "Lab result added succefully to record", "success");
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
    if (this.state.data === null) {
      return("loading");
    } else {
    let{data}=this.state
    console.log(this.state)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Lab test Results </strong>
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

                      <Input type="date" id="date" name="date" placeholder="date" onChange={this.handleChange} defaultValue={this.date} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Select Scanned Lab Results</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Consultation related to these results</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select" onChange={this.handleChange}>
                      <option>select an option</option>
                      {
          data.map((val, idx)=> {
            return (
                        <option value={val.consultation.consultationId}>{val.timestamp} reason : {val.consultation.reason}</option>
            )
                      })
                    }
                      </Input>
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
}

export default LabResults;
