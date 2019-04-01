import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;



// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Home = React.lazy(() => import('./components/content'));
const About = React.lazy(() => import('./components/AboutUs'));
const Services = React.lazy(() => import('./components/Services'));
const News = React.lazy(() => import('./components/News'));
const Doctors = React.lazy(() => import('./components/Doctors'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {


  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
            
              <Route  exact path="/" name="Home" render={props => <Home {...props}/>} />
              <Route  path="/home" name="home" render={props => <Home {...props}/>} />
              <Route  path="/about" name="about" render={props => <About {...props}/>} />
              <Route  path="/services" name="services" render={props => <Services {...props}/>} />
              <Route  path="/news" name="news" render={props => <News {...props}/>} />
              <Route  path="/doctors" name="doctors" render={props => <Doctors {...props}/>} />
              <Route  path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route  path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route  path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route  path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route  path="/dashboards" name="Dashboard" render={props => <DefaultLayout {...props}/>} />
              <Route component={Page404} />

 
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
