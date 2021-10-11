import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/scss/main.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PlanningPage from "./components/PlanningPage";
import User from "./components/User";
import Settings from "./components/Settings";
const App = () => {
  return (
    <Router>
      <Container fluid className="g-0" id="main_container">
        <div className="sidebar" id="sidebar">
          <Sidebar />
        </div>
        <div className="body" id="body">
          <Header />
          <Route path="/userPage" component={User} />
          <Route path="/planningPage" component={PlanningPage} />
          <Route path="/settingsPage" component={Settings} />
        </div>
      </Container>
    </Router>
  );
};

export default App;
