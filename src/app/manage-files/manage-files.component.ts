import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { FileService } from '../file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FilePreviewComponent } from '../file-preview/file-preview.component';

@Component({
  selector: 'app-manage-files',
  templateUrl: './manage-files.component.html',
  styleUrls: ['./manage-files.component.css']
})
export class ManageFilesComponent {
  files: { id: string, name: string }[] = [];
  filteredFiles: { id: string, name: string }[] = [];
  searchTerm: string = '';

  constructor(
    private fileService: FileService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router // Inject Router
  ) {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.getFiles().subscribe(
      (files: any) => {
        this.files = files;
        this.filteredFiles = files;
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

  openPreview(fileId: string, fileName: string): void {
    this.dialog.open(FilePreviewComponent, {
      data: { fileId, fileName }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.filteredFiles = this.files.filter(file =>
      file.name.toLowerCase().includes(this.searchTerm)
    );
  }

  goToFolder(folderId: string): void {
    this.router.navigate(['/folder', folderId]); // Navigate to folder view
  }
}
