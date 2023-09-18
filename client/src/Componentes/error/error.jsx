import React from "react";
import swal from "sweetalert";

export default function error(message) {
  return <div>{swal("Oops!", message, "error")}</div>;
}
