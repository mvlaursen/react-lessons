import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//---------------------------------------------------------------------
// Foo
//---------------------------------------------------------------------

class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "0.0.0.0",
      lorem_ipsum: "none",
    };
  }

//  componentDidMount() {
//    fetch("http://jsonip.com")
//      .then(response => response.json())
//      .then(json => this.setState({ip: json.ip}));
//  }

  refreshIpAddress() {
    fetch("http://jsonip.com")
      .then(response => response.json())
      .then(json => this.setState({ip: json.ip}));    
  }
  
  render() {
    const lorem_ipsum = this.state.lorem_ipsum;
    const ip = this.state.ip;

    return (
      <div>
        <h3>Public JSON feeds</h3>
        <button onClick={() => this.refreshIpAddress()}>IP Address</button>
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
