
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../ctwo/employee.service';
import { IEmployee } from '../IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  editButtonClick(employeeId: number) {
    this._router.navigate(['/edit', employeeId]);
  }

  ngOnInit() {
    // CALLING GET API FROM SERVICE
    this._employeeService.getEmployees().subscribe(
      (employeeList) => this.employees = employeeList,
      (err) => console.log(err)
    );
  }
}