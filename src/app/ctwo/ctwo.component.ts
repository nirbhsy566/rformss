import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../ISkill';

@Component({
  selector: 'app-ctwo',
  templateUrl: './ctwo.component.html',
  styleUrls: ['./ctwo.component.css']
})
export class CtwoComponent implements OnInit {
  employeeForm: FormGroup;
  employee: IEmployee;
  // json-server --watch db.json
  // COUNSTRUCTOR
  // ng build --prod
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {
  }
  // ON INIT MODULE START
  ngOnInit() {
    // VALIDATON FORM GROUP
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup() // DYNAMIC INTERFACE FUNCTION line 142
      ])
    });
    // ROUT PARAM PASSING
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId); // line  93
      } else {
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    });

    // CROSS VALIDATION
    function matchEmails(group: AbstractControl): { [key: string]: any } | null {
      const emailControl = group.get('email');
      const confirmEmailControl = group.get('confirmEmail');
      if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine && confirmEmailControl.value === '') {
        return null;
      } else {
        return { 'emailMismatch': true };
      }
    }
    // RADIO BUTTON OBSERVABLE SUBSCRIPTION
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
        this.onContactPrefernceChange(data);           // FUNCTION CALLING    line 99
      });
    // VALIDATION OBSERVABLE SUBSCRIPTION
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);    // FUNCTION CALLING    line 78
    });

  }
  // ON INIT MODULE ENDS

// THIS IS MAIN LOG VALIDATION  VALIDATION OBSERVABLE
logValidationErrors(group: FormGroup = this.employeeForm): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.get(key);
    this.formErrors[key] = '';
    if (abstractControl && !abstractControl.valid &&
      (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
      const messages = this.validationMessages[key];

      for (const errorKey in abstractControl.errors) {
        if (errorKey) {
          this.formErrors[key] += messages[errorKey] + ' ';
        }
      }
    }
    if (abstractControl instanceof FormGroup) {
      this.logValidationErrors(abstractControl);
    }
  });
}

  // CONTACT PREFERENCE DETAIL  RADIO BUTTON OBSERVABLE
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  // LOAD TIME
  // EDIT FORM DATA
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));  //CALLING DYNAMIC FORM TYPE ARRAY LOAD TIME
  }
  // DYNAMIC FORM FOR API LOADING TIME
  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
    return formArray;
  }

  // DYNAMIC FORM TYPE WHILE ADDING DATA
  // DYNAMIC GENERATION 
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }
 // ADDING FORM GROUP
  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }
  //REMOVING FORM GROUP
  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  //  CALLING API NEEDEDDDDDDDDDD
  //  CALLING GET API SERVICE APIiiiiiiiiiiiiiiiiiiiiiiiii
  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => {
          this.employee = employee;
          this.editEmployee(employee); // LINE 78
        },
        (err: any) => console.log(err)
      );
  }
  // UPDATE BUTTON FUNCTION SERVICE API iiiiiiiiiiiiiiiiiiiiiiiiii
  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['edit']),
        (err: any) => console.log(err)
      );
    }
  }
  // ADD BUTTON FUNCTION SERVICE API iiiiiiiiiiiiiiiiiiiiiiiiiii
  onadd(): void {
    this.mapFormValuesToEmployeeModel();
    this.employeeService.addEmployee(this.employee).subscribe(
      () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );
  }
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }
  // ENDDDDDDDDDDDDDD APIIIIIIIIIII
  // END

  // VALIDATION MESSAGES
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be dell.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
  };
  formErrors = {
  };
}