import * as React from "react";
import { Button, Card, FormControl, InputText, LayoutOne } from "upkit";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
// import { rule } from "postcss";
import { registerUser } from "../../api/auth";
import { useHistory, Link } from "react-router-dom";
import StoreLogo from "../../components/StoreLogo";

// (1) statuslist
const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Register() {
  let { register, handleSubmit, errors, setError } = useForm();
  //   state status dengan nilai default 'statuslist.idle'
  let [status, setStatus] = React.useState(statuslist.idle);
  let history = useHistory();

  // (1) buat fungsi untuk menangani form submit
  const onSubmit = async (formData) => {
    // dapatkan variable password dan password_confirmation
    let { password, password_confirmation } = formData;

    // cek password vs password_confirmation
    if (password !== password_confirmation) {
      return setError("password_confirmation", {
        type: "equality",
        message: "Konfirmasi password harus sama dengan password",
      });
    }

    // set status process
    setStatus(statuslist.process);

    // alert(JSON.stringify(formData));
    console.log(formData);

    let { data } = await registerUser(formData);

    // cek ada error
    if (data.error) {
      // dapatkan field terkait jika error
      let fields = Object.keys(data.fields);
      console.log(data);

      //   untuk masing masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
        // set status = error
        setStatus(statuslist.error);
        return;
      });
    }
    // status sukses
    setStatus(statuslist.success);
    // refirect ke 'register/berhasil
    history.push("/register/berhasil");
  };

  return (
    <div>
      <LayoutOne size="small">
        <Card color="white">
          <div className="text-center mb-5">
            <StoreLogo />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl errorMessage={errors.full_name?.message}>
              <InputText
                name="full_name"
                placeholder="Nama Lengkap"
                fitContainer
                ref={register(rules.full_name)}
              />
            </FormControl>

            <FormControl errorMessage={errors.email?.message}>
              <InputText
                name="email"
                placeholder="Email"
                fitContainer
                ref={register(rules.email)}
              />
            </FormControl>

            <FormControl errorMessage={errors.password?.message}>
              <InputText
                name="password"
                placeholder="Password"
                fitContainer
                ref={register(rules.password_confirmation)}
              />
            </FormControl>

            <FormControl errorMessage={errors.password_confirmation?.message}>
              <InputText
                name="password_confirmation"
                placeholder="Konfirmasi Pssword"
                fitContainer
                ref={register(rules.password_confirmation)}
              />
            </FormControl>

            <Button
              size="large"
              fitContainer
              disabled={status === statuslist.process}
            >
              {status === statuslist.process ? "Sedang memproses" : "Mendaftar"}
            </Button>
          </form>

          <div className="text-center mt-3">
            Sudah punya akun?{" "}
            <Link to="/login">
              {" "}
              <b> Masuk Sekarang</b>
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
