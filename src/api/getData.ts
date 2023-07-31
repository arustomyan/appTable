const BASE_URL = "https://jsonplaceholder.typicode.com";

const getData = async () => {
  return fetch(`${BASE_URL}/posts`).then((response) => response.json());
};

export { getData };
