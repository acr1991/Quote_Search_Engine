import React, { Component } from "react";
import PropTypes from "prop-types";

class Quote extends Component {
  static propTypes = {
    quoteText: PropTypes.string.isRequired,
    quoteAuthor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    liked: PropTypes.string.isRequired,
    setLiked: PropTypes.func.isRequired,
    setDisliked: PropTypes.func.isRequired
  };

  handleLike() {
    this.props.setLiked(this.props.id);
  }
  handleDislike() {
    this.props.setDisliked(this.props.id);
  }

  render() {
    let style = {};
    if (this.props.liked === "yes") {
      style = { color: "green" };
    } else if (this.props.liked === "no") {
      style = { color: "red", textDecoration: "line-through" };
    }

    return (
      <div key={this.props.id}>
        <div style={style}>
          <p className="quote-text">{this.props.quoteText}</p>
          <p className="quote-author">By: {this.props.quoteAuthor}</p>
        </div>
        <div className="buttons">
          <button className="like" onClick={() => this.handleLike()}>
            👍🏻
          </button>
          <button className="dislike" onClick={() => this.handleDislike()}>
            👎🏻
          </button>
        </div>
      </div>
    );
  }
}

export default Quote;
