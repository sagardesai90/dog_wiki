export default {
  breedLookup(breed_name) {
    return fetch(`https://dog.ceo/api/breed/${breed_name}/images`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json());
  }
};
