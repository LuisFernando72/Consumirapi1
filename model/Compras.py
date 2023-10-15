import requests
import json


class Compras():

    def __init__(self) -> None:
        pass

    def ObtenerCompras(self):
        url = 'http://127.0.0.1:8000/api/pintarCompras'

        x = requests.get(url)
        if x.status_code == 200:
            data = x.json()

        return data

    def AgregarCompra(self, idproducto, idcategoria, idmarca, producto, descripcion, imagen, preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra):
        url = 'http://127.0.0.1:8000/api/crearProducto'
        response = {}
        parametros = {
            "ID_PRODUCTO": idproducto,
            "ID_CATEGORIA": idcategoria,
            "ID_MARCA": idmarca,
            "PRODUCTO": producto,
            "DESCRIPCION": descripcion,
            "IMAGEN": imagen,
            "PRECIO_COSTO": preciocosto,
            "PRECIO_VENTA": 0,
            "ID_INVENTARIO": idinventario,
            "ID_PROVEEDOR": idproveedor,
            "CANTIDAD": cantidad,
            "ID_BODEGA": idbodega,
            "ID_COMPRA": idcompra}

        x = requests.post(url, data=json.dumps(parametros))
        if x.status_code == 201:
            response = {"estado": 1, "mensaje": "Compra Creada correctamente"}
        else:
            response = {"estado": 0, "mensaje": "Error al crear una compra"}

        return response

    def ModificarCompra(self, idproducto, idcategoria, idmarca, producto, descripcion, imagen, preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra):
        print("llego aqui")
        url = "http://127.0.0.1:8000/api/modificarCompra"

        response = {}
        parametros = {
            "ID_PRODUCTO": idproducto,
            "ID_CATEGORIA": idcategoria,
            "ID_MARCA": idmarca,
            "PRODUCTO": producto,
            "DESCRIPCION": descripcion,
            "IMAGEN": imagen,
            "PRECIO_COSTO": preciocosto,
            "PRECIO_VENTA": 0,
            "ID_INVENTARIO": idinventario,
            "ID_PROVEEDOR": idproveedor,
            "CANTIDAD": cantidad,
            "ID_BODEGA": idbodega,
            "ID_COMPRA": idcompra}

        x = requests.put(url, data=json.dumps(parametros))
        print(x.status_code)

        if x.status_code == 200:

            response = {"estado": 1, "mensaje": "Compra actualizada correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Error al actualizar la compra"}

        return response

    def eliminarProductos(self, idproducto, idcategoria, idmarca, producto, descripcion, imagen, preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra):
        response = {}
        parametros = {
            "ID_PRODUCTO": int(idproducto),
            "ID_CATEGORIA": int(idcategoria),
            "ID_MARCA": int(idmarca),
            "PRODUCTO": str(producto),
            "DESCRIPCION": str(descripcion),
            "IMAGEN": str(imagen),
            "PRECIO_COSTO": float(preciocosto),
            "PRECIO_VENTA": 0.0,
            "ID_INVENTARIO": int(idinventario),
            "ID_PROVEEDOR": int(idproveedor),
            "CANTIDAD": int(cantidad),
            "ID_BODEGA": int(idbodega),
            "ID_COMPRA":int(idcompra)}
        
        
        d = requests.delete("http://127.0.0.1:8000/api/eliminarCompra", json = parametros)
 

        if d.status_code == 200:
            response = {"estado": 1, "mensaje": "Producto eliminado correctamente de la compra!!"}
        else:
            response = {"estado": 0, "mensaje": "Error al eliminar el producto de la compra"}

        return response