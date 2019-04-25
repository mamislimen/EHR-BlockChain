import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import './Verify.css';

class Verify extends Component {

  state = {
    text: {
      textmessage: ''
    }
  }

  sendText = _ => {
    const { text } = this.state;
    //pass text message GET variables via query string
    fetch(`http://localhost:4000/send-text?recipient=23340187&textmessage=${text.textmessage}`)
    .catch(err => console.error(err))
  }

  render() {
    const { text } = this.state;
    
    return (
    
    <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <CardGroup>
            <Card className="p-8">
              <CardBody>
                <Form>
                  <h1>Verify Account</h1>
                  <p className="text-muted">Your code</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="code" autoComplete="code"  onChange={e => this.setState({ text: { ...text, textmessage: e.target.value } })} />
                  </InputGroup>
            
                  <Row>
                    <Col xs="6">
                      <Button color="primary" className="px-4" onClick={this.sendText}>Verfy</Button>
                    </Col>
                    <Col xs="6" className="text-right">
                      <Button color="link" className="px-0">Resend code</Button>
                    </Col>
                  </Row>
                </Form>
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

export default Verify;