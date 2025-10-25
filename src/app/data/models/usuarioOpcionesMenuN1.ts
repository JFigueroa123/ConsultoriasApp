export interface UsuarioOpcionesMenuN1I {
  id: number
  idUsuario: number
  idMenuN1: number
  fechaCreacion: string
  opcionesMenuN1: OpcionesMenuN1I
}

export interface OpcionesMenuN1I {
  id: number
  nombre: string
  url: string
  fechaCreacion: string
  icono: string
  numeroOrden: number
}
