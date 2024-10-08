import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private apiUrl = 'http://192.168.43.169:8080/folders'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getFolders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
