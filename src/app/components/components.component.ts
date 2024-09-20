import { Component } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Laptop } from '../model/laptop.model';
import { Student } from '../model/Student.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {
  students?: Student[] = [];

  newStudent: Student = {name : '', mark: 0};
  
  laptop?: Laptop[];
  
  isSelectStudentId: boolean = false;
  
  constructor(private service: ServicesService) { }
  
  ngOnInit() {
    this.getStudents();
    this.getLaptops();
  }
  getLaptops() {
    this.service.getLaptop().subscribe({
      next: (data: any) => {
        this.laptop = data;
        
      }
    })
  }
  
  getStudents(): void {
    this.service.getStudent().subscribe({
      next: (data: any) => {
        this.students = data;
        console.log(data);
      }
    })
  }
  deleteStudent(rollno: number | undefined) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.service.deleteStudent(rollno).subscribe(() => {
        this.students = this.students?.filter(stu => stu.rollno !== rollno);
        alert("Student deleted successfully!");
        this.getLaptops();
      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }
    
  }
  selectStudentId: number | undefined ;
  // laptopModel: boolean = false;
  
  
  viewLaptop(rollno: number | undefined) {
    this.selectStudentId=rollno;
    this.isSelectStudentId = true;
  }
  closeModalFromParent() {
    this.isSelectStudentId = false;
  }

  submitStudent(Student:any) {
    this.service.postStudent(Student)
      .subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          alert('Student added successfully!');
          this.getStudents();
          this.resetForm();

        },
        error: (error) => {
          console.error('There was an error!', error);
          alert('Error adding student!');
        }
      });
  }
  resetForm() {
    this.newStudent = {
      name: '',
      mark: 0,
      // Clear laptop fields and initialize with one empty laptop field
    };
  }

}
