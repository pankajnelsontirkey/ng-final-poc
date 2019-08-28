import { Pipe, PipeTransform } from "@angular/core";
import { EmployeeModel } from "src/app/shared/models";

@Pipe({
  name: "textFilter"
})
export class TextFilterPipe implements PipeTransform {
  transform(value: EmployeeModel[], searchString: string): any {
    const resultArray: EmployeeModel[] = [];

    if (value.length === 0) {
      return;
    }
    if (!searchString) {
      return value;
    }
    for (let employee of value) {
      if (
        employee.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchString.toLowerCase()) ||
        employee.employeeCode.toLowerCase().includes(searchString.toLowerCase())
      ) {
        resultArray.push(employee);
      }
    }
    return resultArray;
  }
}
