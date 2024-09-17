import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent {
  fileUrl: string | undefined;
  isLoading = true;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { fileId: string, fileName: string },
    private fileService: FileService
  ) {
    this.loadFilePreview();
  }

  loadFilePreview(): void {
    this.fileService.downloadFile(this.data.fileId).subscribe(
      blob => {
        this.fileUrl = window.URL.createObjectURL(blob);
        this.isLoading = false;
      },
      error => {
        this.error = 'Failed to load file preview';
        this.isLoading = false;
      }
    );
  }
}
