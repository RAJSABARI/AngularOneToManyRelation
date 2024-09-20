import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/Student.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }

  getStudent(){
    return this.http.get(`${this.apiUrl}/getAllStudents`)
  }
  getLaptop(){
    return this.http.get(`${this.apiUrl}/getAllLaptops`)
  }

  deleteStudent(id:any){
    return this.http.delete(`${this.apiUrl}/deleteByStudentId/`+id)
  }

  postStudent(students:Student){
    return this.http.post(`${this.apiUrl}/post`,students)
  }
  loadLaptop(id?:number){
    return this.http.get(`${this.apiUrl}/sId/${id}`)
  }
 
 
}
