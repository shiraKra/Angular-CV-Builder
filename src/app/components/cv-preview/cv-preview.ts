import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-preview.html',
  styleUrls: ['./cv-preview.css']
})
export class CvPreviewComponent implements OnInit {
  public personalData: any = null;
  public educationList: any[] = [];

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.personalData$.subscribe(data => {
      if (data) {
        this.personalData = data;
      }
    });

    this.cvService.educationData$.subscribe(data => {
      if (data) {
        this.educationList = Array.isArray(data) ? data : [data];
      }
    });
  }
}