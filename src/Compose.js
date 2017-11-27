import React, { Component } from 'react'

class Compose extends Component {

  state = {

    subject: "",
    body: ""

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitCompose(this.state);
  }

  handleSubjectChange = (e) => {
    this.setState({subject: e.target.value})
  }

  handleBodyChange = (e) => {
    this.setState({body: e.target.value})
  }

  render () {

    let emptyCheck = this.state.subject !== "" && this.state.body !== "" ? "" : "disabled"

    return (
      <form
        className="form-horizontal well"
        onSubmit={this.handleSubmit}
        >
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="subject"
            className="col-sm-2 control-label"
            >Subject</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"
              onChange={this.handleSubjectChange}
              />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="body"
            className="col-sm-2 control-label"
            >Body</label>
          <div className="col-sm-8">
            <textarea
              name="body"
              id="body"
              className="form-control"
              onChange={this.handleBodyChange}
              ></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              type="submit"
              value="Send"
              className="btn btn-primary"
              disabled={emptyCheck}
              />
          </div>
        </div>
      </form>
    )
  }
}

export default Compose
