import * as React from "react";
import { LayoutOne, InputText, FormControl, Textarea, Button } from "upkit";
import { useHistory } from "react-router-dom";

import TopBar from "../../components/TopBar";
import SelectWilayah from "../../components/SelectWilayah";
import { createAddress } from "../../api/address";
import { rules } from "./validation";
import { useForm } from "react-hook-form";

export default function UserAddressAdd() {
  // () gunakan `useHistory` dan `useForm`
  let history = useHistory();
  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  // console.log(getValues());
  // () dengarkan semua perubahan _field_
  let allFields = watch();

  React.useEffect(() => {
    register({ name: "provinsi" }, rules.provinsi);
    register({ name: "kabupaten" }, rules.kabupaten);
    register({ name: "kecamatan" }, rules.kecamatan);
    register({ name: "kelurahan" }, rules.kelurahan);
  }, [register]);

  React.useEffect(() => {
    setValue("kabupaten", null);
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.provinsi, setValue]);

  // jika kabupaten berubah, kecamatan dan kelurahan jadikan null
  React.useEffect(() => {
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.kabupaten, setValue]); // <-- deps allFields.kabupaten

  // jika kabupaten berubah, kelurahan jadikan null
  React.useEffect(() => {
    setValue("kelurahan", null);
  }, [allFields.kecamatan, setValue]); // <-- deps allFields.kecamatan

  // () fungsi `updateValue`
  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  // () fungsi `onSubmit`
  const onSubmit = async (formData) => {
    let payload = {
      nama: formData.nama_alamat,
      detail: formData.detail_alamat,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    };
    let { data } = await createAddress(payload);

    console.log(payload);

    if (data.error) {
      return;
    }

    history.push("/alamat-pengiriman");
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama alamat "
            errorMessage={errors.nama_alamat?.message}
            color="black"
          >
            <InputText
              placeholder="Nama alamat"
              fitContainer
              name="nama_alamat"
              ref={register(rules.nama_alamat)}
            ></InputText>
          </FormControl>

          <FormControl
            label="Provinsi"
            errorMessage={errors.provinsi?.message}
            color="black"
          >
            <SelectWilayah
              onChange={(option) => updateValue("provinsi", option)}
              name="provinsi"
              value={getValues().provinsi}
            ></SelectWilayah>
          </FormControl>

          <FormControl
            label="Kabupaten/Kota"
            errorMessage={errors.kabupaten?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="kabupaten"
              kodeInduk={getValues().provinsi?.value}
              onChange={(option) => updateValue("kabupaten", option)}
              value={getValues().kabupaten}
            ></SelectWilayah>
          </FormControl>

          <FormControl
            label="kecamatan"
            errorMessage={errors.kecamatan?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="kecamatan"
              kodeInduk={getValues().kabupaten?.value}
              onChange={(option) => updateValue("kecamatan", option)}
              value={getValues().kecamatan}
            ></SelectWilayah>
          </FormControl>

          <FormControl
            label="Kelurahan"
            errorMessage={errors.kelurahan?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="desa"
              kodeInduk={getValues().kecamatan?.value}
              onChange={(option) => updateValue("kelurahan", option)}
              value={getValues().kelurahan}
            ></SelectWilayah>
          </FormControl>

          <FormControl
            label="Detail alamat"
            errorMessage={errors.detail_alamat?.message}
            color="black"
          >
            <Textarea
              placeholder="Detail alamat"
              fitContainer
              name="detail_alamat"
              ref={register(rules.detail_alamat)}
            />
          </FormControl>
          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
}
