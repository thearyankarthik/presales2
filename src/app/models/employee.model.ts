export interface Employee {
  emp_id: number;

  emp_first_name: string;
  emp_middle_name?: string;
  emp_last_name: string;

  role_id: number;
  emp_status: string;

  created_on: string;
  created_by: string;

  modified_on?: string;
  modified_by?: string;
}
