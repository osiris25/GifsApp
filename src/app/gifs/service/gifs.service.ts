import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'usVBdI86DgFnA07KzScUmq3yaM6lT5Iz';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial:string[]=[];//almacena los strings 

  public resultados : Gif[]=[];//almacena la data de la busqueda 

  get historial(){//trae los valores del arreglo y genera un nuevo arreglo
      return[...this._historial];
  }

  constructor(private http:HttpClient){//inyectamos el servicio http
    this._historial=JSON.parse(localStorage.getItem('historial')!) || []  ; 
    // if(localStorage.getItem('historial')){ //regresas lo almacenado en el localstorage
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }

    if(localStorage.getItem('ultimoResultado')){
      this.resultados=JSON.parse(localStorage.getItem('ultimoResultado')!);
    }
  }

  buscarGifs( query:string){
    query=query.trim().toLowerCase();//combierte a minusculas las entradas
    if(!this._historial.includes(query)){ // si no existe en el arreglo lo agrega
      this._historial.unshift(query); //lo agrega al final del arreglo
      this._historial=this._historial.splice(0,10);//solo tomas 10 busquedas
      
      localStorage.setItem('historial',JSON.stringify(this._historial));//graba en el localstorage la busqueda
    }
  //parametros para crear el url
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query);


    //traemos la api, el ${query} es el valor de lo que intruduce el usuario
    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`,{params})
      .subscribe((resp:any) =>{
        this.resultados = resp.data;
         localStorage.setItem('ultimoResultado',JSON.stringify(this.resultados));//graba en el localStorage los resultados de la busqueda
    
        
      })
    
    
  }



}
