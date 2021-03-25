import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Container from 'reactstrap/lib/Container'
import PersonalDetails from './PersonalDetails'
import {IPersonState} from './types'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

export default class App extends React.Component {
  private defaultPerson :IPersonState = {
    Address1:'',
    Address2:null,
    Country:'',
    DateOfBirth: new Date().toISOString().substring(0,10),
    FirstName:'',
    LastName:'',
    PersonId:'',
    PhoneNumber:'',
    Postcode:'',
    Town:''

  }
  public render(){
    return (<Container>
       <PersonalDetails DefaultState={this.defaultPerson}/>
    </Container>
    )
  }
}
