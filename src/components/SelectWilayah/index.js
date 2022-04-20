import * as React from "react";
import axios from "axios";

import { config } from "../../config";
import { oneOf, number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";

export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
  // (1) definisikan _state_ lokal

  let [data, setData] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  // (1) dapatkan data wilayah dari web API
  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(`${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
      .then(({ data }) => setData(data))
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  // (1) gunakan komponen `<Select>` gunakan prop `onChange` pada _prop_ `onChange`
  return (
    <Select
      options={data.map((wilayah) => ({
        label: wilayah.nama,
        value: wilayah.kode,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
}
SelectWilayah.defaultProps = {
  tingkat: "provinsi",
};

// (1) definisi propTypes
SelectWilayah.propTypes = {
  tingkat: oneOf(["provinsi", "kabupaten", "kecamatan", "desa"]),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};

// import { oneOf, number, oneOfType, string } from "prop-types";
