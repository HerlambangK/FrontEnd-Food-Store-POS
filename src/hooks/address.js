import * as React from "react";

import { getAddress } from "../api/address";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export function useAddressData() {
  let [data, setData] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState(statuslist.idle);
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);

  //   bungkus fetchaddress dengan useCallback biar nga render looping
  let fetchAddress = React.useCallback(
    async function () {
      //   ubah states menjadi process
      setStatus(statuslist.process);

      // request data alamat pengiriman dari web api
      let {
        data: { data, count, error },
      } = await getAddress({ page, limit });

      // cek error server
      if (error) {
        setStatus(statuslist.error);
        return;
      }

      // data alamat berhasil di dapatkan
      setStatus(statuslist.success);
      setData(data);
      setCount(count);
    },
    [page, limit]
  );

  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // (1) mengembalikan lokal _state_ dan beberapa fungsi udpater
  return {
    data,
    count,
    status,
    page,
    limit,
    setPage,
    setLimit,
  };
}
