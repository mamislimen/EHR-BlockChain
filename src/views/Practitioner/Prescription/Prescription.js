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

class Prescription extends Component {
  constructor(props) {
    super(props);
    this.curr = new Date();
    //this.curr.setDate(this.curr.getDate() + 3);
    this.date = this.curr.toISOString().substr(0,10);

  }
  state = {
    drugs: [{name:""}],
  }
  handleChange = (e) => {
    if (["name"].includes(e.target.className) ) {
      let drugs = [...this.state.deugs]
      drugs[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ drugs }, () => console.log(this.state.drugs))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
  addDrug = (e) => {
    this.setState((prevState) => ({
      drugs: [...prevState.drugs, {name:""}],
    }));
  }
  handleSubmit = (e) => { e.preventDefault() }
  render() {
    let {drugs} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Prescription Form </strong>
              </CardHeader>
              <CardBody>
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
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
            <Label htmlFor="date-input">Date of Prescription</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="date" id="date-input" name="date-input" placeholder="date" defaultValue={this.date} />
          </Col>
        </FormGroup>
        <FormGroup row>
        <button type="button" size="sm" className="btn btn-success btn-sm" onClick={this.addDrug}><i className="fa fa-plus-square-o"></i>Add Drug</button>
        </FormGroup>
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
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

        )
  }
}
export default Prescription
