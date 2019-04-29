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
import './autocomplete.css';
import swal from 'sweetalert';



class ChronicDisease extends Component {
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
      value: "",
      notes:"",
      date:this.date,
      autocompleteData: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    this.handleChange=this.handleChange.bind(this);

  }
  retrieveDataAsynchronously(searchText){
    let _this = this;

    // Url of your website that process the data and returns a
    let url = `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${searchText}`;

    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      let status = xhr.status;

      if (status == 200) {
        let diseases=[];
        let items = xhr.response[3].map((item, key) =>
          diseases.push(item[0])
        );
        // Update the state with the remote data and that's it !
        this.setState({
          autocompleteData: diseases
        });

        // Show response of your server in the console
        console.log(this.state.autocompleteData);
      } else {
        console.error("Cannot load data from remote source");
      }
    };

    xhr.send();
  }
  onChange(e){
    this.setState({
      value: e.target.value
    });

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
  onSelect(val){
    this.setState({
      value: val
    });

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
    fetch('http://localhost:3000/api/model.PractitionerAddChronicDisease', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "$class": "model.PractitionerAddChronicDisease",
  "chronicDisease": {
    "$class": "model.ChronicDiseases",
    "chronicDiseasesId": id+"",
    "name": this.state.value,
    "date": this.state.date+"",
    "notes": this.state.notes
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
                <strong>Chronic Disease Form </strong>
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
                      <Label htmlFor="disease">Chronic disease</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <div>
                        <Autocomplete
                          getItemValue={this.getItemValue}
                          items={this.state.autocompleteData}
                          renderItem={this.renderItem}
                          value={this.state.value}
                          onChange={this.onChange}
                          onSelect={this.onSelect}
                          renderMenu={this.renderMenu}
                        />
                      </div>
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

export default ChronicDisease;
