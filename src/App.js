import React from "react";
import awsExports from "./aws-exports";
import {Amplify} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadFilePage from "./pages/UploadFilePage";
import GetFilesPage from "./pages/GetFilesPage";
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";

Amplify.configure(awsExports);


function App() {
  return (
    <Container>
        <NavBar/>
      <UploadFilePage/>
      <GetFilesPage/>
    </Container>
  );
}

export default withAuthenticator(App);
