const rules = {
  full_name: {
    required: { value: true, message: "Nama lengkap harus di isi. " },
    maxLength: {
      value: 500,
      message: "Panjang nama lengkap maksimal 500 karakter",
    },
  },

  // (1) email harus diisi dan panjang maksimal 255
  email: {
    required: { value: true, message: "Email harus diisi." },
    maxLength: { value: 255, message: "Panjang email maksimal 255 karakter." },
    // (1) cek pola / pattern email
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: "Email tidak valid",
    },
  },

  // (1) rule password
  password: {
    required: { value: true, message: "Password harus diisi." },
    maxLength: {
      value: 255,
      message: "Panjang password maksimal 255 karakter.",
    },
  },

  // (1) rule konfirmasi password
  password_confirmation: {
    required: { value: true, message: "Konfirmasi password harus diisi." },
  },
};

// (1) export rules
export { rules };
