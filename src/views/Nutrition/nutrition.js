import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import styles from './nutrition.css'
import {NavLink,Link } from "react-router-dom";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import {NotificationContainer, NotificationManager} from 'react-notifications';
export default class nutrition extends Component {
 
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      nutritions: [],
      patient:[],
      newNutritionModel: false,
      newNutruitionData: {
        name: '',
        type: '',
        quantity:'',
      },
      editNutritionData: {
        nutritionId: '',
        name: '',
        typr: '',
        quantity: ''
      },
      
      editNutritionModal: false
     
    }

   
    this.editNutrition = this.editNutrition.bind(this);
  }


    
  toggleNewNutritionModal() {
    this.setState({
      newNutritionModel: ! this.state.newNutritionModel
    });
  }
  toggleEditNutritionModal() {
    this.setState({
      editNutritionModal: ! this.state.editNutritionModal
    });
  }
  componentWillMount() {
    this._isMounted = false;
    this._refreshNutrition();
    
  }

  
  

  



  addNutrition() {
    this._isMounted = true;
    if(this.state.newNutruitionData.name == ''){
      NotificationManager.error('you should add a name', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.newNutruitionData.type == ''){
      NotificationManager.error('you should add a type', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.newNutruitionData.quantity == '' || this.state.newNutruitionData.quantity <= 0){
      NotificationManager.error('Verify the quantity', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.newNutruitionData.name != '' && this.state.newNutruitionData.type != '' && this.state.newNutruitionData.quantity != '' && this.state.newNutruitionData.quantity > 0){
    fetch('http://localhost:3000/api/model.PatientAddNutrition', {
     method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       },
       body: JSON.stringify({
       "$class": "model.PatientAddNutrition",
     "nutrition": {
      "$class": "model.Nutrition",
      "nutritionId": Math.floor(Math.random() * 9000) + 1  ,
      "name": this.state.newNutruitionData.name,
      "type": this.state.newNutruitionData.type,
      "quantity": this.state.newNutruitionData.quantity
    },
    "patient": "resource:model.Patient#"+this.state.patient.patientId
       })
    })

        this.setState({
        newNutritionModel: ! this.state.newNutritionModel
    });


    
      //NotificationManager.success('Added with success', this.state.newNutruitionData.name);
      this._refreshNutrition()
    }
   
      
   
    }



  

  
 
deleteNutrition(nutritionId){
 
  
fetch('http://localhost:3000/api/model.Patient/1').then(res=>res.json()).then(json=>{
  
 json.nutrition.forEach((nut)=> {
 
  
    for ( const [i, item ] of json.nutrition.entries() ){
      const num = item.split('#');
      if ( num[ 1 ] === nutritionId ){
        json.nutrition.splice( i, 1 );
        break;
      }
    }
    console.log(json.nutrition)

    fetch('http://localhost:3000/api/model.Patient/1', {
      method: 'PUT',
       headers: {
         'Accept': 'application/json',
       'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "$class": "model.Patient",
          
          "photo": json.photo,
          "Emprunt":json.Emprunt,
          "firstName": json.firstName,
          "lastName": json.lastName,
          "gender": json.gender,
          "dateOfBirth": json.dateOfBirth,
          "cin": json.cin,
          "address": {
            "$class": "model.Address",
            "addressLine": json.address.addressLine
          },
          "phone": json.phone,
          "emergencyPhone": json.emergencyPhone,
          "email": json.email,
          "occupation": json.occupation,
          "bloodType": json.bloodType,
          "height": json.height,
          "weight":json.weight,
          "pharmacyDrugs": json.pharmacyDrugs,
          "practitionerDrugs": json.practitionerDrugs,
          "physicalActivity": json.physicalActivity,
          "nutrition": json.nutrition
        })
     }
     )
     fetch('http://localhost:3000/api/model.Nutrition/'+nutritionId, {
      method: 'DELETE',
      
     })

    console.log("updated")
       
 })
 
 
 NotificationManager.info('Deleted with success');
 

}


)
this._refreshNutrition();
}

  editNutrition(id,name,type,quantity) {
    this.setState({
      editNutritionData: { 
        
        nutritionId: id,
        name:name,
        type:type,
        quantity:quantity,
       }, editNutritionModal: ! this.state.editNutritionModal
    });
  }


  updateNutrition() {
    if(this.state.editNutritionData.name == ''){
      NotificationManager.error('you should add a name', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.editNutritionData.type == ''){
      NotificationManager.error('you should add a type', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.editNutritionData.quantity == '' || this.state.editNutritionData.quantity <= 0){
      NotificationManager.error('Verify you quantity', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.editNutritionData.name != '' && this.state.editNutritionData.type != '' && this.state.editNutritionData.quantity != ''){
    fetch('http://localhost:3000/api/model.Nutrition/'+this.state.editNutritionData.nutritionId, {
     method: 'PUT',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        "$class": "model.Nutrition",
        
        "name": this.state.editNutritionData.name,
        "type": this.state.editNutritionData.type,
        "quantity": this.state.editNutritionData.quantity
      })
    })

this.setState({
  editNutritionModal: ! this.state.editNutritionModal
});


    this._refreshNutrition();
    NotificationManager.success('Added with success', this.state.editNutritionData.name);
   
}
  }



  _refreshNutrition() {
    this._isMounted = true;
    fetch('http://localhost:3000/api/model.Patient/1')
    .then(res => res.json())
    .then(json => {
      this.setState({
        patient:json,
        
      });
      //console.log(json.patientId)
      if(json.nutrition != null){
      let arr = [];
      json.nutrition.forEach(nut => {
       
        const num = nut.split('#');
        //console.log(num[1]);
        if(num[1]!='null'){
        fetch('http://localhost:3000/api/model.Nutrition/'+num[1])
        .then(res2 => res2.json())
        .then(json2 => {
          if(json2.name != '' && json2.type != '' && json2.quantity != ''){
           arr.push(json2)
           this.setState({
            nutritions:arr,
            
          });}
          
        })
      }
        
      }
      );}
    });
  }

  canceladd(){
    this.setState({
    
      newNutritionModel: ! this.state.newNutritionModel
      
    });
  
  }

  canceledit(){
    this.setState({
    
      editNutritionModal: ! this.state.editNutritionModal
      
    });
  
  }
  render() {
   let nutritions= this.state.nutritions.map((p,index)=>{
      return(    <tr key={index}>
      <td>{p.name}</td>
      <td>{p.type}</td>
      <td>{p.quantity} Kg</td>
      <td>
      <button className="btn btn-danger" onClick={()=>this.deleteNutrition(p.nutritionId)}> delete </button></td>
     <td> <button className="btn btn-warning"   onClick={()=>this.editNutrition(p.nutritionId,p.name,p.type,p.quantity)}>Edit</button>
     
    </td> </tr>
 )
    })
     
    
    
    return (
      <div style={styles}>
       <NotificationContainer/>
      <div className="animated fadeIn">
  <Row>
  <Col xs="12" lg="12">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Nutrition
          <button className="btn btn-primary" id="addbtn" onClick={this.toggleNewNutritionModal.bind(this)}>
          
          Add
          </button>
         
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
            <tr>
              
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {nutritions}
            </tbody>
          </Table>
         
        </CardBody>
      </Card>
    </Col>
  </Row>

  <Modal isOpen={this.state.newNutritionModel} toggle={this.toggleNewNutritionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewNutritionModal.bind(this)}>Add a new Nutrition</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newNutruitionData.name} onChange={(e) => {
              let { newNutruitionData } = this.state;

              newNutruitionData.name = e.target.value;

              this.setState({ newNutruitionData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <select className="form-control" value={this.state.newNutruitionData.type} onChange={(e) => {
              let { newNutruitionData } = this.state;

              newNutruitionData.type = e.target.value;

              this.setState({ newNutruitionData }); }}>
                <option value="">Select a type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
           
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity</Label>
            <Input id="quantity" value={this.state.newNutruitionData.quantity} onChange={(e) => {
              let { newNutruitionData } = this.state;

              newNutruitionData.quantity = e.target.value;

              this.setState({ newNutruitionData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={this.addNutrition.bind(this)}>Add Nutrition</button>{' '}
          <Button className="btn btn-danger" onClick={this.canceladd.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.editNutritionModal} toggle={this.toggleEditNutritionModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditNutritionModal.bind(this)}>Edit nutrition</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">name</Label>
            <Input id="name" value={this.state.editNutritionData.name} onChange={(e) => {
              let { editNutritionData } = this.state;

              editNutritionData.name = e.target.value;

              this.setState({ editNutritionData });
            }} />
          </FormGroup>
          <FormGroup>
          <Label for="type">Type</Label>
            <select className="form-control" value={this.state.editNutritionData.type} onChange={(e) => {
              let {editNutritionData } = this.state;

              editNutritionData.type = e.target.value;

              this.setState({ editNutritionData }); }}>
                <option value="">Select a type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity</Label>
            <Input id="quantity" value={this.state.editNutritionData.quantity} onChange={(e) => {
              let { editNutritionData } = this.state;

              editNutritionData.quantity = e.target.value;

              this.setState({ editNutritionData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-success" onClick={this.updateNutrition.bind(this)} >Update nutrition</Button>{' '}
          <Button className="btn btn-danger" onClick={this.canceledit.bind(this)} >Cancel</Button>
        </ModalFooter>
      </Modal>
       
</div>
</div>
)
}
}