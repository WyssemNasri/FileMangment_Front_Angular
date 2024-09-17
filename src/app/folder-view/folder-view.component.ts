import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-folder-view',
  templateUrl:'./folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {
  files: { id: string, name: string }[] = [];
  folderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.folderId = this.route.snapshot.paramMap.get('id');
    if (this.folderId) {
      this.loadFolderFiles(this.folderId);
    }
  }

  loadFolderFiles(folderId: string): void {
    this.fileService.getFilesInFolder(folderId).subscribe(
      (files: any) => {
        this.files = files;
      },
      (error: any) => {
        this.snackBar.open('Failed to load folder files', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
