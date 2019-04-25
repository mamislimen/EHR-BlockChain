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
import Autocomplete from 'react-autocomplete';


class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state={
      drugs: [{name:""}],
      values: [],
      autocompleteData: []
    }
    this.curr = new Date();
    //this.curr.setDate(this.curr.getDate() + 3);
    this.date = this.curr.toISOString().substr(0,10);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }
  handleChange = (e) => {
    if (["name"].includes(e.target.className) ) {
      let drugs = [...this.state.drugs]
      drugs[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ drugs }, () => console.log(this.state.drugs))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
  addDrug = (e) => {
    this.setState((prevState) => ({
      drugs: [...prevState.drugs, {name:""}],
      autocompleteData: []
    }));
  }
  removeDrug = (e) => {
    let {drugs} = this.state;
    drugs.splice(-1, 1);
    this.setState({drugs});
  };
  handleSubmit = (e) => { e.preventDefault() }
  retrieveDataAsynchronously(searchText){
    let _this = this;

    // Url of your website that process the data and returns a
    let url = `https://www.dawini.tn/patient/findname/medicament?term=${searchText}`;

    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      let status = xhr.status;

      if (status == 200) {
        let meds=[];
        let items = xhr.response.map((item, key) =>
          meds.push(item.value)
        );
        // Update the state with the remote data and that's it !
        this.setState({
          autocompleteData: meds
        });

        // Show response of your server in the console
        console.log(this.state.autocompleteData);
      } else {
        console.error("Cannot load data from remote source");
      }
    };

    xhr.send();
  }
  onChange(i,e){
    let values = [...this.state.values];
    values[i] = e.target.value;
    this.setState({ values });

    /**
     * Handle the remote request with the current text !
     */
    
    this.retrieveDataAsynchronously(e.target.value);

    console.log("The Input Text has changed to ", e.target.value);
  }

  /**
   * Callback triggered when the autocomplete input changes.
   *
   * @param {Object} val Value returned by the getItemValue function.
   * @return {Nothing} No value is returned
   */
  onSelect(i,val){
    let values = [...this.state.values];
    values[i] = val;
    this.setState({ values });

    console.log("Option from 'database' selected : ", val);
  }

  /**
   * Define the markup of every rendered item of the autocomplete.
   *
   * @param {Object} item Single object from the data that can be shown inside the autocomplete
   * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
   * @return {Markup} Component
   */
  renderMenu(items, value){
    return (
      <div style={{borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        width: 'inherit',
        position : 'fixed',
        zIndex:999,
        overflow: 'auto',}}children={items}>
      </div>
    );
  }
  renderItem(item, isHighlighted){
    return (
      <div style={{color:'black',background: isHighlighted ? '#20a8d8' : 'white' }}>
        {item}
      </div>
    );
  }

  /**
   * Define which property of the autocomplete source will be show to the user.
   *
   * @param {Object} item Single object from the data that can be shown inside the autocomplete
   * @return {String} val
   */
  getItemValue(item){
    // You can obviously only return the Label or the component you need to show
    // In this case we are going to show the value and the label that shows in the input
    // something like "1 - Microsoft"
    return `${item}`;
  }
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
        <button type="button" size="sm" className="btn btn-success btn-sm" onClick={this.addDrug}><i className="fa fa-plus-square-o"></i> Add Drug</button>
        <button type="button" size="sm" className="btn btn-danger btn-sm" onClick={this.removeDrug}><i className="fa fa-minus-square-o"></i> Remove Drug</button>
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
                  <Autocomplete
                  name={drugId} data-id={idx} id={drugId} className="name" placeholder="drug"
                          getItemValue={this.getItemValue}
                          items={this.state.autocompleteData}
                          renderItem={this.renderItem}
                          value={this.state.values[idx]}
                          onChange={this.onChange.bind(this, idx)}
                          onSelect={this.onSelect.bind(this, idx)}
                          renderMenu={this.renderMenu}
                        />
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
