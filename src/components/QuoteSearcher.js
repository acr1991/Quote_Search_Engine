import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    keyword: "",
    searched: false
  };

  search(keyword) {
    this.setState({ ...this.state, fetching: true });
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${keyword}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          quotes: data.results
            .reduce(
              (acc, quote) => {
                if (!acc.texts.includes(quote.quoteText)) {
                  acc.texts.push(quote.quoteText);
                  acc.quotes.push(quote);
                }
                return acc;
              },
              { texts: [], quotes: [] }
            )
            .quotes.map(quote => {
              return { ...quote, liked: "unknown" };
            }),
          fetching: false,
          searched: true
        });
      })
      .catch(console.error);
  }

  setLiked = id => {
    this.setState({
      ...this.state,
      quotes: this.state.quotes.map(quote => {
        if (quote._id === id) {
          return { ...quote, liked: "yes" };
          //
        } else {
          return quote;
        }
      })
    });
  };

  setDisliked = id => {
    this.setState({
      ...this.state,
      quotes: this.state.quotes.map(quote => {
        if (quote._id === id) {
          return { ...quote, liked: "no" };
        } else {
          return quote;
        }
      })
    });
  };

  handleChange(event) {
    this.setState({
      ...this.state,
      keyword: event.target.value
    });
  }

  render() {
    const liked = this.state.quotes.filter(quote => quote.liked === "yes")
      .length;
    const disliked = this.state.quotes.filter(quote => quote.liked === "no")
      .length;
    return (
      <div>
        <h1> Thoughtful Quotes 💭</h1>
        <input
          value={this.state.keyword}
          onChange={event => {
            this.handleChange(event);
          }}
          placeholder="Enter a keyword"
        ></input>
        <button onClick={() => this.search(this.state.keyword)}>Search!</button>
        {this.state.searched && !this.state.fetching && (
          <p style={{ fontWeight: "bold" }}>
            We found {this.state.quotes.length} quotes by{" "}
            {
              this.state.quotes.reduce((listOfAuthors, quote) => {
                if (!listOfAuthors.includes(quote.quoteAuthor)) {
                  listOfAuthors.push(quote.quoteAuthor);
                }
                return listOfAuthors;
              }, []).length
            }{" "}
            authors
          </p>
        )}
        {this.state.searched &&
          !this.state.fetching &&
          this.state.quotes.length > 0 && (
            <p style={{ fontWeight: "bold" }}>
              Liked: {liked} / Disliked: {disliked}
            </p>
          )}
        <div className="quotes">
          {this.state.fetching && <p>Loading.....</p>}
          {!this.state.fetching &&
            this.state.quotes.map(quote => {
              return (
                <Quote
                  quoteText={quote.quoteText}
                  quoteAuthor={quote.quoteAuthor}
                  key={quote._id}
                  id={quote._id}
                  liked={quote.liked}
                  setLiked={this.setLiked}
                  setDisliked={this.setDisliked}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default QuoteSearcher;
