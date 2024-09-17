import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageFilesComponent } from './manage-files/manage-files.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FolderViewComponent } from './folder-view/folder-view.component'; // Import the new component
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage-files', component: ManageFilesComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'folder/:id', component: FolderViewComponent } // Route for folder view
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatProgressSpinnerModule // Import Angular Material Spinner module
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
