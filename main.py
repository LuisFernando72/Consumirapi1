from flask import Flask
from flask import render_template, request, redirect, Response, session, url_for
from model.Menu import Menu
from model.Compras import Compras
from model.api_usuario import Api_Usuario
from datetime import datetime
from model.Modificar import Modificar
from model.Clientes import Clientes
import json

import requests

app = Flask(__name__, template_folder="templates")
app.secret_key = "anystringhere"
api = Api_Usuario()
menu12 = ""


@app.route("/")
def Login():
    return render_template("login.html")


@app.route("/autenticarse", methods=["post"])
def autenticarse():
    api.Autenticar(request.form['txtCorreoUsuario'],
                   request.form['txtPassword'])
    response = api.ObtenerDatosMenu()
    if response["estado"] == 1:
        api.ObtenerMenu(str(response["mensaje"]))

    return json.dumps(response)


@app.route("/menu")
def menuInventiario():
    RenderMenu = api.menupintar
    dev = {"pintar": RenderMenu}
    return render_template("sitio/inicio.html", rr=dev)


@app.route("/CrearCompra", methods=["POST", "PUT", "DELETE"])
def CrearProducto():
    idproducto = request.form["idprod"]
    idcategoria = request.form["txtcategoria"]
    idmarca = request.form["txtmarca"]
    producto = request.form["txtproducto"]
    descripcion = request.form["txtDescripcion"]
    imagen = request.files["txtimagenProducto"]
    imagendef = request.form["image"]
    preciocosto = request.form["txtprecioCosto"]
    precioventa = 0
    idinventario = request.form["txtdocumento"]
    idproveedor = request.form["txtproveedor"]
    cantidad = request.form["txtcantidad"]
    idbodega = request.form["txtbodega"]
    idcompra = request.form["txtidCompra"]
    tiempo = datetime.now()
    horaActual = tiempo.strftime('%Y%H%M%S')
    

    accion = request.form["op"]
    print(accion)

    if accion == "InsertarProducto":
        nuevoNombre = ""
        if imagen.filename != "":
            nuevoNombre = horaActual+"_" + imagen.filename
            imagen.save("static/imgc/" + nuevoNombre)
        p = Compras()
        r = p.AgregarCompra(0, idcategoria, idmarca, producto, descripcion, nuevoNombre,
                            preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, 0)
        return json.dumps(r)

    if accion == "EliminarProducto":
        eliminar = Compras()
        retorno = eliminar.eliminarProductos(idproducto, idcategoria, idmarca, producto, descripcion, "nm",
                              preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra)
        return json.dumps(retorno)

    if accion == "ModificarProducto":
        p = Modificar()
        nm = ""
        if imagen.filename != "":
            nm = horaActual+"_" + imagen.filename
            imagen.save("static/imgc/" + nm)
        else:
            nm = imagendef

        r = p.ModificarCompra(idproducto, idcategoria, idmarca, producto, descripcion, nm,
                              preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra)
        return json.dumps(r)


@app.route("/Generales/Productos")
def ProductoService():
    array = {}
    item = []
    RenderMenu = api.menupintar
    c = Compras()
    retorno = c.ObtenerCompras()
    item.append(RenderMenu)
    item.append(retorno)
    dev = {"pintar": RenderMenu, "tabla": retorno}

    return render_template("productos.html", rr=dev)


@app.route("/Consultas/Consultas_productos")
def ConsultasProductos():
    RenderMenu = api.menupintar

    return render_template("consultas_productos.html", pintar=RenderMenu)

@app.route("/Generales/Clientes")
def renderClientes():
    item = []
    RenderMenu = api.menupintar
    c = Clientes()
    retorno = c.TraerClientes()
    item.append(RenderMenu)
    item.append(retorno)
    dev = {"pintar": RenderMenu, "tabla": retorno}

    return render_template("clientes.html", rr= dev)
    

#SERVICIOS CLIENTES
@app.route("/operacionesClientes/<string:accion>", methods=["POST"])
def OperacionesClientes(accion):
    idcliente = request.form["idCliente"]
    nombres = request.form["txtnombres"]
    apellidos = request.form["txtapellidos"]
    nit = request.form["txtnit"]
    genero = request.form["txtgenero"]
    correo = request.form["txtcorreo"]    
    print(accion)
    cc = Clientes()
    cc.ClientesConstructor(idcliente,nombres,apellidos, nit, genero, correo)
    
    if accion =="InsertarCliente":
        retorno = cc.crearCliente()
        return json.dumps(retorno)
    
    if accion == "EliminarCliente":
        retorno = cc.eliminarCliente()
        return json.dumps(retorno)
    
    if accion =="ModificarCliente":
        retorno = cc.modificarCliente()
        return json.dumps(retorno)


@app.route("/cerrar_sesion")
def cerrar_sesion():
    session.clear()
    return redirect(url_for("Login"))


if __name__ == "__main__":
    app.run(debug=True)
