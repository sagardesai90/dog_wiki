import React, { Component } from "react";
import SearchRes from "./SearchRes";
import _ from "lodash";
import "./Search.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      breedName: "",
      allBreeds: null,
      filter: ""
    };
  }

  componentDidMount() {
    this.getAllBreeds();
  }

  getAllBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          allBreeds: res.message
        });
      });
  }

  flatttenBreeds() {
    if (this.state.allBreeds === null) {
      return [];
    } else {
      return _.flatMap(this.state.allBreeds, (subBreeds, breedName) => {
        if (subBreeds.length > 0) {
          return subBreeds.map(subBreed => [breedName, subBreed]);
        } else {
          return [[breedName]];
        }
      });
    }
  }

  updateFilter(event) {
    this.setState({ filter: event.target.value.toLowerCase() });
  }

  generateRows() {
    const breedNames = this.flatttenBreeds(this.state.allBreeds);
    return breedNames
      .filter(fullBreedNameParts => {
        if (this.state.filter === null || this.state.filter === "") {
          return true;
        } else {
          return fullBreedNameParts.some(breedNamePart => {
            return breedNamePart.toLowerCase().indexOf(this.state.filter) >= 0;
          });
        }
      })
      .map(fullBreedNameParts => {
        const breedId = fullBreedNameParts.join("/");
        return (
          <div className="thumbnail" key={breedId}>
            <SearchRes breedNameParts={fullBreedNameParts} />
          </div>
        );
      });
  }

  render() {
    return (
      <div>
        <h1>Dog Wiki</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={this.updateFilter.bind(this)}
        ></input>
        <div className="thumbnail-grid-parent">{this.generateRows()}</div>
      </div>
    );
  }
}

export default Search;
