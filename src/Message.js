import React, {Component} from 'react'

class Message extends Component {

  handleStarred = (e) => {
    e.preventDefault();
    this.props.valueChangeFn(this.props.message, "starred", !this.props.message.starred)
  }

  render() {

    let {
      read,
      starred,
      selected,
      labels,
      subject
    } = this.props.message

    let ifRead = read ? "read" : "unread";
    let ifStarred = starred ? "star fa fa-star" : "star fa fa-star-o";
    let ifSelected = selected ? "selected" : "";
    let labelsMapped = labels.map((label, i) => {
      return <span key={i} className="label label-warning">{label}</span>
    })

    return (
    <div className={`row message ${ifRead} ${ifSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected}
              />
          </div>
          <div className="col-xs-2">
            <i
              id={this.props.message.id}
              className={ifStarred}
              onClick={this.handleStarred}
              ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelsMapped}
        <span>
          {subject}
        </span>
      </div>
    </div>
    )
  }
}

export default Message
