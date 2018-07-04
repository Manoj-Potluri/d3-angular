import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarMutliseriesComponent } from './bar-mutliseries/bar-mutliseries.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const appRoutes: Routes = [
  { path: 'line-chart', component: LineChartComponent },
  { path: 'multi-series', component: BarMutliseriesComponent },
  { path: 'pie-chart', component: PieChartComponent },
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
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
