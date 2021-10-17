import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import MyNav from './Components/MyNav';
import HomeButtons from './Components/HomeButtons';
//import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AdminHomepage from './Components/AdminHomepage';
import NewCounter from './Components/NewCounter';
import OfficerHomePage from './Components/OfficerHomePage';
import TicketAcquisitionPage from './Components/TicketAcquisitionPage';
import API from "./API/GetAPI.js";
import { useEffect, useState } from "react";

function App() {
  const [allServices, setAllServices] = useState([]);
  const [estimation, setEstimation] = useState([]);

  const [allOfficers, setAllOfficers] = useState([]);
  const [flagOfficer, setFlagOfficer] = useState([]);
  const [dirty, setDirty] = useState(true);
  useEffect(() => {
    API.getAllServices().then((services) => setAllServices(services));

  }, []);

  useEffect(() => {console.log("estimation");
    API.getServedClients().then((estimation) => setEstimation(estimation));
    console.log({estimation});

  }, []);

  useEffect(() => {
    if (flagOfficer) {
      setFlagOfficer(false);
      API.getActiveOfficers().then((officer) => setAllOfficers(officer));
    }
  }, [flagOfficer]);

  return (
    <>
      <Router>
        <Route path="/" render={() => <> <MyNav /> <HomeButtons /></>} />
        <Route exact path="/admin" render={() => <><AdminHomepage /> <NewCounter services={allServices}/></>} />
        <Route exact path="/officer" render={() => <><OfficerHomePage officers={allOfficers}/></>} />
        <Route exact path="/customer" render={() => <><TicketAcquisitionPage services={allServices} estimation={estimation}/></>} />
      </Router>
    </>
  );
}

export default App;
