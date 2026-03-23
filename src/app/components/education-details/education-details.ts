import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CvService } from '../../services/cv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education-details.html',
  styleUrls: ['./education-details.css']
})
export class EducationDetailsComponent implements OnInit {
  public eduForm: FormGroup;

  constructor(private cvService: CvService, private router: Router) {
    this.eduForm = new FormGroup({
      educations: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.addEducation();

    this.eduForm.valueChanges.subscribe(value => {
      if (this.eduForm.valid) {
        this.cvService.updateEducation(value.educations);
      }
    });
  }

  get educationsArray(): FormArray {
    return this.eduForm.get('educations') as FormArray;
  }

  createEducationGroup(): FormGroup {
    const group = new FormGroup({
      school: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      field: new FormControl('', [Validators.required]), // הוספת חובה לפי הדרישות
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      status: new FormControl('finished', [Validators.required]),
      grade: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      isHonors: new FormControl(false),
      description: new FormControl(''), // שדה תיאור קצר
      courses: new FormArray([new FormControl('')])
    }, { validators: this.dateComparisonValidator });

    group.get('status')?.valueChanges.subscribe(status => {
      const endDateControl = group.get('endDate');
      if (status === 'finished') {
        endDateControl?.setValidators([Validators.required]);
      } else {
        endDateControl?.clearValidators();
      }
      endDateControl?.updateValueAndValidity();
    });

    return group;
  }

  dateComparisonValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    const status = group.get('status')?.value;

    if (status === 'finished' && start && end && new Date(end) < new Date(start)) {
      return { dateError: true };
    }
    return null;
  }

  addEducation(): void {
    this.educationsArray.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    if (this.educationsArray.length > 1) {
      this.educationsArray.removeAt(index);
    }
  }

  getCoursesArray(index: number): FormArray {
    return this.educationsArray.at(index).get('courses') as FormArray;
  }

  addCourse(eduIndex: number): void {
    this.getCoursesArray(eduIndex).push(new FormControl(''));
  }

  removeCourse(eduIndex: number, courseIndex: number): void {
    if (this.getCoursesArray(eduIndex).length > 1) {
      this.getCoursesArray(eduIndex).removeAt(courseIndex);
    }
  }

  goToPreview() {
    if (this.eduForm.valid) {
      this.router.navigate(['/preview']);
    } else {
      this.eduForm.markAllAsTouched();
      alert('הטופס אינו תקין. ודאי שמילאת את כל שדות החובה המסומנים.');
    }
  }
}