import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  

  students: Student[] = [];
  formGroupStudent : FormGroup;

  constructor(private service: StudentService,
              private formBuilder: FormBuilder
  ){
      this.formGroupStudent = formBuilder.group({
           id : [''],
           name : [''],
           course: ['']
      });

  }

  ngOnInit(): void {
     this.service.getStudents().subscribe({
        next: json => this.students = json
     });
  }

  save() {
      this.service.saveStudent(this.formGroupStudent.value).subscribe(
        {
           next: json => {
             this.students.push(json);
             this.formGroupStudent.reset();
           }
        }
      )
  }
  

}
