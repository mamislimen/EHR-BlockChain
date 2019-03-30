import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import styles from './nutrition.css'
export default class nutrition extends Component {
  render() {
    return (
      <div style={styles}>
            <div className="animated fadeIn">
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Nutrition
                <button className="btn btn-primary" id="addbtn" >Add </button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Date & Hours</th>
                    <th>Meal names</th>
                    <th>Food Name</th>
                    <th>calories</th>
                    <th>weigth</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>2019/01/01 07:30</td>
                    <td>Breakfast</td>
                    <td>Pancakes</td>
                    <td>
                      <Badge color="success">350</Badge>
                    </td>
                    <td>100gr</td>
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
