export interface ColumnConfig {
  field: string;      // Propiedad del objeto
  header: string;     // Nombre que se mostrará en la tabla
}


export interface QueryFilter {
    filtro: string;
    parametro: string | number | boolean | any;
}

export interface FiltrosC {
    nombre: string; //Te
    tipo: "lista" | "rangoFechas" | "input" | "checkbox" | "fecha" | "rangoNumerico" | "input-search-piloto" | "input-search-mec"| 
          "input-search-codActivo"| "input-search-rep" | "input-search-empleado" | "input-search-prov" | "input-search-producto"; //Tipo de Input a Utilizar
    tipoInput?: "string" | "number" | "time"; 
    valores?: ValoresFiltrosC[]; 
    filters: QueryFilter[]; 
    activo: boolean; 
    requerido: boolean; 
}

export interface ValoresFiltrosC {
    nombre: string; //Nombre a mostrar
    valor: any; //Valor a devolver 
}