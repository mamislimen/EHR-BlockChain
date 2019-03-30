import React, { Component } from 'react'
import styles from './profile.css';
 
export default class profile extends Component {
  render() {
    return (
      <div style={styles}>
        <div className="content">
  <div className="row">
    <div className="col-sm-7 col-6">
      <h4 className="page-title">My Profile</h4>
    </div>
    
  </div>
  <div className="card-box profile-header">
    <div className="row">
      <div className="col-md-12">
        <div className="profile-view">
          <div className="profile-img-wrap">
            <div className="profile-img">
              <img className="avatar" src={process.env.PUBLIC_URL +'assets/img/avatars/8.jpg' }   /> 
            </div>
          </div>
          <div className="profile-basic">
            <div className="row">
              <div className="col-md-5">
                <div className="profile-info-left">
                  <h3 className="user-name m-t-0 mb-0">Cristina Groves</h3>
                  {/* <small className="text-muted">Gynecologist</small> */}
                  <div className="staff-id"><span className="titleInfo">CIN :</span > <span className="titleInfoText">00000000</span></div>
                  <div className="staff-id"><span className="titleInfo">CNSS/CNAM : </span><span className="titleInfoText">00000000</span></div>
                  <div className="staff-id"><span className="titleInfo">Blood Type:</span> <span className="titleInfoText">O+</span></div>
                  <div className="staff-id"><span className="titleInfo">Height: </span><span className="titleInfoText">1.8M</span></div>
                  <div className="staff-id"><span className="titleInfo">Weight:</span><span className="titleInfoText"> 85K</span></div>
   
                </div>
              </div>
              <div className="col-md-7">
                <ul className="personal-info">
                  <li>
                    <span className="title">Phone:</span>
                    <span className="text"><a href>770-889-6484</a></span>
                  </li>
                  <li>
                    <span className="title">Email:</span>
                    <span className="text"><a href>cristinagroves@example.com</a></span>
                  </li>
                  <li>
                    <span className="title">Birthday:</span>
                    <span className="text">3rd March</span>
                  </li>
                  <li>
                    <span className="title">Address:</span>
                    <span className="text">714 Burwell Heights Road, Bridge City, TX, 77611</span>
                  </li>
                  <li>
                    <span className="title">Gender:</span>
                    <span className="text">Female</span>
                  </li>
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
      <li className="nav-item"><a className="nav-link active" href="#about-cont" data-toggle="tab">Drugs</a></li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-toggle="tab">MRI</a></li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Lab Tet</a></li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Prescription</a></li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Allergies</a></li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane show active" id="about-cont">
        <div className="row">
          <div className="col-md-12">
          <div className="card-box">
           
           </div>
          </div>
        </div>
      </div>
      <div className="tab-pane" id="bottom-tab2">
        Tab content 2
      </div>
      <div className="tab-pane" id="bottom-tab3">
        Tab content 3
      </div>
    </div>
  </div>
</div>

      </div>
    )
  }
}
