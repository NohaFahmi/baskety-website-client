import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  topItemsData: any;
  topCategoriesData: any;
  monthlySummaryData: any;
  barOptions: any;
  lineOptions: any;

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color-green');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--mint-green-bg');
    this.topItemsData = {
      labels: ['Banana', 'Rice', 'Chicken 1kg'],
      datasets: [
        {
          barThickness: 25,
          label: 'Top Items',
          backgroundColor: documentStyle.getPropertyValue('--soft-accent-color'),
          borderColor: documentStyle.getPropertyValue('--soft-accent-color'),
          data: [65, 59, 80],
        },
      ]
    };
    this.topCategoriesData = {
      labels: ['Banana', 'Rice', 'Chicken 1kg'],
      datasets: [
        {
          barThickness: 25,
          label: 'Top Items',
          backgroundColor: documentStyle.getPropertyValue('--highlight-color'),
          borderColor: documentStyle.getPropertyValue('--highlight-color'),
          data: [65, 59, 80],
        },
      ]
    };
    this.barOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.monthlySummaryData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Items count',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--subtle-color'),
          tension: 0.4
        }
      ]
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
