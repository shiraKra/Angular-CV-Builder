import { Routes } from '@angular/router';
import { PersonalDetailsComponent } from './components/personal-details/personal-details';
import { EducationDetailsComponent } from './components/education-details/education-details';
import { CvPreviewComponent } from './components/cv-preview/cv-preview';

export const routes: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  { path: 'personal', component: PersonalDetailsComponent },
  { path: 'education', component: EducationDetailsComponent },
  { path: 'preview', component: CvPreviewComponent }
];