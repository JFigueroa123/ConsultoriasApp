import { ClientesI } from "./clientes.interface"
import { EstadosI } from "./estados.interface"
import { usuarioI } from "./usuario.interface"

export interface VisitasClientesI {
  id: number
  idCliente: number
  idTecnico: number
  fechaVisita: string
  observaciones: string
  idEstado: number
  fechaHoraLlegada: string
  fechaHoraSalida: string,
  cliente?:ClientesI
  estado?: EstadosI
  usuario?: usuarioI
}
