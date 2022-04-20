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

  // () dengarkan semua perubahan _field_
  let allFields = watch();

  // () fungsi `onSubmit`
  const onSubmit = async (FormData) => {
    // Kemudian kita akan membuat fungsi untuk mengupdate value dari masing-masing field di form, memanfaatkan fungsi setValue yang sudah kita ambil dari useForm sebelumnya:
  };
  return <div>UserAddressAdd</div>;
}
