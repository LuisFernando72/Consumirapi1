import requests
import json
class Clientes():
    def __init__(self) -> None:
        pass
    
    def TraerClientes(self):
           
        url = 'http://127.0.0.1:8000/api/verClientes'

        x = requests.get(url)
        if x.status_code == 200:
            data = x.json()

        return data
    
    def ClientesConstructor(self,idCliente,nombres, apellidos, nit, genero, correo):
        self.idCliente = idCliente
        self.nombres = nombres
        self.apellidos = apellidos
        self.nit = nit
        self.genero = genero
        self.correo= correo
        
        
    def crearCliente(self):
        url = 'http://127.0.0.1:8000/api/agregarcliente'
        response = {}
        parametros = {
            "idcliente": 0,
            "nombres": str(self.nombres),
            "apellidos": str(self.apellidos),
            "nit": str(self.nit),
            "genero": int(self.genero),
            "fecha_ingreso": "f",
            "correo": str(self.correo),
            "fecha_modificacion": "f",
           }

        x = requests.post(url, data=json.dumps(parametros))
        if x.status_code == 201:
            response = {"estado": 1, "mensaje": "Cliente agregado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}

        return response
    
    
    def eliminarCliente(self):
        url = 'http://127.0.0.1:8000/api/eliminarcliente'
        response = {}
        parametros = {
             "idcliente": int(self.idCliente),
            "nombres": str(self.nombres),
            "apellidos": str(self.apellidos),
            "nit": str(self.nit),
            "genero": int(self.genero),
            "fecha_ingreso": "f",
            "correo": str(self.correo),
            "fecha_modificacion": "f",
           }

        x = requests.delete(url, data=json.dumps(parametros))
        if x.status_code == 200:
            response = {"estado": 1, "mensaje": "Cliente eliminado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Error al intentar eliminarlo"}

        return response
    
    def modificarCliente(self):
        url = 'http://127.0.0.1:8000/api/modificarcliente'
        response = {}
        parametros = {
           "idcliente": int(self.idCliente),
            "nombres": str(self.nombres),
            "apellidos": str(self.apellidos),
            "nit": str(self.nit),
            "genero": int(self.genero),
            "fecha_ingreso": "f",
            "correo": str(self.correo),
            "fecha_modificacion": "f",
           }

        x = requests.put(url, data=json.dumps(parametros))
        if x.status_code == 200:
            response = {"estado": 1, "mensaje": "Cliente actualizado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Error al intentar actualizar"}

        return response
    
    
    