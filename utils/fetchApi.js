import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      "X-RapidAPI-Key": "f62bc80bd6msh17f30e81130496ep1cd5b9jsna88eb6452b9b",
    },
  });

  return data;
};
