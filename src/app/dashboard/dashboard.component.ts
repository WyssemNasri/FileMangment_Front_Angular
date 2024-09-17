import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../file.service';
import { FilePreviewComponent } from '../file-preview/file-preview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: { id: string, name: string }[] = [];

  constructor(
    private fileService: FileService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.getFiles().subscribe(
      (files: any) => {
        this.files = files;
      },
      (error: any) => {
        this.snackBar.open('Failed to load files', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileService.uploadFile(file).subscribe(
        () => {
          this.snackBar.open('File uploaded successfully', 'Close', {
            duration: 3000,
          });
          this.loadFiles();
        },
        (error: any) => {
          this.snackBar.open('Failed to upload file', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  deleteFile(fileId: string): void {
    this.fileService.deleteFile(fileId).subscribe(
      () => {
        this.snackBar.open('File deleted successfully', 'Close', {
          duration: 3000,
        });
        this.loadFiles();
      },
      (error: any) => {
        this.snackBar.open('Failed to delete file', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  previewFile(fileId: string, fileName: string): void {
    this.dialog.open(FilePreviewComponent, {
      data: { fileId, fileName }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
