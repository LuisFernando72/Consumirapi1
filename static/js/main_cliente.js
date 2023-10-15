const modalCliente = document.querySelector("#modalCliente");
const AbrirModalCliente = document.querySelector("#AbrirModalCliente");
const btn_cancelarDatosC = document.querySelector("#btn_cancelarDatosC");

const idCliente = document.querySelector("#idCliente");
const txtnombres = document.querySelector("#txtnombres");
const txtapellidos = document.querySelector("#txtapellidos");
const txtnit = document.querySelector("#txtnit");
const txtgenero = document.querySelector("#txtgenero");
const txtcorreo = document.querySelector("#txtcorreo");

let icon_error2 = document.querySelectorAll("#icoError2");

const error_idCliente = document.querySelector("#idCliente-error");
const error_txtnombres = document.querySelector("#txtnombres-error");
const error_txtapellidos = document.querySelector("#txtapellidos-error");
const error_txtnit = document.querySelector("#txtnit-error");
const error_txtgenero = document.querySelector("#txtgenero-error");
const error_txtcorreo = document.querySelector("#txtcorreo-error");
// btns
const btnAgregarCliente = document.querySelector("#btnAgregarCliente");
const btnEliminarCliente = document.querySelector("#btnEliminarCliente");
const btnModificarCliente = document.querySelector("#btnModificarCliente");

AbrirModalCliente.addEventListener("click", (e) => {
  e.preventDefault();
  modalCliente.showModal();
  btnAgregarCliente.style.display = "block";
  btnEliminarCliente.style.display = "none";
  btnModificarCliente.style.display = "none";
});

btn_cancelarDatosC.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    target: document.querySelector("#modalCliente"),
    title: "¿Desea cancelar el registro?",
    text: "Se perderán los datos, si es que ya llenó algunos.",
    icon: "info",
    background: "#ffffff",
    showCancelButton: true,
    confirmButtonColor: "#0072ff",
    cancelButtonColor: "#D2122E",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí, deseo salir",
  }).then((result) => {
    if (result.value) {
      modalCliente.close();
      LimpiarColor2();
      LimpiarInputs2();
      ColorIcon2();
    }
  });
});

let erroresFormC = {
  txtnombres: true,
  txtapellidos: true,
  txtnit: true,
  txtgenero: true,
  txtcorreo: true,
};

const validatefieldWhite2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    error.innerHTML = "*Por favor llenar el campo";
    erroresFormC[field_id] = true;
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    error.innerText = "";
    erroresFormC[field_id] = false;
  }

  submitControllerC();
};

const validatefield2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp(
    "^([A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+(?:[-' ][A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+)*)$"
  );

  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormC[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormC[field_id] = true;
    error.innerHTML = "*Inicial Mayúscula, solo se permiten letras";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    erroresFormC[field_id] = false;
    error.innerText = "";
  }
  submitControllerC();
};

const validateSelect2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  console.log(fieldValue);
  if (fieldValue == -1) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormC[field_id] = true;
    error.innerHTML = "*Por favor seleccionar categoria";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    erroresFormC[field_id] = false;
    error.innerText = "";
  }
  submitControllerC();
};

txtnombres.addEventListener("input", (e) =>
  validatefield2(0, error_txtnombres, e)
);

txtnombres.addEventListener("blur", (e) =>
  validatefieldWhite2(0, error_txtnombres, e)
);

txtapellidos.addEventListener("input", (e) =>
  validatefield2(1, error_txtapellidos, e)
);

txtapellidos.addEventListener("blur", (e) =>
  validatefieldWhite2(1, error_txtapellidos, e)
);

txtnit.addEventListener("input", (e) =>
  validatefieldWhite2(2, error_txtnit, e)
);
txtnit.addEventListener("blur", (e) => validatefieldWhite2(2, error_txtnit, e));

txtgenero.addEventListener("click", (e) =>
  validateSelect2(3, error_txtgenero, e)
);

txtgenero.addEventListener("change", (e) =>
  validateSelect2(3, error_txtgenero, e)
);

const validateEmailB = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp("^(.*)@(gmail|googlemail|(.*.)google).com");

  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormC[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormC[field_id] = true;
    error.innerHTML = "*No cumple como un correo válido";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    erroresFormC[field_id] = false;
    error.innerText = "";
  }
  if (fieldValue === "Ni") {
    icon_error2[contador].classList.remove("invalid-background-ico");
    erroresFormC[field_id] = false;
    field.style.borderColor = "#00d333";
    error.innerText = "";
  }
  submitControllerC();
};

txtcorreo.addEventListener("blur", (e) =>
  validateEmailB(4, error_txtcorreo, e)
);
txtcorreo.addEventListener("input", (e) =>
  validateEmailB(4, error_txtcorreo, e)
);

submitControllerC = () => {
  if (
    erroresFormC.txtnombres ||
    erroresFormC.txtapellidos ||
    erroresFormC.txtnit ||
    erroresFormC.txtgenero ||
    erroresFormC.txtcorreo
  ) {
    btnAgregarCliente.toggleAttribute("disabled", true);
  } else {
    btnAgregarCliente.toggleAttribute("disabled", false);
  }
};

$(document).ready(function () {
  $("#tblCliente").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
    scrollY: true,
    scrollX: true,
  });
});

$("#tblCliente").on("click", "tr td", function (evt) {
  let idcliente,
    Nombres,
    Apellidos,
    Nit,
    idGenero,
    Fecha_ingreso,
    Correo,
    Fecha_Actualizacion;

  target = $(event.target);
  idcliente = target.parent("tr").find("td").eq(0).html();
  Nombres = target.parent("tr").find("td").eq(1).html();
  Apellidos = target.parent("tr").find("td").eq(2).html();
  Nit = target.parent("tr").find("td").eq(3).html();
  idGenero = target.parent("tr").find("td").eq(5).html();
  Correo = target.parent("tr").find("td").eq(7).html();

  let valorestable = {
    idcliente,
    Nombres,
    Apellidos,
    Nit,
    idGenero,
    Correo,
  };

  AbrirModal2(valorestable);
});

function AbrirModal2(valorestable) {
  modalCliente.showModal();
  let data = valorestable;
  idCliente.value = data.idcliente;
  txtnombres.value = data.Nombres;
  txtapellidos.value = data.Apellidos;
  txtnit.value = data.Nit;
  txtgenero.value = Number(data.idGenero);
  txtcorreo.value = data.Correo;
  btnAgregarCliente.style.display = "none";
  btnEliminarCliente.style.display = "block";
  btnModificarCliente.style.display = "block";
}

function LimpiarInputs2() {
  idCliente.value = "";
  txtnombres.value = "";
  txtapellidos.value = "";
  txtnit.value = "";
  txtgenero.value = -1;
  txtcorreo.value = "";
  error_txtnombres.innerHTML = "";
  error_txtapellidos.innerHTML = "";
  error_txtnit.innerHTML = "";
  error_txtgenero.innerHTML = "";
  error_txtcorreo.innerHTML = "";
}

function LimpiarColor2() {
  txtnombres.style.borderColor = "b8b8b8";
  txtapellidos.style.borderColor = "b8b8b8";
  txtnit.style.borderColor = "b8b8b8";
  txtgenero.style.borderColor = "b8b8b8";
  txtcorreo.style.borderColor = "b8b8b8";
}

function ColorIcon2() {
  for (let i = 0; i < icon_error2.length; i++) {
    icon_error[i].classList.replace(
      "invalid-background-ico",
      "border-colorIcon"
    );
  }
}

// OperacionesClientes
let frmc = $("#formC");

let boton = document.getElementsByName("accion1");
 
for (btn of boton){
  btn.addEventListener("click", function(e){
    e.preventDefault();
    let valor = this.value;
    uno = valor;
    Enviarform(e,valor)
    
  })
}

function Enviarform(e, valor){
  e.preventDefault();
  $.ajax({
    type: frmc.attr("method"),
    url: frmc.attr("action")+ "/"+valor,
    data: frmc.serialize(),
    success: function (response) {
      const respuesta = JSON.parse(response);
      console.log(respuesta.estado);

      if (respuesta.estado == 0) {
        modalCliente.close();
        Swal.fire({
          title: "Error",
          text: respuesta.mensaje,
          icon: "error",
          confirmButtonColor: "#ff004c",
        }).then(function () {
          window.location.replace("/Generales/Clientes");
        });
      } else {
        modalCliente.close();
        Swal.fire({
          title: "Excelente!!",
          text: respuesta.mensaje,
          icon: "success",
          confirmButtonColor: "#008d49",
        }).then(function () {
          window.location.replace("/Generales/Clientes");
        });
      }
    },
    error: function (error) {
      alert(error);
    },
  });
}



frmc.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: frmc.attr("method"),
    url: frmc.attr("action"),
    data: frmc.serialize(),
    success: function (response) {
      const respuesta = JSON.parse(response);
      console.log(respuesta.estado);

      if (respuesta.estado == 0) {
        modalCliente.close();
        Swal.fire({
          title: "Error",
          text: respuesta.mensaje,
          icon: "error",
          confirmButtonColor: "#ff004c",
        }).then(function () {
          window.location.replace("/Generales/Clientes");
        });
      } else {
        modalCliente.close();
        Swal.fire({
          title: "Excelente!!",
          text: respuesta.mensaje,
          icon: "success",
          confirmButtonColor: "#008d49",
        }).then(function () {
          window.location.replace("/Generales/Clientes");
        });
      }
    },
    error: function (error) {
      alert(error);
    },
  });


});
