import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Home = React.lazy(() => import('./components/content'));
const About = React.lazy(() => import('./components/AboutUs'));
const Service = React.lazy(() => import('./components/Services'));
const Doctor = React.lazy(() => import('./components/Doctors'));
const New = React.lazy(() => import('./components/News'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/home" name="Home" render={props => <Home {...props}/>} />
              <Route path="/about" name="About" render={props => <About {...props}/>} />
              <Route path="/services" name="Service" render={props => <Service {...props}/>} />
              <Route path="/doctors" name="Doctor" render={props => <Doctor {...props}/>} />
              <Route path="/news" name="New" render={props => <New {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
