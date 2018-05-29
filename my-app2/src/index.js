import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//---------------------------------------------------------------------
// Foo
//---------------------------------------------------------------------

class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ip: "0.0.0.0"};
  }

  componentDidMount() {
//    var myHeaders = new Headers();
//    var myInit = {
//      method: 'GET',
//      headers: myHeaders,
//      mode: 'no-cors',
//      cache: 'default',
//    }

//    fetch("http://www.nactem.ac.uk/software/acromine/dictionary.py?sf=BMI", myInit)
    fetch("http://jsonip.com")
      .then(response => response.json())
      .then(json => this.setState({ip: json.ip}));
  }
  
  render() {
    const ip = this.state.ip;

    return (
      <div>
        <h3>Public JSON feeds</h3>
        <button>IP Address</button>
        <p>{ip}</p>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <FetchExample />,
  document.getElementById('root')
);
