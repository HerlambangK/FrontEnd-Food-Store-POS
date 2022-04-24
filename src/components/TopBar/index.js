import * as React from "react";
import StoreLogo from "../StoreLogo";
import FaUser from "@meronex/icons/fa/FaUser";

import { useSelector } from "react-redux";
import { ButtonCircle, Responsive } from "upkit";

import { Link } from "react-router-dom";

export default function TopBar() {
  let auth = useSelector((state) => state.auth);

  return (
    <Responsive desktop={2} justify="between" items="center">
      <div>
        <StoreLogo />
      </div>

      <div className="mr-5 text-right" style={{ textAlign: "Right" }}>
        <Link to={auth.user ? "/account" : "/login"}>
          <div className="mr-2 inline-block text-red-600 font-bold">
            {auth?.user?.full_name}
          </div>
          <ButtonCircle icon={<FaUser />} />
        </Link>
      </div>
    </Responsive>
  );
}
