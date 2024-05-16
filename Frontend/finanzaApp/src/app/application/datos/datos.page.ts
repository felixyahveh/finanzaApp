import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartType} from 'chart.js/auto';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage {
  @ViewChild('graficaEstadoFinanciero') protected chartEstadoFinanciero: ElementRef;
  protected graficaEstadoFinanciero: Chart<'pie'>;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.crearEstadoFinanciero()
  }

  crearEstadoFinanciero(){
    if(this.chartEstadoFinanciero && this.chartEstadoFinanciero.nativeElement){
      this.graficaEstadoFinanciero = new Chart(this.chartEstadoFinanciero.nativeElement,
        {
          type: 'pie',
          data: {
            labels:['Ingresos', 'Gastos Fijos', 'Gastos Variables'],
            datasets: [
              {
                label: 'Porcentaje final',
                data: [64,22,34],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
              }
            ],
          },
        } 
      );
    }
    
    /* let htmlRef = this.elementRef.nativeElement.querySelector(`#estadoFinanciero`);
    htmlRef = new Chart(htmlRef,{
      type: 'pie',
      data: {
        labels:['Ingresos', 'Gastos Fijos', 'Gastos Variables'],
        datasets: [{
          label: 'Porcentaje final',
          data: [50,20,30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    }) */
  }


  /* estadoFinanciero = new Chart('estadoFinanciero', 
    {
      type: 'pie',
      data: {
        labels:['Ingresos', 'Gastos Fijos', 'Gastos Variables'],
        datasets: [{
          label: 'Porcentaje final',
          data: [50,20,30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    }
  ) */

}
