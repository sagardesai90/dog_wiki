# Dog Wiki

## A simple react application that lets users see breeds of dogs. I used the following endpoints:

- https://dog.ceo/api/breeds/list/all

- https://dog.ceo/api/breed/{breed_name}/images

The first endpoints was used to retrieve the categories of breeds while the second endpoint was used to get the appropriate images.

There are two essential components I used to create this app. Search.js is where I store the state, take care of local storage, handle user input, and pass on props to SearchRes.js, which is used to show the results.

To run the application, clone the repo and run `npm install` followed by `npm run start`.
