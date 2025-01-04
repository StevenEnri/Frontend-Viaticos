import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViaticoFormComponent } from './components/viatico-form/viatico-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ViaticoFormComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración de las rutas principales
  exports: [RouterModule] // Exporta el RouterModule para que sea utilizado por otros módulos
})
export class AppRoutingModule { }
