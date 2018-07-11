import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarMutliseriesComponent } from './bar-mutliseries/bar-mutliseries.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SortChartComponent } from './sort-chart/sort-chart.component';
import { OlympicDataServiceService } from './olympic-data-service.service';

const appRoutes: Routes = [
  { path: 'line-chart', component: LineChartComponent },
  { path: 'multi-series', component: BarMutliseriesComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'sorting-chart', component: SortChartComponent },
  { path: '',
      redirectTo: '/line-chart',
      pathMatch: 'full'
  },
  { path: '**', component: LineChartComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    BarMutliseriesComponent,
    PieChartComponent,
    SortChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [OlympicDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
