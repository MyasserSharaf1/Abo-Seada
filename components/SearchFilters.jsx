import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  filter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

// import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";

import React from "react";
import { filterData, getFilterValues } from "../utils/filterData";
const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const searchProperties = (filterValues) => {};

  // {filters.map((filter) => (
  //   <Box key={filter.queryName}>
  // <Select onChange={(e)=> searchProperties({ [filter.queryName]:})}>

  // </Select>
  //   </Box>))}
  return;
  <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap"></Flex>;
};

export default SearchFilters;
