import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import swal from 'sweetalert';
import { loginUser } from '../../../actions/authentication';
import img1 from './rf1.png' 
import img2 from './rf2.png' 

const pStyle = {
  margin: '135px',
  
};

class LoginCard extends Component {

  constructor() {
    super();
    this.state = {
        idcard: [],
        idc1:"",
        idc2:"",

    }
    this.handleInputChange = this.handleInputChange.bind(this);
  
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
}
 getIdCard1()
 {
    fetch('http://localhost:4000/api/auth/card')
    .then(data => data.json())
    .then((data) => { this.setState({ idc1: data[0] }) ;
    console.log(data[0]);
    if(typeof(data[0]) !== 'undefined')
    swal("Check Patient", "Patient succefully verified", "success");
    else
    swal("Check Practitioner/Pharmacy", "Pass your card", "error");

}); 
 }
 getIdCard2()
 {
    fetch('http://localhost:4000/api/auth/card')
    .then(data => data.json())
    .then((data) => { this.setState({ idc2: data[0] }) ;
    console.log(data[0]);
    if(typeof(data[0]) !== 'undefined')
    swal("Check Practitioner/Pharmacy", "Practitioner/Pharmacy succefully verified", "success");
    else
    swal("Check Practitioner/Pharmacy", "Pass your card", "error");

}); 
 }
handleSubmit(e) {
    e.preventDefault();
    const user = {
        login: this.state.login,
        password: this.state.password,
    }
    console.log(user);
    this.props.loginUser(user);
}

componentDidMount() {

}
componentWillReceiveProps(nextProps) {

  if(nextProps.auth.isAuthenticated) {
    this.props.history.push('/dashboards')
}
if(nextProps.errors) {
    this.setState({
        errors: nextProps.errors
    });
}

}

  render() {
    const {errors} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="text-center py-5 d-md-down-none">
                  <CardBody>
                  <div>
                      <h2>Card Patient</h2>
                      <img src={img2} width="200" height="160"/><br></br>
                      <Link to="/logincard">
                        <Button color="danger" className="mt-3" active tabIndex={-1} onClick={this.getIdCard1.bind(this)}>Start</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Card Practitioner/Pharmacy</h2>
                      <img src={img1} width="200" height="160"/><br></br>
                      <Link to="/logincard">
                        <Button color="danger" className="mt-3" active tabIndex={-1} onClick={this.getIdCard2.bind(this)}>Start</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
LoginCard.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(LoginCard)
