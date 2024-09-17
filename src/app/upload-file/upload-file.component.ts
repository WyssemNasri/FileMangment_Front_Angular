import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  file: File | null = null;
  fileName: string | null = null;
  isUploading = false;
  folders: any[] = []; 
  selectedFolderId: number | null = null; 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadFolders(); 
  }

  loadFolders(): void {
 
    this.http.get('http://192.168.43.169:8080/folders').subscribe({
      next: (folders: any) => this.folders = folders,
      error: () => this.snackBar.open('Failed to load folders', 'Close', { duration: 3000 })
    });
  }

  pickFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
    }
  }

  uploadFile(): void {
    if (this.file && this.selectedFolderId) {
      if (!this.fileName?.endsWith('.pdf')) {
        this.snackBar.open('Please select a PDF file', 'Close', {
          duration: 3000,
        });
        return;
      }

      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.file);

      this.http.post(`http://192.168.43.169:8080/folders/${this.selectedFolderId}/files`, formData, { observe: 'response' })
        .subscribe({
          next: (response) => {
            this.isUploading = false;
            if (response.status === 201) {
              this.snackBar.open('File uploaded successfully', 'Close', {
                duration: 3000,
              });
            } else {
              this.snackBar.open(`Failed to upload file: ${response.status}`, 'Close', {
                duration: 3000,
              });
            }
          },
          error: (error) => {
            this.isUploading = false;
            this.snackBar.open(`An error occurred: ${error.message}`, 'Close', {
              duration: 3000,
            });
          }
        });
    } else {
      this.snackBar.open('Please select a folder and file', 'Close', {
        duration: 3000,
      });
    }
  }
}
