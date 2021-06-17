import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  // ! es el operador de asercion no nula 

  constructor(private gifService:GifsService){}
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length===0){//no prermite agregar cosas en blanco 
      return;
    }
    this.gifService.buscarGifs(valor); //mandas el valor para que se almacene en el arreglo
    this.txtBuscar.nativeElement.value="";
  }

}
