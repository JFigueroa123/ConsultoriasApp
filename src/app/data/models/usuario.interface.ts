export interface usuarioI{
    id: number
    nombreCompleto: string
    userName: string
    password: string
    email: string
    telefono: string
    fechaCreacion: string
    fechaExpiracionPassword: string
    activo: boolean
    usuarioRol?: UsuarioRol
}

export class Usuario {
  id: number = 0;
  nombreCompleto: string = "";
  userName: string = "";
  password: string = "";
  email: string = "";
  telefono: string = "";
  fechaCreacion: string = "";
  fechaExpiracionPassword: string = "";
  activo: boolean = false;
  usuarioRol?: UsuarioRol

}


export interface UsuarioRol {
  id: number
  idUsuario: number
  idRol: number
  fechaCreacion: string
  rol: Rol
}

export interface Rol {
  id: number
  nombre: string
  fechaCreacion: string
  activo: boolean
  rolOpcionesMenu: RolOpcionesMenu[]
}

export interface RolOpcionesMenu {
  id: number
  idRol: number
  idOpcionMenuN1: number
  fechaCreacion: string
  opcionMenuN1: OpcionMenuN1
}

export interface OpcionMenuN1 {
  id: number
  nombre: string
  url: string
  fechaCreacion: string
  icono: string
  numeroOrden: number
  opcionesMenuN2?: OpcionesMenuN2[]
}

export interface OpcionesMenuN2 {
  id: number
  nombre: string
  url: string
  fechaCreacion: string
  idMenuN1: number
  icono: string
}

