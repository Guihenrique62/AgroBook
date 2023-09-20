import React from "react";
import swal from "sweetalert";

export default function Error(message) {
  return <div>{swal("Oops!", message, "error")}</div>;
}
