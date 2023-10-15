const AbrirModalProducto = document.querySelector("#AbrirModalProducto");
const modalProducto = document.querySelector("#modalProducto");
const ver = document.querySelector("#labelagregar");
const nover = document.querySelector("#labelact");
const btnAgregar = document.querySelector("#btnAgregarProducto");
const btneliminar = document.querySelector("#btnEliminarProducto");
const btnactualizar = document.querySelector("#btnModificarProducto");
const divcompra = document.querySelector("#divCompra");
const veridcompra = document.querySelector("#veridcompra");
const image = document.querySelector("#image");
const divimage = document.querySelector("#divimage");

AbrirModalProducto.addEventListener("click", (e) => {
  e.preventDefault();
  modalProducto.showModal();
  nover.style.display = "none";
  ver.style.display = "block";
  btnAgregar.style.display = "block";
  btnactualizar.style.display = "none";
  btneliminar.style.display = "none";
  divcompra.style.display = "none";
  divimage.style.display = "none";
});

const cerrarModal = document.querySelector("#btn_cancelarDatosP");

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    target: document.querySelector("#modalProducto"),
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
      modalProducto.close();
      LimpiarColor();
      LimpiarInputs();
      ColorIcon();
    }
  });
});

// DATOS DEL FORMULARIO

const txtproducto = document.querySelector("#txtproducto");
const txtprecioCosto = document.querySelector("#txtprecioCosto");
const txtcantidad = document.querySelector("#txtcantidad");
const txtcategoria = document.querySelector("#txtcategoria");
const txtmarca = document.querySelector("#txtmarca");
const txtdocumento = document.querySelector("#txtdocumento");
const txtproveedor = document.querySelector("#txtproveedor");
const txtimagenProducto = document.querySelector("#txtimagenProducto");
const txtDescripcion = document.querySelector("#txtDescripcion");
const txtbodega = document.querySelector("#txtbodega");
// ERRORES
const icon_error = document.querySelectorAll("#icoError");

const error_txtproducto = document.querySelector("#txtproducto-error");
const error_txtprecioCosto = document.querySelector("#txtprecioCosto-error");
const error_cantidad = document.querySelector("#txtcantidad-error");
const error_categoria = document.querySelector("#txtcategoria-error");
const error_marca = document.querySelector("#txtmarca-error");
const error_documento = document.querySelector("#txtdocumento-error");
const error_proveedor = document.querySelector("#txtproveedor-error");
const error_descripcion = document.querySelector("#txtDescripcion-error");
const error_txtbodega = document.querySelector("#txtbodega-error");

let erroresForm1 = {
  txtproducto: true,
  txtprecioCosto: true,
  txtcantidad: true,
  txtcategoria: true,
  txtmarca: true,
  txtdocumento: true,
  txtproveedor: true,
  txtDescripcion: true,
  txtbodega: true,
};

const validatefieldWhite = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  if (fieldValue.trim().length === 0) {
    icon_error[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    error.innerHTML = "*Por favor llenar el campo";
    erroresForm1[field_id] = true;
  } else {
    icon_error[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    error.innerText = "";
    erroresForm1[field_id] = false;
  }

  submitController();
};

const validatefield = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp(
    "^([A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+(?:[-' ][A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+)*)$"
  );

  if (fieldValue.trim().length === 0) {
    icon_error[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresForm1[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresForm1[field_id] = true;
    error.innerHTML = "*Inicial Mayúscula, solo se permiten letras";
  } else {
    icon_error[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    erroresForm1[field_id] = false;
    error.innerText = "";
  }
  submitController();
};

const validatefieldNumberFloat = (contador, med, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp("[0-9]+([.|,][0-9]+)?");

  if (fieldValue.trim().length === 0) {
    icon_error[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresForm1[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error[contador].classList.add("invalid-background-ico");

    erroresForm1[field_id] = true;
    field.style.borderColor = "#ff004c";
    error.innerHTML = "Números enteros y decimales";
  } else {
    icon_error[contador].classList.remove("invalid-background-ico");

    erroresForm1[field_id] = false;
    field.style.borderColor = "#00d333";
    error.innerText = "";
  }
  submitController();
};

const validateSelect = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  console.log(fieldValue);
  if (fieldValue == -1) {
    icon_error[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresForm1[field_id] = true;
    error.innerHTML = "*Por favor seleccionar categoria";
  } else {
    icon_error[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#00d333";
    erroresForm1[field_id] = false;
    error.innerText = "";
  }
  submitController();
};

txtproducto.addEventListener("input", (e) =>
  validatefield(0, error_txtproducto, e)
);

txtproducto.addEventListener("blur", (e) =>
  validatefieldWhite(0, error_txtproducto, e)
);

txtprecioCosto.addEventListener("blur", (e) =>
  validatefieldNumberFloat(1, 0, error_txtprecioCosto, e)
);
txtprecioCosto.addEventListener("input", (e) =>
  validatefieldNumberFloat(1, 0, error_txtprecioCosto, e)
);
txtcantidad.addEventListener("blur", (e) =>
  validatefieldNumberFloat(2, 0, error_cantidad, e)
);
txtcantidad.addEventListener("input", (e) =>
  validatefieldNumberFloat(2, 0, error_cantidad, e)
);

txtcategoria.addEventListener("click", (e) =>
  validateSelect(3, error_categoria, e)
);

txtcategoria.addEventListener("change", (e) =>
  validateSelect(3, error_categoria, e)
);

txtmarca.addEventListener("click", (e) => validateSelect(4, error_marca, e));
txtmarca.addEventListener("change", (e) => validateSelect(4, error_marca, e));
txtdocumento.addEventListener("click", (e) =>
  validateSelect(5, error_documento, e)
);
txtdocumento.addEventListener("change", (e) =>
  validateSelect(5, error_documento, e)
);
txtproveedor.addEventListener("click", (e) =>
  validateSelect(6, error_proveedor, e)
);
txtproveedor.addEventListener("change", (e) =>
  validateSelect(6, error_proveedor, e)
);

txtbodega.addEventListener("click", (e) =>
  validateSelect(7, error_txtbodega, e)
);
txtbodega.addEventListener("change", (e) =>
  validateSelect(7, error_txtbodega, e)
);

const validatetextArea = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  if (fieldValue.length == 0) {
    field.style.borderColor = "#ff004c";
    erroresForm1[field_id] = true;
    error.innerHTML = "*Por favor seleccionar llenar el campo";
  } else {
    field.style.borderColor = "#00d333";
    erroresForm1[field_id] = false;
    error.innerText = "";
  }
  submitController();
};

txtDescripcion.addEventListener("blur", (e) =>
  validatetextArea(8, error_descripcion, e)
);
txtDescripcion.addEventListener("input", (e) =>
  validatetextArea(8, error_descripcion, e)
);

submitController = () => {
  if (
    erroresForm1.txtproducto ||
    erroresForm1.txtprecioCosto ||
    erroresForm1.txtcantidad ||
    erroresForm1.txtcategoria ||
    erroresForm1.txtmarca ||
    erroresForm1.txtdocumento ||
    erroresForm1.txtproveedor ||
    erroresForm1.txtDescripcion ||
    erroresForm1.txtbodega
  ) {
    btnAgregar.toggleAttribute("disabled", true);
  } else {
    btnAgregar.toggleAttribute("disabled", false);
  }
};

function LimpiarInputs() {
  error_txtproducto.innerHTML = "";
  error_txtprecioCosto.innerHTML = "";
  error_cantidad.innerHTML = "";
  error_categoria.innerHTML = "";
  error_marca.innerHTML = "";
  error_documento.innerHTML = "";
  error_proveedor.innerHTML = "";
  error_descripcion.innerHTML = "";
  error_txtbodega.innerHTML = "";
  txtcategoria.value = -1;
  txtmarca.value = -1;
  txtdocumento.value = -1;
  txtbodega.value = -1;
  txtcantidad.value = "";
  txtproducto.value = "";
  txtprecioCosto.value = 0.0;
  txtDescripcion.value = "";
  txtproveedor.value = -1;
  image.value = "";

}

function LimpiarColor() {
  txtproducto.style.borderColor = "#b8b8b8";
  txtprecioCosto.style.borderColor = "#b8b8b8";
  txtcantidad.style.borderColor = "#b8b8b8";
  txtcategoria.style.borderColor = "#b8b8b8";
  txtmarca.style.borderColor = "#b8b8b8";
  txtdocumento.style.borderColor = "#b8b8b8";
  txtproveedor.style.borderColor = "#b8b8b8";
  txtDescripcion.style.borderColor = "#b8b8b8";
  txtbodega.style.borderColor = "#b8b8b8";
}

function ColorIcon() {
  for (let i = 0; i < icon_error.length; i++) {
    icon_error[i].classList.replace(
      "invalid-background-ico",
      "border-colorIcon"
    );
  }
}

// LLENAR LOS SELECT OPTION
SelectDynamic(
  txtcategoria,
  "http://127.0.0.1:8000/api/obtnenerCategoria",
  "ID_CATEGORIA",
  "NOMBRE_CATEGORIA"
);

SelectDynamic(
  txtmarca,
  "http://127.0.0.1:8000/api/obtnenerMarcas",
  "ID_MARCA",
  "NOMBRE_MARCA"
);

SelectDynamic(
  txtdocumento,
  "http://127.0.0.1:8000/api/obtnenerInventarios",
  "ID_INVENTARIO",
  "NO_DOCUMENTO"
);

SelectDynamic(
  txtproveedor,
  "http://127.0.0.1:8000/api/obtnenerProveedor",
  "ID_PROVEEDOR",
  "PROVEEDOR"
);

SelectDynamic(
  txtbodega,
  "http://127.0.0.1:8000/api/obtnenerBodega",
  "ID_BODEGA",
  "NOMBRE_BODEGA"
);

function SelectDynamic(input, url, id, valor) {
  axios.get(url, {}).then(function (response) {
    Object.entries(response.data).forEach(([key, value]) => {
      input.innerHTML +=
        "<option value='" + value[id] + "'>" + value[valor] + "</option>";
    });
  });
}

$(document).ready(function () {
  $("#tblCustomer").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
    scrollY: true,
    scrollX: true,
  });
});

op = document.querySelector("#op");

btneliminar.addEventListener("click", ()=>{
op.value = "EliminarProducto";
});

btnAgregar.addEventListener("click", ()=>{
op.value = "InsertarProducto";
});

btnactualizar.addEventListener("click", ()=>{
  op.value = "ModificarProducto";
  });

let frm = $("#formCrearProd");
frm.submit(function (e) {
  e.preventDefault();
   $.ajax({
    type: frm.attr("method"),
    url: "/CrearCompra",
    data: new FormData(this),
    processData: false,
    contentType: false,
    success: function (response) {
      const respuesta = JSON.parse(response);
      console.log(respuesta.estado);
      // let error = data;
      if (respuesta.estado == 0) {
        modalProducto.close();
        Swal.fire({
          title: "Error",
          text: respuesta.mensaje,
          icon: "error",
          confirmButtonColor: "#ff004c",
        }).then(function () {
          window.location.replace("/Generales/Productos");
        });
      } else {
        modalProducto.close();
        Swal.fire({
          title: "Excelente!!",
          text: respuesta.mensaje,
          icon: "success",
          confirmButtonColor: "#008d49",
        }).then(function () {
          window.location.replace("/Generales/Productos");
        });
      }
    },
    error: function (error) {
      alert(error);
    },
  });
});

// DATA TABLE  SELECT

$("#tblCustomer").on("click", "tr td", function (evt) {
  let target,
    idproducto,
    producto,
    preciounitario,
    cantidad,
    categoria,
    marca,
    nodocumento,
    proveedor,
    bodega,
    imagen,
    descripcion,
    idcompra;
  target = $(event.target);
  idproducto = target.parent("tr").find("td").eq(0).html();
  producto = target.parent("tr").find("td").eq(9).html();
  preciounitario = target.parent("tr").find("td").eq(12).html();
  cantidad = target.parent("tr").find("td").eq(16).html();
  categoria = target.parent("tr").find("td").eq(1).html();
  marca = target.parent("tr").find("td").eq(2).html();
  nodocumento = target.parent("tr").find("td").eq(14).html();
  proveedor = target.parent("tr").find("td").eq(4).html();
  bodega = target.parent("tr").find("td").eq(5).html();
  imagen = target.parent("tr").find("td").eq(19).html();
  descripcion = target.parent("tr").find("td").eq(10).html();
  idcompra = target.parent("tr").find("td").eq(6).html();
  let precio = financial(preciounitario);
  let valorestable = {
    idproducto,
    producto,
    precio,
    cantidad,
    categoria,
    marca,
    nodocumento,
    proveedor,
    bodega,
    imagen,
    descripcion,
    idcompra,
  };

  AbrirModal(valorestable);
});

function AbrirModal(valorestable) {
  modalProducto.showModal();
  let data = valorestable;
  console.log(data.precio);
  console.log(data.imagen);
  txtproducto.value = data.producto;
  txtprecioCosto.value = data.precio;
  txtcantidad.value = Number(data.cantidad);
  txtcategoria.value = Number(data.categoria);
  txtmarca.value = Number(data.marca);
  txtdocumento.value = Number(data.nodocumento);
  txtproveedor.value = Number(data.proveedor);
  txtDescripcion.value = data.descripcion;
  txtbodega.value = Number(data.bodega);
  veridcompra.value = Number(data.icompra);
  document.querySelector("#idprod").value = data.idproducto;
  document.querySelector("#txtidCompra").value = data.idcompra;
  image.value = data.imagen;
  vistaActualizar();
}

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function vistaActualizar() {
  ver.style.display = "none";
  nover.style.display = "block";
  btnAgregar.style.display = "none";
  btnactualizar.style.display = "block";
  btneliminar.style.display = "block";
  divcompra.style.display = "block";
  divimage.style.display = "block";
}
