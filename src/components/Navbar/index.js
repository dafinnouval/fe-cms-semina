import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../NavAccess";
import { accessCategories, accessTalents, accessEvents, accessParticipant, accessPayments, accessOrders, accessOrganizers, accessAdmin } from "../../const/access";

const SNavbar = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Semina</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink role={role} roles={accessCategories.lihat} action={() => navigate("/")}>
              Home
            </NavLink>
            <NavLink role={role} roles={accessCategories.lihat} action={() => navigate("/categories")}>
              Categories
            </NavLink>
            <NavLink role={role} roles={accessTalents.lihat} action={() => navigate("/talents")}>
              Talents
            </NavLink>
            <NavLink role={role} roles={accessPayments.lihat} action={() => navigate("/payments")}>
              Payment
            </NavLink>
            <NavLink role={role} roles={accessOrganizers.lihat} action={() => navigate("/organizers")}>
              Organizers
            </NavLink>

            <NavLink role={role} roles={accessEvents.lihat} action={() => navigate("/events")}>
              Events
            </NavLink>
            <NavLink role={role} roles={accessParticipant.lihat} action={() => navigate("/participant")}>
              Participant
            </NavLink>
            <NavLink role={role} roles={accessOrders.lihat} action={() => navigate("/orders")}>
              Orders
            </NavLink>
            <NavLink role={role} roles={accessAdmin.lihat} action={() => navigate("/admins")}>
              Admins
            </NavLink>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SNavbar;
