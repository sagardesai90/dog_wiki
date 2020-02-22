import React, { Component } from "react";
import "./SearchRes.css";
import _ from "lodash";

class SearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      message: "Loading",
      breedNameParts: props.breedNameParts
    };
  }

  componentDidMount() {
    this.getImage(this.state.breedNameParts);
  }

  async getImage(breedNameParts) {
    const breedId = breedNameParts.join("/");
    if (localStorage.getItem(breedId) !== null) {
      this.setState({ imageUrl: localStorage.getItem(breedId) });
      return;
    }

    return fetch(`https://dog.ceo/api/breed/${breedId}/images`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        const imageUrls = resJson.message;
        const imageUrl = imageUrls[_.random(0, imageUrls.length - 1)];
        this.setState({ imageUrl });
        localStorage.setItem(breedId, imageUrl);
      })
      .catch(err => {
        console.error(err);
        this.setState({ message: "Error loading Dog image" });
      });
  }

  render() {
    const breedNameTitle = _.chain(this.state.breedNameParts)
      .map(_.capitalize)
      .join(" ")
      .value();
    const content =
      this.state.imageUrl !== null ? (
        <img className="img" src={this.state.imageUrl} />
      ) : (
        <p>{this.state.message}</p>
      );
    return (
      <div>
        {content}
        <p>{breedNameTitle}</p>
      </div>
    );
  }
}

export default SearchRes;
