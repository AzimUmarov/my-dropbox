import React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {useAuthenticator} from "@aws-amplify/ui-react";

const NavBar = () => {
    const { signOut } = useAuthenticator()
    return (
            <Navbar className="shadow-sm mb-3">
                <Navbar.Brand className="font-weight-bold" >My dropbox Qwasar.io</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Button className="btn btn-secondary" > My Drive</Button>
                    </Nav>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Button className="btn btn-primary" onClick={signOut}> Sign out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default NavBar;
