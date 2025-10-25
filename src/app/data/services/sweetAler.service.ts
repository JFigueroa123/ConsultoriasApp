import { Injectable } from "@angular/core";
import swal, { SweetAlertIcon, SweetAlertInput, SweetAlertOptions } from "sweetalert2";



@Injectable({
  providedIn: "root",
})

export class SweetAlerService {

//Titulo de la alerta -- Mensaje de Alerta -- Icono a mostrar (opcional)
  sweet_alerta(titulo: string, msj: string, icono: SweetAlertIcon = "success") {
    swal.fire({
      //Titulo de la Alerta
      title: titulo,
      //Mensaje de la Alerta
      text: msj,
      //Icono de la Alerta -- por defecto success
      icon: icono,
      //Corrige el error de diseño
      heightAuto: false,
    });
  }


  //Titulo del cuadro -- Mensaje del Cuadro --Icono del Cuadro (opcional)
  sweet_confirmacion(
    titulo: string,
    msj: string,
    icono: SweetAlertIcon = "question"
  ) {
    //Se debe crear una refencia del dialogo para escuchar la respuesta
    return swal.fire({
      //Titulo del Cuadro
      title: titulo,
      //Mensaje del Cuadro
      text: msj,
      //Icono del cuadro -- por defecto question
      icon: icono,
      //Muestra boton de cancelar
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si",
      //Color detrad del cuadro
      //backdrop: 'rgba(13,36,70,0.9)'
      //Corrige el error de diseño
      heightAuto: false,
    });
  }


  sweet_carga(titulo: string,
    lock: boolean = true) {
    return swal.fire({
      html:
        `<h6 class="text-bold p-0 m-0">${titulo}</h6>` +
        '<div class="loader"></div>' +
        '</div>',
      showConfirmButton: false,
      allowOutsideClick: !lock,
      //Permitir cerrar el cuadro al precionar la tecla Escape
      allowEscapeKey: !lock,
      //Permitir cerrar el cuadro al precionar la tecla Enter
      allowEnterKey: !lock,
      //Corrige el error de diseño
      heightAuto: false,
    });
  }

  sweet_Error(e: any) {
    console.log(e);
    try {
      this.sweet_alerta(
        e.error.aguilaErrores[0].titulo,
        e.error.aguilaErrores[0].detalle,
        "error"
      );
    } catch (error) {
      this.sweet_alerta(`Error ${e.status}`,
        'No es posible interpretar el error, comuníquese con el administrador del sistema. Error: ' + e.error,
        'error');
    }
  }

  sweet_Close() {
    swal.close();
  }

  //Mensaje Notificacion -- Tiempo Visible de la Notificacion (opcional) -- Icono de la Notificacion (opcional)
  sweet_notificacion(
    msj: string,
    timer: number = 2000,
    icono: SweetAlertIcon = "success",
    toast: boolean = true
  ) {
    swal.fire({
      //Posicion de la notificación
      position: "bottom-end",
      //icono a mostrar -- por defecto success
      icon: icono,
      //Mesnaje de la notificación
      text: msj,
      //Tiempo visible de la notificacion -- por defecto 2 segundos
      timer: timer,
      //Oculta/muestra el boton de confirmacion
      showConfirmButton: true,
      //Texto del boton de confirmacion
      confirmButtonText: "X",
      //Muestra una barra que indica el tiempo visible de la notificacion
      timerProgressBar: true,
      //Muestra la Notificacion como un Toast
      toast: toast,
      //Color de fondo de notificacion
      background: "#FFFFFF",
    });
  }

}