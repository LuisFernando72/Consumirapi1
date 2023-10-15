import requests
import json

class Modificar():
    def __init__(self) -> None:
        pass
    
    def ModificarCompra(self, idproducto, idcategoria, idmarca, producto, descripcion, imagen, preciocosto, precioventa, idinventario, idproveedor, cantidad, idbodega, idcompra):
        print("llego aqui")
        
        print(idproducto)
        print(idcompra)
        print(imagen)
        
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
        
        
        d = requests.put("http://127.0.0.1:8000/api/actualizarcompra", json = parametros)
        print(d.status_code)

        if d.status_code == 201:
            response = {"estado": 1}
        else:
            response = {"estado": 0}

        return response
