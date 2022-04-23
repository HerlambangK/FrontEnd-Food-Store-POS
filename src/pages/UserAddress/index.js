import * as React from "react";
import TopBar from "../../components/TopBar";
import { useAddressData } from "../../hooks/address";

import { LayoutOne, Text, Table, Button } from "upkit";
import { Link } from "react-router-dom";

export default function UserAddress() {
  let { data, limit, page, status, count, setPage } = useAddressData();
  return <div>{JSON.stringify(data)}</div>;
}

//   return <div>{JSON.stringify(data)}</div>;
