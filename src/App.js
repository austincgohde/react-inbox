import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Compose from './Compose';
import MessageList from './MessageList';
import axios from 'axios';

class App extends Component {

  state = {

    messages: [],
    formToggle : false

  }

  updateMessage = async (msg) => {
    msg.labels = JSON.stringify(msg.labels);
    let updatedMsg = await axios.patch(`http://localhost:8000/messages/${msg.id}`, msg)
    let message = updatedMsg.data;
    return message
  }

  componentDidMount = () => {
    axios.get('http://localhost:8000/messages')
      .then((messages) => {
        messages = messages.data.map((msg) => {
          msg.selected = false;
          return msg
        })
        messages.sort((a, b) => a.id -b.id)
        this.setState({messages})
      })
  }

  handleValueChanges =  async(message, property, newValue) => {
    let changedMsg = Object.assign({}, message);
    changedMsg[property] = newValue;
    let changedMsgList = await this.updateMessage(changedMsg);
    changedMsgList.sort((a, b) => a.id - b.id);
    this.setState({ messages: changedMsgList});
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

  handleBulkMsgDel = () => {
    let messageList = this.state.messages.filter(m => m.selected !== true);
    this.setState({messages: messageList})
  }

  handleLabelsAdd = (label) => {
    let messageList = this.state.messages.map((m) => {
      if(m.selected === true) {
        let labelsArr = [label].concat(m.labels.filter(l => l !== label))
        m.labels = labelsArr.sort();
      }
      return m
    })
    this.setState({messages: messageList})
  }

  handleLabelsRemove = (label) => {
    let messageList = this.state.messages.map((m) => {
      if(m.selected === true) {
        let labelsArr = m.labels.filter(l => l !== label)
        m.labels = labelsArr.sort();
      }
      return m
    })
    this.setState({messages: messageList})
  }

  toggleComposeForm = (e) => {
    this.setState({ formToggle: !this.state.formToggle})
  }

  submitComposeForm = (msg) => {
    msg.labels = JSON.stringify([]);
    axios.post('http://localhost:8000/messages', msg)
      .then((messages) => {
        this.setState({
            messages: messages.data,
            formToggle: !this.state.formToggle
        })
      })
  }

  render() {

    let {
      messages
    } = this.state

    let toolbarFilterCheck = messages.filter(m => m.selected);
    let toolbarSelectedCount =
          toolbarFilterCheck.length === messages.length ? 3
        : toolbarFilterCheck.length === 0 ? 1
        : 2;

    let unreadNum = messages.filter(m => m.read === false).length;
    let unreadStr = unreadNum === 1 ? "unread message" : "unread messages";

    let showCompose = this.state.formToggle ? <Compose submitCompose={this.submitComposeForm}/> : null;

    return (
      <div>
        <Toolbar
          selectedCount={toolbarSelectedCount}
          bulkSelectFn={this.handleBulkSelecting}
          bulkReadFn={this.handleRMarking}
          bulkUnreadFn={this.handleURMarking}
          bulkDeleteFn={this.handleBulkMsgDel}
          bulkLabelAddFn={this.handleLabelsAdd}
          bulkLabelRemoveFn={this.handleLabelsRemove}
          unreadNum={unreadNum}
          unreadStr={unreadStr}
          formToggle={this.state.formToggle}
          toggleComposeForm={this.toggleComposeForm}
          />
        {showCompose}
        <MessageList
          messages={this.state.messages}
          valueChangeFn={this.handleValueChanges}
          />
      </div>
    );
  }
}

export default App;
