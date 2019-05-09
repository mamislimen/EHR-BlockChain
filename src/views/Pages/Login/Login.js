import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../../actions/authentication';
import imgrfid from './rfid.png' 
const pStyle = {
  margin: '135px',
  
};

class Login extends Component {

  constructor() {
    super();
    this.state = {
        login: '',
        password: '',
        errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
  if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
  }
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
                <Card className="p-4">
                  <CardBody>
                  <span style={pStyle}>
            <Link to="/"> <i className="icon-home"> Home</i></Link>
          </span>
                    <Form onSubmit={ this.handleSubmit }>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="login" autoComplete="username"   onChange={ this.handleInputChange } value={ this.state.login }
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.login})}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" autoComplete="current-password" onChange={ this.handleInputChange }  value={ this.state.password } 
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password})} 
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Login Using Card</h2>
                      <img src={imgrfid} width="200" height="160"/>
                      <br></br>
                      <Link to="/logincard">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Login</Button>
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(Login)
