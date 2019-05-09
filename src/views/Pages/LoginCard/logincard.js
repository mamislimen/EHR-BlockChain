import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import swal from 'sweetalert';
import { loginCard } from '../../../actions/authentication';
import img1 from './rf1.png' 
import img2 from './rf2.png' 
import axios from 'axios';
 
const pStyle = {
  margin: '135px',
  
};

class LoginCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
        idcard: [],
        idc1:"",
        idc2:"",
        c1etat:"Card not authificated",
        c2etat:"Card not authificated",
        c1color:"red",
        c2color:"red",
        errors: {},
 
    }
    this.handleInputChange = this.handleInputChange.bind(this);
   
    this.getAutoIdCard = this.getAutoIdCard.bind(this);
 }

handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
}

 
getAutoIdCard(){
 
  //this.setState({ idc1: ""}) ;
  //this.setState({ idc2: ""}) ;
  console.log("idc1"+this.state.idc1);
  console.log("idc2"+this.state.idc2);

 if(this.state.idc1 ==="" && this.state.idc2 ==="" )
 { 
 axios.get('http://localhost:4000/api/auth/card')
  .then( (response) =>{
    
    
    console.log(response.data);
    if(typeof response.data[0] !== "undefined"){
    this.setState({ idc1: response.data[0]}) ;
    this.setState({ c1color: "green"}) ;
    this.setState({ c1etat: "card successfully authenficated"}) ;
    console.log("idc1 seted"+this.state.idc1);
    }
   })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
 }else  if(this.state.idc1 !=="" && this.state.idc2 ==="" )
 { 
 axios.get('http://localhost:4000/api/auth/card')
  .then( (response)=> {
     if( response.data[0]!==this.state.idc1 )
    {
      if(typeof response.data[0] !== "undefined"){
        
      this.setState({ idc2: response.data[0]}) ;
    
      this.setState({ c2color: "green"}) ;
      this.setState({ c2etat: "card successfully authenficated"}) ;
    }

    }
   })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
 } else  if(this.state.idc1 !=="" && this.state.idc2 !=="" )
 { 
  console.log("correct");
  clearInterval(this.interval);
  axios({
    method: 'post',
    url: 'http://localhost:4000/api/auth/logincard',
    data: {
      idcard1: this.state.idc1,
      idcard2: this.state.idc2
    },
    
      headers: {
          'Content-Type': 'application/json',
              }
    
  }).then((response)=>
  {
    console.log(response);
    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem('user', response.data.user);
      this.props.history.push('/dashboards')
  }
  );
  
 }
 else
 {    console.log("error if");
 }
}

componentDidMount() {
  this.getAutoIdCard();
  this.interval = setInterval(() => {
    this.getAutoIdCard();
  }, 500);
}
componentWillUnmount() {
  clearInterval(this.interval);
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
                      <div style={{backgroundColor:this.state.c1color}}>
                        <h3>{this.state.c1etat}</h3>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Card Practitioner/Pharmacy</h2>
                      <img src={img1} width="200" height="160"/><br></br>
                      <div style={{backgroundColor:this.state.c2color}}>
                        <h3>{this.state.c2etat}</h3>
                      </div>
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


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { loginCard })(LoginCard)
