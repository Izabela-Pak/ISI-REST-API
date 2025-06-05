import { Component, ElementRef, ViewChild  } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { DaneOut } from '../service/dane-out';
import { FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modify',
  imports: [ FormsModule, NgFor],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss'
})

export class ModifyComponent {
    @ViewChild('myButton') button!: ElementRef<HTMLButtonElement>;
   constructor(
    public serviceService: ServiceService,
  ) {}

  //Animowany przycisk
  ngAfterViewInit() {
    const btn = this.button.nativeElement;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.add('bubbleanimation');
      setTimeout(() => {
        btn.classList.remove('bubbleanimation');
      }, 1000);
    });
  }

  download: any[] = [];

  dane: DaneOut = {
    nazwa: ""
  }

  dodaj(){
    console.log(this.dane.nazwa + 'Sprawdzam')
    this.serviceService.create(this.dane).subscribe((res:any)=>{
      console.log("Wpis dodany")
      this.pobranieWpisow();
      this.dane.nazwa='';
    })
  }

  ngOnInit() {
   this.pobranieWpisow()
  }

  pobranieWpisow(){
     this.serviceService.findAll().subscribe(data => {
      this.download = data;
    });
  }

  usun(id: number) {
  this.serviceService.delete(id).subscribe(() => {
    console.log("Wpis usunięty");
    this.pobranieWpisow();
  });
}

modifikuj(item: any) {
  // Możesz dodać prompt albo otworzyć modal do edycji
  const nowaNazwa = prompt("Podaj nową nazwę:", item.nazwa);
  if (nowaNazwa !== null && nowaNazwa.trim() !== "") {
    this.serviceService.update(item.id, { nazwa: nowaNazwa }).subscribe(() => {
      console.log("Wpis zmodyfikowany");
      this.pobranieWpisow();
    });
  }
}

}

