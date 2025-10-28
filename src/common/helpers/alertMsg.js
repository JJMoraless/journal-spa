import Swal from "sweetalert2";
export const alertMsg = ({ msg }) => {
  Swal.fire(msg, "Accion realizada correctamente ⚡", "success");
};
