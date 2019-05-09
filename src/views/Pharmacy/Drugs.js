import React, { Component } from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Row} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Modals/custom-animation.css';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';
class Drugs extends Component{


  state = {
    drugs : [{}],
    medicalRecord: '',
    access: false,
    patient: null,
    prescriptions: null,
    interaction : null,
    isActive: false,
    drugName: "",
    drugPrice: 0,
    drugMan: "",
    drugLot: ""
  };

  handlePrice = (price) =>  {
    this.setState({drugPrice : price.target.value});
  };


  handleName = (name) =>  {
    this.setState({drugName : name.target.value});
  };


  handleMan = (man) =>  {
    this.setState({drugMan : man.target.value});
  };

  handleLot = (lot) =>  {
    this.setState({drugLot : lot.target.value});
  };


  hasAccess = () => {
    return true;
  /*  fetch("API URL to check if pharmacist has access to the medical record or not")
      .then(response => {
        response = response.json();
        this.setState({access: response.access});
        return this.state.access;
      })*/
  };
  componentDidMount() {
    this.renderMyData();
    console.log(this.state.patient);
  }
  renderMyData(){
    fetch('http://localhost:3000/api/Patient/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ patient : responseJson, });
      })
      .catch((error) => {
        console.error("error client");
      });
    fetch('http://localhost:3000/api/Prescription')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ prescriptions : responseJson, });
      })
      .catch((error) => {
        console.error("error presc");
      });

  }
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
          this.MannualfindInteraction();
        }
      });

  };

  findDrugById = (drugId, presId) => {
    fetch('http://localhost:3000/api/Drug/'+drugId)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.findInteraction(responseJson.name, presId);
      })
      .catch((error) => {
        console.error("error client");
      });
  };

  MannualfindInteraction = () => {
    this.setState({isActive: true});
    if(this.state.interaction !== null) {
    }
    fetch('http://localhost:3000/api/verifyInteraction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "model.verifyInteraction",
        "drugName": this.state.drugName,
        "patient": "resource:model.Patient#1"

      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ interaction : responseJson, });
        if (this.state.interaction.length === 0) {
          let drugs = this.state.patient.pharmacyDrugs;
          drugs.push({
            "$class": "model.Drug",
            "drugId": Math.random(),
            "name": this.state.drugName,
            "manufacturer": this.state.drugMan,
            "price": this.state.drugPrice,
            "lotNumber": this.state.drugLot
          });
          fetch('http://localhost:3000/api/Patient/1', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "$class": "model.Patient",
              "firstName": this.state.patient.firstName,
              "lastName": this.state.patient.lastName,
              "photo": "Ad Lorem commodo.",
              "Emprunt": "Reprehenderit laborum ipsum ut enim.",
              "gender": "MALE",
              "dateOfBirth": "2019-04-24T18:30:29.053Z",
              "cin": "Id cillum commodo commodo exercitation.",
              "address": {
                "$class": "model.Address",
                "addressLine": "Laboris veniam sit pariatur.",
                "city": "Commodo sint ut tempor.",
                "state": "Ad magna pariatur.",
                "zipCode": "Mollit amet.",
                "country": "Ex proident elit."
              },
              "phone": "Aliqua fugiat irure voluptate consectetur.",
              "emergencyPhone": "Velit consequat nisi.",
              "email": "Sit.",
              "occupation": "Incididunt consectetur.",
              "bloodType": "Veniam dolor irure cillum.",
              "height": 90.627,
              "weight": 244.846,
              "pharmacyDrugs": drugs
            })
          });
          swal("No Interaction Detected !", "Drug Has Been Added Successfully", "success");
        }
        else if (this.state.interaction.length > 0) {
          this.state.interaction.map(inter => {
            swal("Interaction Detected !", inter, "error");

          });
        }
        this.setState({isActive: false})
      })
      .catch((error) => {
        console.error(error);
      });
  };


  findInteraction = (drugName, presId) => {
    this.setState({isActive: true});
    if(this.state.interaction !== null) {
    }
    fetch('http://localhost:3000/api/verifyInteraction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "model.verifyInteraction",
        "drugName": drugName,
        "patient": "resource:model.Patient#1"

      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ interaction : responseJson, });
        if (this.state.interaction.length === 0) {
          fetch('http://localhost:3000/api/PharmacyAddDrugFromPrescription', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "$class": "model.PharmacyAddDrugFromPrescription",
              "patient": "resource:model.Patient#1",
              "prescriptionId": presId
            })
          });
          swal("No Interaction Detected !", "Drug Has Been Added Successfully", "success");
        }
        else if (this.state.interaction.length > 0) {
          this.state.interaction.map(inter => {
            swal("Interaction Detected !", inter, "error");

          });
        }
        this.setState({isActive: false})
      })
      .catch((error) => {
        console.error(error);
      });
  };
  presClicked = (e) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to add drugs From Prescription?" + e.prescriptionId,
      icon: "success",
      buttons: true,
      dangerMode: true,

    }).then(willAdd => {
      if (willAdd) {
        swal("Interaction Verification In Process", "This may take a minute!", "warning");
        this.findDrugById(e.drugs[0].substring(20), e.prescriptionId);
      }
    });

  };
  render() {
    if (this.hasAccess()) {
      let {drugs} = this.state;
      return ( this.state.patient && this.state.prescriptions ?
        <LoadingOverlay
          active={this.state.isActive}
          spinner
          text='Verifying Interaction...'
        >
          <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <strong color="red">{this.state.msg}</strong>
                  <strong>Add Drugs To Medical Record {this.state.medicalRecord} </strong>
                </CardHeader>
                <CardBody>

                  <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <FormGroup row>
                      <Col md="3">
                        <Label>Patient's name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p className="form-control-static">{this.state.patient.firstName}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Pharmacist's name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p className="form-control-static">{this.state.patient.lastName}</p>
                      </Col>
                    </FormGroup>
                    <div>
                      <h3 className="myh" style={{textAlign: 'center'}}>Add Drugs From Prescription</h3>
                      <div className="row">
                        <div className="col-md-12 actions" style={{margin: "15px", height: "200px"}}>
                          {this.state.prescriptions.map(pres =>
                            (<div key={pres.prescriptionId} className="card" style={{width: "500px"}}>
                              <div className="card-body">
                                <h5 className="card-title">Prescription#ID: {pres.prescriptionId}</h5>
                                <p className="card-text">Issued In : {pres.prescriptionDate}</p>
                                <button onClick={() => {this.presClicked(pres)}} className="btn btn-primary">Add Drugs From Prescription {pres.prescriptionId}</button>
                              </div>
                            </div>)
                          )}
                        </div>
                        <div className="col-md-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="myh" style={{textAlign: 'center'}}>Add Drugs Manually</h3>
                      <div className="row">
                        <div className="col-md-5" />
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
                            <Col xs="4" md="2">
                              <Input type="text" name={drugId} data-id={idx} id={drugId} className="name"  value={this.state.drugName} onChange={(event) => this.handleName(event)} placeholder="Drug Name" />
                            </Col>
                            <Col md="7">
                              <FormGroup check inline>
                                <Input type="text" id="inline-checkbox1" name="inline-checkbox1"  placeholder="Lot Number" value={this.state.drugLot} onChange={(event) => this.handleLot(event)}/>
                                <Input type="text" id="inline-checkbox2" name="inline-checkbox2"  placeholder="Manufacturer" value={this.state.drugMan} onChange={(event) => this.handleMan(event)}/>
                                <Input  type="number" id="inline-checkbox3" name="inline-checkbox3" placeholder="Price" value={this.state.drugPrice} onChange={(event) => this.handlePrice(event)}/>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        )
                      })
                    }
                  </form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={() => this.alert()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>        </LoadingOverlay>
          : <div> Loading ... </div>

      )
    } else {
      return (
       <div>You don't have access here</div>
      );
    }
  }
}

export default Drugs;
