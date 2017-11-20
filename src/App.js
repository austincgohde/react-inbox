import React, { Component } from 'react';
import Toolbar from './Toolbar';
import MessageList from './MessageList';

class App extends Component {

  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]

  }

  handleValueChanges = (message, property, newValue) => {
    let messageList = this.state.messages.filter(m => m.id !== message.id);
    let changedMsg = Object.assign({}, message);
    changedMsg[property] = newValue;
    messageList = messageList.concat(changedMsg);
    messageList.sort((a, b) => a.id - b.id);
    this.setState({ messages: messageList});
  }

  handleBulkSelecting = (count) => {
    console.log("Did I get here?");
    let countCheck = count === 3 ? false : true;
    let messageList = this.state.messages.map(m => m = {...m, "selected": countCheck});

    console.log(messageList);
    this.setState({messages: messageList});
  }

  handleRMarking = () => {
    let messageList = this.state.messages.map((m) => {
      m.read = m.selected === true ? true : m.read;
      m.selected = false;
      return m
    });
    console.log(messageList);;
    this.setState({messages: messageList});
  }

  handleURMarking = () => {
    let messageList = this.state.messages.map((m) => {
      m.read = m.selected === true ? false : m.read;
      m.selected = false;
      return m
    });
    console.log(messageList);;
    this.setState({messages: messageList});
  }

  render() {

    let {
      messages
    } = this.state

    let toolbarFilterCheck = messages.filter(m => m.selected);
    let toolbarSelectedCount =
          toolbarFilterCheck.length === messages.length ? 3
        : toolbarFilterCheck.length === 0 ? 1
        : 2

    return (
      <div>
        <Toolbar
          selectedCount={toolbarSelectedCount}
          bulkSelectFn={this.handleBulkSelecting}
          bulkReadFn={this.handleRMarking}
          bulkUnreadFn={this.handleURMarking}
          />
        <MessageList
          messages={this.state.messages}
          valueChangeFn={this.handleValueChanges}
          />
      </div>
    );
  }
}

export default App;
