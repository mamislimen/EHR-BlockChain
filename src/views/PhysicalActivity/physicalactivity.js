import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import styles from './physicalactivity.css'
export default class physicalactivity extends Component {
  render() {
    return (
      <div style={styles}>
            <div className="animated fadeIn">
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> PhysicalActivity
                <button className="btn btn-primary" id="addbtn" >Add </button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date </th>
                    <th>Duration</th>
                    <th>calories</th>
                    <th>FootSteps</th>
                    <th>Distance </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2019/01/01</td>
                    <td>30M</td>
                    <td>
                      <Badge color="success">2500</Badge>
                    </td>
                    <td>1250</td>
                    <td>1.3 KM</td>
                  </tr>
                  
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
    )
  }
}
