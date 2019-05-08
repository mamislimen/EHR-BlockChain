import React, { Component } from 'react'
import styles from './profile.css';
import LoadingScreen from 'react-loading-screen';
import Moment from 'react-moment';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button , Table} from 'reactstrap';
export default class profile extends Component {
  _isMounted = false;
constructor(props){
  super(props);
  this.state = {
    testObesite:false,
    items: '',
    isLoaded: false,
    sick:'[]',
    chronicDiseasess:[],
    waiting:false,
    doctors:[], 
    drugs:[],
      DrugsModel:false,
      editProfile: false,
      editProfileData:{
        height:'',
        weight:''
      }
 }
}
componentWillMount(){
  this._isMounted = false;
}

componentDidMount(){
  this._isMounted = true;
  fetch('http://localhost:3000/api/model.Patient/1')
  .then(res => res.json())
  .then(json => {
    if(json.chronicDiseases != null){
      let arr = [];
      json.chronicDiseases.forEach(nut => {
       
        const num = nut.split('#');
        //console.log(num[1]);
        if(num[1]!='null'){
        fetch('http://localhost:3000/api/model.ChronicDiseases/'+num[1])
        .then(res2 => res2.json())
        .then(json2 => {
           arr.push(json2)
           this.setState({
            chronicDiseasess:arr,
            
          });
          
        })
      }
        
      }
      );}
    this.setState({
      isLoaded: true,
      items:json,
    });
    //console.log(json);
  });
}




toggleEditProfileModal() {
  this.setState({
    editProfile: ! this.state.editProfile
  });

  console.log('hello')
}

getNutritionDoctors(){
  this._isMounted = true;
  fetch('http://localhost:3000/api/model.Practitioner/')
  .then(res => res.json())
  .then(json => {
   
      let arr = [];
      json.forEach(doc => {
        console.log(doc);
       
      if(doc.speciality=="nutrition"){
           arr.push(doc)
           this.setState({
            doctors:arr,
            
          });
        } 
        
      }
        
      
      );
   
    
  });


}
DrugsModel(){
  this._isMounted = true;
  this.setState({
  DrugsModel : !this.state.DrugsModel});

  fetch('http://localhost:3000/api/model.Patient/1')
  .then(res => res.json())
  .then(json => {
    if(json.practitionerDrugs != null){
      let arr = [];
      json.practitionerDrugs.forEach(nut => {
       
        const num = nut.split('#');
        //console.log(num[1]);
        if(num[1]!='null'){
        fetch('http://localhost:3000/api/model.Drug/'+num[1])
        .then(res2 => res2.json())
        .then(json2 => {
           arr.push(json2)
           this.setState({
            drugs:arr});
          
        }) } });}
        console.log("druuuugs : " + this.state.drugs)
    
  });
  


}




testObesite(){
  console.log(this.state.items.height)
  console.log(this.state.items.weight)
  this._isMounted = true;
  this.setState({
    waiting : !this.state.waiting
  })
  setTimeout(()=>{this.setState({
    waiting : !this.state.waiting
  })

  fetch('http://localhost:3005/Patient/obesite/', {
    method: 'POST',
    headers :{
      "access-control-allow-origin": "localhost",
      "access-control-allow-credentials": "false"
  },

 
      body: JSON.stringify({
        "height": this.state.items.height,
        "weight":this.state.items.weight,
        "chronicDiseasess":this.state.chronicDiseasess
        
      })


   }) .then(res => res.json()).then(json => {
     if(json.docteur == true){
      this.setState({
        sick:json,
        testObesite: ! this.state.testObesite,
        
        
      });
      this.getNutritionDoctors();

     }
     else {
    this.setState({
      sick:json,
      testObesite: ! this.state.testObesite
      
    });}
    });
    
},2000)
  
  


}

cancel(){
  this.setState({
  
    testObesite: ! this.state.testObesite
    
  });

}

  render() {
    let doctors = this.state.doctors.map((p,index)=>{
      return(
        
      <tr><td>{p.firstName} {p.lastName}</td>
      <td>{p.address.addressLine}</td>
      <td>{p.email}</td>
      </tr>)

    })

    let drugs = this.state.drugs.map((p,index)=>{
      return(
        
      <tr><td>{p.name}</td>
      <td>{p.manufacturer}</td>
      <td>{p.price}</td>
      </tr>)

    })

    //nsole.log("helloooooo "+this.state.sick.Conseils)
    var {isLoaded , items }= this.state;
    if(!isLoaded){
      return <div>Loading .... </div>
    }
    else{
    return (
      <div style={styles}>
     <LoadingScreen
      
      loading={this.state.waiting}
      bgColor='#f1f1f1'
      spinnerColor='#9ee5f8'
      textColor='#676767'
      logoSrc={require("../../assets/img/brand//myehr2.svg")}
      text='Waiting for you result'
    > 
    </LoadingScreen>


  <Modal isOpen={this.state.editProfile} toggle={this.toggleEditProfileModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditProfileModal.bind(this)}>Edit Profile</ModalHeader>
        <ModalBody>
        hello
        </ModalBody>
  </Modal>
      



       <Modal isOpen={this.state.testObesite} toggle={this.testObesite.bind(this)}>
        <ModalBody>
          <p className="font-weight-bold" style = {{
               justifyContent: 'center',
              alignItems: 'center'}}>Resut Test
          </p>
       <div> <p className="text-justify">{this.state.sick.Conseils}</p ></div>
       <br/>
       <Table responsive className="table table-dark">
            <thead>
            <tr>
              
              <th>Name</th>
              <th>Adresse</th>
              <th>Email</th>
              
            </tr>
            </thead>
            <tbody>
            {doctors}
            </tbody>
          </Table>
        <div><button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button></div>

        </ModalBody>
      </Modal>


      
      <Modal isOpen={this.state.DrugsModel} toggle={this.DrugsModel.bind(this)}>
        <ModalBody>
          <p className="font-weight-bold" style = {{
               justifyContent: 'center',
              alignItems: 'center'}}>Drugs
          </p>
       <Table responsive className="table table-dark">
            <thead>
            <tr>
              
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Price</th>
              
            </tr>
            </thead>
            <tbody>
            
            {drugs}
          
            </tbody>
          </Table>
       

        </ModalBody>
      </Modal>

      <Modal isOpen={this.state.MRIModel} toggle={this.DrugsModel.bind(this)}>
        <ModalBody>
          <p className="font-weight-bold" style = {{
               justifyContent: 'center',
              alignItems: 'center'}}>Drugs
          </p>
       <Table responsive className="table table-dark">
            <thead>
            <tr>
              
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Price</th>
              
            </tr>
            </thead>
            <tbody>
            
            {drugs}
          
            </tbody>
          </Table>
       

        </ModalBody>
      </Modal>




      

        <div className="content">
           <div  className="flex">
            <div className="col-sm-2 col-1">
                <h4 className="page-title">My Profile</h4>
           </div>
          <div>
            <button className="btn btn-warning" onClick={this.toggleEditProfileModal.bind(this)}>Edit</button>
      
          </div>

    
         </div>
  <div className="card-box profile-header">
    <div className="row">
      <div className="col-md-12">
        <div className="profile-view">
          <div className="profile-img-wrap">
            <div className="profile-img">
            
              <img className="avatar" src={this.state.items.photo}   /> 
            </div>
          </div>
          <div className="profile-basic">
            <div className="row">
              <div className="col-md-5">
                <div className="profile-info-left">
                  <h3 className="user-name m-t-0 mb-0">{this.state.items.firstName} {this.state.items.lastName}</h3>
                  
                  {/* <small className="text-muted">Gynecologist</small> */}
                  <div className="staff-id"><span className="titleInfo">CIN :</span> <span className="titleInfoText">{this.state.items.cin}</span></div>
                  <div className="staff-id"><span className="titleInfo">CNSS/CNAM : </span><span className="titleInfoText">00000000</span></div>
                  <div className="staff-id"><span className="titleInfo">Blood Type:</span> <span className="titleInfoText">{this.state.items.bloodType}</span></div>
                  <div className="staff-id"><span className="titleInfo">Height: </span><span className="titleInfoText">{this.state.items.height}M</span></div>
                  <div className="staff-id"><span className="titleInfo">Weight:</span><span className="titleInfoText"> {this.state.items.weight}KG</span></div>
   
                </div>
              </div>
              <div className="col-md-7">
                <ul className="personal-info">
                  <li>
                    <span className="title">Phone:</span>
                    <span className="text"><a >{this.state.items.phone}</a></span>
                  </li>
                  <li>
                    <span className="title">Emergency Phone:</span>
                    <span className="text"><a >{this.state.items.emergencyPhone}</a></span>
                  </li>
                  <li>
                    <span className="title">Email:</span>
                    <span className="text"><a >{this.state.items.email}</a></span>
                  </li>
                  <li>
                    <span className="title">Birthday:</span>
                    <span className="text"><Moment format="YYYY/MM/DD">
                {this.state.items.dateOfBirth}
            </Moment></span>
                  </li>
                  <li>
                    <span className="title">Address:</span>
                    <span className="text">{this.state.items.address.addressLine}</span>
                  </li>
                  <li>
                    <span className="title">Gender:</span>
                    <span className="text">{this.state.items.gender}</span>
                  </li>
                  <li>   <span className="title">Obesity Test:</span>
                    <button className="btn btn-success marginLeft" onClick={this.testObesite.bind(this)}>Test</button></li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>                        
      </div>
    </div>
  </div>
  <div className="profile-tabs">
    <ul className="nav nav-tabs nav-tabs-bottom">
      <li className="nav-item"><a className="nav-link" onClick={this.DrugsModel.bind(this)} data-toggle="tab">Drugs</a></li>
      <li className="nav-item"><a className="nav-link" onClick={this.toggleEditProfileModal.bind(this)} data-toggle="tab">MRI</a></li>
      <li className="nav-item"><a className="nav-link" onClick={this.toggleEditProfileModal.bind(this)} data-toggle="tab">Lab Tet</a></li>
      <li className="nav-item"><a className="nav-link" onClick={this.toggleEditProfileModal.bind(this)} data-toggle="tab">Prescription</a></li>
      <li className="nav-item"><a className="nav-link" onClick={this.toggleEditProfileModal.bind(this)} data-toggle="tab">Allergies</a></li>
    </ul>
   
  </div>
</div>

      </div>
    )
  }}
}

