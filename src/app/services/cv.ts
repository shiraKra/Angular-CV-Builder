import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private personalDetailsSubject = new BehaviorSubject<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: ''
  });

  private educationSubject = new BehaviorSubject<any[]>([]);

  public personalData$ = this.personalDetailsSubject.asObservable();
  public educationData$ = this.educationSubject.asObservable();

  constructor() { }

  updatePersonalDetails(details: any) {
    this.personalDetailsSubject.next(details);
  }

  updateEducation(eduList: any[]) {
    this.educationSubject.next(eduList);
  }
}