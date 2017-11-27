import React, { Component } from 'react';

class Toolbar extends Component {

  handleQuickSelection = (e) => {
    console.log("How about here?");
    e.preventDefault();
    console.log("Did you even get here?");
    this.props.bulkSelectFn(this.props.selectedCount);
  }

  handleMassRead = (e) => {
    console.log("Does this even work?");
    e.preventDefault();
    this.props.bulkReadFn();
  }

  handleMassUnread = (e) => {
    console.log("Does this even work?");
    e.preventDefault();
    this.props.bulkUnreadFn();
  }

  handleMassDelete = (e) => {
    e.preventDefault();
    this.props.bulkDeleteFn();
  }

  handleMassLabelAdd = (e) => {
    this.props.bulkLabelAddFn(e.target.value);
  }

  handleMassLabelRemove = (e) => {
    this.props.bulkLabelRemoveFn(e.target.value);
  }

  handleFormToggle = (e) => {
    this.props.toggleComposeForm();
  }

  render () {

    let selectedCheck =
          this.props.selectedCount === 3 ? "fa fa-check-square-o"
        : this.props.selectedCount === 1 ? "fa fa-square-o"
        : "fa fa-minus-square-o";

    let buttonDisable = this.props.selectedCount === 1 ? "disabled" : "";

    let toggleSwitcher = !this.props.formToggle ? "plus" : "minus";

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadNum}</span>
            {this.props.unreadStr}
          </p>

          <a className="btn btn-danger">
            <i
              className={`fa fa-${toggleSwitcher}`}
              onClick={this.handleFormToggle}
              ></i>
          </a>

          <button
            className="btn btn-default"
            onClick={this.handleQuickSelection}
            >
            <i className={selectedCheck}></i>
          </button>

          <button
            className="btn btn-default"
            disabled={buttonDisable}
            onClick={this.handleMassRead}
            >
            Mark As Read
          </button>

          <button
            className="btn btn-default"
            disabled={buttonDisable}
            onClick={this.handleMassUnread}
            >
            Mark As Unread
          </button>

          <select
            className="form-control label-select"
            disabled={buttonDisable}
            onChange={this.handleMassLabelAdd}
            >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select
            className="form-control label-select"
            disabled={buttonDisable}
            onChange={this.handleMassLabelRemove}
            >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button
            className="btn btn-default"
            disabled={buttonDisable}
            onClick={this.handleMassDelete}
            >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>

    )
  }
}

export default Toolbar
