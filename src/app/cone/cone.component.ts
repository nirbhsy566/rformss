import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-cone',
  templateUrl: './cone.component.html',
  styleUrls: ['./cone.component.css']
})
export class ConeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });

  }
  onSubmit(): void {
    console.log(this.employeeForm);
  }
  onLoadDataclick(): void {
    this.employeeForm.patchValue({
      fullName: 'nirbhay',
      email: 'nirbhay566@gmail.com',
      skills: {
        skillName: 'angular',
        experienceInYears: '4',
        proficiency: 'advanced',
      }
    });
  }
}
