import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../ctwo/employee.service';
import { IEmployee } from '../IEmployee';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ISkill } from '../ISkill';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];

  constructor( private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  editButtonClick(employeeId: number) {
    this.router.navigate(['/edit', employeeId]);
  }
  deleteButtonClick(employeeid: number)
  {
    this.employeeService.deleteEmployee(employeeid).subscribe(
      () => this.router.navigate(['lisklk']),
      (err: any) => console.log(err)
    );
  }
  ngOnInit() {
    // CALLING GET API FROM SERVICE
    this.employeeService.getEmployees().subscribe(
      (employeeList) => this.employees = employeeList,
      (err) => console.log(err)
    );
  }
}