import Amplify  from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import React from 'react';
import {  Nav, Navbar, Button, Container } from 'react-bootstrap';

import "@aws-amplify/ui-react/styles.css";
import awsConfig from './aws-exports';
Amplify.configure(awsConfig);

function App() {
  return (
    <Authenticator className="d-flex justify-content-center vh-100 bg-primary align-items-center">
        {({signOut}) => (
        <Container>
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
        </Container>
        )}
    </Authenticator>
  );
}

export default App;
