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

  @ViewChild('graficaMovimientosFinancieros') protected chartMovimientosFinancieros: ElementRef;
  protected graficaMovimientosFinancieros: Chart<'bar'>;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.crearEstadoFinanciero();
    this.crearMovimientosFinancieros();
  }

  crearEstadoFinanciero(){
    if(this.chartEstadoFinanciero && this.chartEstadoFinanciero.nativeElement){
      this.graficaEstadoFinanciero = new Chart(this.chartEstadoFinanciero.nativeElement,
        {
          type: 'pie',
          data: {
            labels:[],
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

  crearMovimientosFinancieros(){
    if(this.chartMovimientosFinancieros && this.chartMovimientosFinancieros.nativeElement){
      this.graficaMovimientosFinancieros = new Chart (this.chartMovimientosFinancieros.nativeElement,
        {
          type: 'bar',
          data: {
            labels: ['Marzo', 'Abril', 'Mayo'],
            datasets: [
              {
                label: 'Ingresos',
                data: [25000, 21000, 19000],
                backgroundColor: 'rgb(255, 99, 132)'
              },
              {
                label: 'Gastos Fijos',
                data: [9500, 9500, 9500],
                backgroundColor: 'rgb(54, 162, 235)'
              },
              {
                label: 'Gastos Variables',
                data: [3000, 2700, 4000],
                backgroundColor: 'rgb(255, 205, 86)'
              }
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      )
    }
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
