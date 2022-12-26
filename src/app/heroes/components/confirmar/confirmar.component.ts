import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: []
})
export class ConfirmarComponent implements OnInit{



  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Heroe ){}

  ngOnInit():void{
    
  }


  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){   
    this.dialogRef.close();
  } 


}
