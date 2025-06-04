import { Injectable } from '@angular/core';
import { DaneOut } from './dane-out';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiURL = "http://localhost:3200/api/bingo"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

    create(dane: DaneOut): Observable<any> {
    return this.httpClient.post(this.apiURL + '/', JSON.stringify(dane), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

    findAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL+'/');
  }




  update(id: number, dane: DaneOut): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/${id}`, JSON.stringify(dane), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }


  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

    errorHandler(error: any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  };




}
