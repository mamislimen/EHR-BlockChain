import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import styles from './physicalactivity.css'
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import {NotificationContainer, NotificationManager} from 'react-notifications';
export default class physicalactivity extends Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      physicalActivities: [],
      patient:[],
      newPhysicalModel: false,
      newPhysicalData: {
        type: '',
        duration: '',
        
      },
      editPhysicalData: {
        physicalId: '',
        type: '',
        duration: '',
       
      },
      
      editPhysicalModal: false
     
    }

   
    this.editPhysical = this.editPhysical.bind(this);
  }


    
  toggleNewPhysicalModal() {
    this.setState({
      newPhysicalModel: ! this.state.newPhysicalModel
    });
  }
  toggleEditPhysicalModal() {
    this.setState({
      editPhysicalModal: ! this.state.editPhysicalModal
    });
  }
  componentWillMount() {
    this._isMounted = false;
    this._refreshPhysical();
    
  }
  componentDidUpdate(){this._refreshPhysical();}

  
  

  



  addPhysical() {
    this._isMounted = true;
    if(this.state.newPhysicalData.type == ''){
      NotificationManager.error('you should add a type', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.newPhysicalData.duration == ''){
      NotificationManager.error('you should add a duration', 'Error', 5000, () => {
        alert('callback');
      });
    }
    
    if(this.state.newPhysicalData.type != '' && this.state.newPhysicalData.duration != '' ){
    fetch('http://localhost:3000/api/model.PatientAddPhysicalActivity', {
     method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       },
       body: JSON.stringify({
       "$class": "model.PatientAddPhysicalActivity",
     "physicalActivity": {
      "$class": "model.PhysicalActivity",
      "physicalId": Math.floor(Math.random() * 9000) + 1  ,
      "type": this.state.newPhysicalData.type,
      "duration": this.state.newPhysicalData.duration,
      
    },
    "patient": "resource:model.Patient#"+this.state.patient.patientId
       })
    })

        this.setState({
        newPhysicalModel: ! this.state.newPhysicalModel
    });


    
      NotificationManager.success('Added with success', this.state.newPhysicalModel.name);
      
    }
   
    this._refreshPhysical()
   
    }



  

  
 
deletePhysical(physicalId){
 
  
fetch('http://localhost:3000/api/model.Patient/1').then(res=>res.json()).then(json=>{
  
 json.physicalActivity.forEach((nut)=> {
 
  
    for ( const [i, item ] of json.physicalActivity.entries() ){
      const num = item.split('#');
      if ( num[ 1 ] === physicalId ){
        json.physicalActivity.splice( i, 1 );
        break;
      }
    }
    console.log(json.physicalActivity)

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
     fetch('http://localhost:3000/api/model.PhysicalActivity/'+physicalId, {
      method: 'DELETE',
      
     })

    console.log("updated")
       
 })
 
 
 NotificationManager.info('Deleted with success');
 

}


)
this._refreshPhysical();
}

  editPhysical(id,type,duration) {
    this.setState({
      editPhysicalData: { 
        
        physicalId: id,
        type:type,
        duration:duration,
        
       }, editPhysicalModal: ! this.state.editPhysicalModal
    });
  }


  updatePhysical() {
    if(this.state.editPhysicalData.type == ''){
      NotificationManager.error('you should add a type', 'Error', 5000, () => {
        alert('callback');
      });
    }
    if(this.state.editPhysicalData.duration == ''){
      NotificationManager.error('you should add a duration', 'Error', 5000, () => {
        alert('callback');
      });
    }
   
    if(this.state.editPhysicalData.type != '' && this.state.editPhysicalData.duration != ''){
    fetch('http://localhost:3000/api/model.PhysicalActivity/'+this.state.editPhysicalData.physicalId, {
     method: 'PUT',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        "$class": "model.PhysicalActivity",
        
        "type": this.state.editPhysicalData.type,
        "duration": this.state.editPhysicalData.duration,
        
      })
    })

this.setState({
  editPhysicalModal: ! this.state.editPhysicalModal
});


    this._refreshPhysical();
    NotificationManager.success('Added with success', this.state.editPhysicalData.type);
   
}
  }



  _refreshPhysical() {
    this._isMounted = true;
    fetch('http://localhost:3000/api/model.Patient/1')
    .then(res => res.json())
    .then(json => {
      this.setState({
        patient:json,
        
      });
      //console.log(json.patientId)
      if(json.physicalActivity != null){
      let arr = [];
      json.physicalActivity.forEach(ph => {
       
        const num = ph.split('#');
        //console.log(num[1]);
        if(num[1]!='null'){
        fetch('http://localhost:3000/api/model.PhysicalActivity/'+num[1])
        .then(res2 => res2.json())
        .then(json2 => {
          if(json2.type != '' && json2.duration ){
           arr.push(json2)
           this.setState({
            physicalActivities:arr,
            
          });}
          
        })
      }
        
      }
      );}
    });
  }

  canceladd(){
    this.setState({
    
      newPhysicalModel: ! this.state.newPhysicalModel
      
    });
  
  }

  canceledit(){
    this.setState({
    
      editPhysicalModal: ! this.state.editPhysicalModal
      
    });
  
  }
  render() {
   let physicalActivity= this.state.physicalActivities.map((p,index)=>{
      return(    <tr key={index}>
      <td>{p.type}</td>
      <td>{p.duration}</td>
      
      <td>
      <button className="btn btn-danger" onClick={()=>this.deletePhysical(p.physicalId)}> delete </button></td>
     <td> <button className="btn btn-warning"   onClick={()=>this.editPhysical(p.physicalId,p.type,p.duration)}>Edit</button>
     
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
          <i className="fa fa-align-justify"></i> Physical Activity
          <button className="btn btn-primary" id="addbtn" onClick={this.toggleNewPhysicalModal.bind(this)}>
          
          Add
          </button>
         
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
            <tr>
              
              <th>Type</th>
              <th>Duration</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {physicalActivity}
            </tbody>
          </Table>
         
        </CardBody>
      </Card>
    </Col>
  </Row>

  <Modal isOpen={this.state.newPhysicalModel} toggle={this.toggleNewPhysicalModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewPhysicalModal.bind(this)}>Add a new Workout</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input id="type" value={this.state.newPhysicalData.name} onChange={(e) => {
              let { newPhysicalData } = this.state;

              newPhysicalData.type = e.target.value;

              this.setState({ newPhysicalData });
            }} />
          </FormGroup>
         
          <FormGroup>
            <Label for="duration">Duration</Label>
            <Input id="duration" value={this.state.newPhysicalData.duration} onChange={(e) => {
              let { newPhysicalData } = this.state;

              newPhysicalData.duration = e.target.value;

              this.setState({ newPhysicalData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={this.addPhysical.bind(this)}>Add Physical</button>{' '}
          <Button className="btn btn-danger" onClick={this.canceladd.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.editPhysicalModal} toggle={this.toggleEditPhysicalModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditPhysicalModal.bind(this)}>Edit workout</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input id="type" value={this.state.editPhysicalData.type} onChange={(e) => {
              let { editPhysicalData } = this.state;

              editPhysicalData.type = e.target.value;

              this.setState({ editPhysicalData });
            }} />
          </FormGroup>
          
          <FormGroup>
            <Label for="duration">Duration</Label>
            <Input id="duration" value={this.state.editPhysicalData.duration} onChange={(e) => {
              let { editPhysicalData } = this.state;

              editPhysicalData.duration = e.target.value;

              this.setState({ editPhysicalData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-success" onClick={this.updatePhysical.bind(this)} >Update woorkout</Button>{' '}
          <Button className="btn btn-danger" onClick={this.canceledit.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
       
</div>
</div>
)
}
}