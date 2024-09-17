import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://192.168.43.169/api/files';

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }

  downloadFile(fileId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileId}`, { responseType: 'blob' });
  }

  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${fileId}`);
  }
}
