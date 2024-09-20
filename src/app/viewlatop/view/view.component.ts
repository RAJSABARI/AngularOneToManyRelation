import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ServicesService } from '../../service/services.service';
import { Laptop } from '../../model/laptop.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input()rol: number | undefined;
  @Input() isSelectStudentId: boolean = true;
  @Output() closeEvent = new EventEmitter<void>();
  laptops?: Laptop[] = [];
  constructor(private service: ServicesService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rol'] && this.rol !== undefined) {
      this.loadlaptop();
    }
  }
  loadlaptop(){
    this.service.loadLaptop(this.rol).subscribe({
      next:(data:any)=>{
        this.laptops=data;
        console.log(data);
      }
    })
  }
  closeModal() {
    //this.isSelectStudentId = false;
    this.closeEvent.emit(); 
  }

}
