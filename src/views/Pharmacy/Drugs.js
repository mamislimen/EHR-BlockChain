import React, { Component } from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Row} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMinusSquare, faPlus, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import '../Modals/custom-animation.css';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import swal from 'sweetalert';
class Drugs extends Component{

  constructor(props) {
    super(props);
  }
  state = {
    drugs : [{}],
    medicalRecord: '',
    access: false
  };

  hasAccess = () => {
    return true;
    fetch("API URL to check if pharmacist has access to the medical record or not")
      .then(response => {
        response = response.json();
        this.setState({access: response.access});
        return this.state.access;
      })
  };

  addDrug = (e) => {
    this.setState((prevState) => ({
      drugs: [...prevState.drugs, {name:""}],
    }));
  };

  removeDrug = (e) => {
    let {drugs} = this.state;
    drugs.splice(-1, 1);
    this.setState({drugs});
  };

  handleSubmit = (e) => {
  };

  handleChange = (e) => {
    if (["name"].includes(e.target.className) ) {
      let drugs = [...this.state.deugs]
      drugs[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ drugs }, () => console.log(this.state.drugs))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  };
  alert = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to add these drugs ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,

    }).then(willAdd => {
        if (willAdd) {
          swal("Added!", "Drugs Added Successfully", "success");
        }
      });

  };

  render() {
    if (this.hasAccess()) {
      let {drugs} = this.state;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <strong>Add Drugs To Medical Record {this.state.medicalRecord} </strong>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <FormGroup row>
                      <Col md="3">
                        <Label>Patient's name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p className="form-control-static">Mohamed</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Pharmacist's name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p className="form-control-static">Username</p>
                      </Col>
                    </FormGroup>
                    <div>
                      <h3 className="myh" style={{textAlign: 'center'}}>Manage Drugs</h3>
                      <div className="row">
                        <div className="col-md-5" />
                      <div className="col-md-2 actions">
                      <FontAwesomeIcon icon={faPlusCircle} onClick={this.addDrug} className="drug-btn add"/>
                    <FontAwesomeIcon icon={faMinusCircle} onClick={this.removeDrug} className="drug-btn remove"/>
                      </div>
                        <div className="col-md-5" />
                      </div>
                    </div>
                    {
                      drugs.map((val, idx)=> {
                        let drugId = `drug-${idx}`
                        return (
                          <FormGroup row key={idx}>
                            <Col md="3">
                              <Label htmlFor="drugId">{`Drug #${idx + 1}`}</Label>
                            </Col>
                            <Col xs="6" md="3">
                              <Input type="text" name={drugId} data-id={idx} id={drugId} className="name" placeholder="drug" />
                            </Col>
                            <Col md="3">
                              <FormGroup check inline>
                                <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                                <Label className="form-check-label" check htmlFor="inline-checkbox1">Morning</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                                <Label className="form-check-label" check htmlFor="inline-checkbox2">Noon</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                                <Label className="form-check-label" check htmlFor="inline-checkbox3">Night</Label>
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                <Label className="form-check-label" check htmlFor="inline-radio1">Before meal</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                                <Label className="form-check-label" check htmlFor="inline-radio2">After meal</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                                <Label className="form-check-label" check htmlFor="inline-radio3">Indifferent</Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        )
                      })
                    }
                  </form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={this.alert}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>

      )
    } else {
      return (
       <div>You don't have access here</div>
      );
    }
  }
}

export default Drugs;
