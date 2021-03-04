import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegistrationAlert from './RegistrationAlert'
import './Registration.css'

class Registration extends Component {
  constructor(props){
    super(props);
    this.registrationAlert = React.createRef();
  }

    handleSubmit = event =>{
        event.preventDefault();
        this.registerUser(event.target.username.value, event.target.password.value);
    }

    registerUser(username, password){
        fetch('http://localhost:8080/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(function(response){
            if (response.status === 200) {
                this.showRegistrationAlert("success", "User registered!", "You can now log in using your credentials.");
            } else if (response.status === 422){
                this.showRegistrationAlert("danger", "User arleady exists", "Please choose a diffrent name.");
            } else {
              this.showRegistrationAlert("danger", "User not registered", "Something went wrong.");
            }
        }).catch(function(error){
            this.showRegistrationAlert("danger", "Error", "Something went wrong.");
        })
    }

    showRegistrationAlert(variant, heading, message) {
      this.registrationAlert.current.setVariant(variant);
      this.registrationAlert.current.setHeading(heading);
      this.registrationAlert.current.setMessage(message);
      this.registrationAlert.current.setVisible(true);
    }

  render(){
   return   (
     <>

          <div className="Register">
          <Form onSubmit= {this.handleSubmit}>
            <Form.Group controlId="username" size="lg">
              <Form.Label>Username</Form.Label>
              <Form.Control autoFocus name="username"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password"/>
            </Form.Group>

            <Button block size="lg" type="submit">Register</Button>
        </Form>
        </div>  

        <RegistrationAlert ref={this.registrationAlert}/> 
      </>
   );
  }
}

export default Registration;
