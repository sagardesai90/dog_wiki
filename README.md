# Dog Wiki

## A simple react application that lets users see breeds of dogs. I used the following endpoints:

- https://dog.ceo/api/breeds/list/all

- https://dog.ceo/api/breed/{breed_name}/images

The first endpoints was used to retrieve the categories of breeds while the second endpoint was used to get the appropriate images.

There are two essential components I used to create this app. Search.js is where I store the state, take care of local storage, handle user input, and pass on props to SearchRes.js, which is used to show the results.

To run the application, clone the repo and run `npm install` followed by `npm run start`.

## Code Samples

### Retrieving all dog breeds

```javascript
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
```

After fetching all the breed types in getAllBreeds and setting state, I flatten their names and pass that down to SearchRes through props as breedNameParts.

### Filter/Search Bar

```javascript
updateFilter(event) {
    this.setState({ filter: event.target.value.toLowerCase() });
}
```

As the user queries, I change the state.filter to their query, which is then used in generateRows to return the appropriate dog breeds.

### Caching

```javascript
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
```

In SearchRes.js, the first time the user goes to the page, breedId and imageUrl is stored in localstorage, which is then used in the next instances.
