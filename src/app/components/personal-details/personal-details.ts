import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CvService } from '../../services/cv';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './personal-details.html',
  styleUrls: ['./personal-details.css']
})
export class PersonalDetailsComponent {
  
  public personalInfo = {
    fullName: '',  
    email: '',
    phone: '',
    summary: ''
  };

  constructor(private cvService: CvService, private router: Router) { }

  onInputChange() {
    this.cvService.updatePersonalDetails(this.personalInfo);
  }

  goToEducation() {
    this.router.navigate(['/education']);
  }
}