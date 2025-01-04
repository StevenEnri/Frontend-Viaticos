import { Component } from '@angular/core';
import { ViaticoService } from '../../services/viatico.service';

@Component({
  selector: 'app-viatico-form',
  templateUrl: './viatico-form.component.html',
  styleUrls: ['./viatico-form.component.css']
})
export class ViaticoFormComponent {

  viatico: any = {
    fechaRegistro: null,
    nombrePersona: '',
    identificacion: '',
    motivoViaje: '',
    clienteProyecto: '',
    tipoViaje: 'nacional',
    fechaInicioViaje: null,
    fechaFinViaje: null,
    fechaInvitacion: null
  };

  aprobacion: any = {
    nombreAprobador: '',
    identificacionAprobador: '',
    emailAprobador: '',
    identificacionBusqueda: ''
  };

  aprobado = false;
  fechaRegistroInvalid = false;
  identificacionInvalid = false;
  fechaInicioViajeInvalid = false;
  fechaFinViajeInvalid = false;
  fechaInvitacionInvalid = false;

  constructor(private viaticoService: ViaticoService) {}

  // Obtener la fecha actual en formato "YYYY-MM-DD"
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];  // Formato "YYYY-MM-DD"
  }

  // Validar la identificación
  validarIdentificacion() {
    this.identificacionInvalid = !/^[0-9]{10}$/.test(this.viatico.identificacion);
  }

  // Validar fechas antes de registrar el viático
  validarFechas() {
    if (this.viatico.fechaRegistro && this.viatico.fechaRegistro < this.getCurrentDate()) {
      this.fechaRegistroInvalid = true;
      return false;
    }
    this.fechaRegistroInvalid = false;

    if (this.viatico.fechaInicioViaje && this.viatico.fechaFinViaje) {
      if (this.viatico.fechaInicioViaje > this.viatico.fechaFinViaje) {
        this.fechaInicioViajeInvalid = true;
        this.fechaFinViajeInvalid = true;
        return false;
      }
      this.fechaInicioViajeInvalid = false;
      this.fechaFinViajeInvalid = false;
    }

    return true;
  }

  // Registrar el viático
  registrarViatico() {
    if (this.viatico.fechaRegistro && this.viatico.nombrePersona && this.viatico.identificacion) {
      if (this.validarFechas()) {
        this.viaticoService.registrarViatico(this.viatico).subscribe(
          (response) => {
            console.log('Viático registrado:', response);
            this.viatico = response;  // Actualiza el viático con los datos guardados
            this.aprobado = true;      // Cambia el estado a "aprobado" para mostrar el formulario de aprobación
            alert('Viático registrado exitosamente');
          },
          (error) => {
            console.error('Error al registrar el viático:', error);
            alert(error.error.message || 'Hubo un error al registrar el viático');
          }
        );
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  // Aprobar el viático
  aprobarViatico() {
    if (this.viatico.id) {
      this.viaticoService.aprobarViatico(this.viatico.id).subscribe(
        (response) => {
          if (response) {
            this.viatico = response;  // Actualiza el objeto viático con los datos aprobados
            alert('Viático aprobado exitosamente');
          }
        },
        (error) => {
          console.error('Error al aprobar el viático:', error);
          alert(error.error.message || 'Hubo un error al aprobar el viático');
        }
      );
    } else {
      console.error('ID de viático no encontrado');
      alert('ID de viático no encontrado');
    }
  }

  // Buscar el viático por identificación
  buscarViatico() {
    if (this.aprobacion.identificacionBusqueda) {
      this.viaticoService.obtenerViaticoPorIdentificacion(this.aprobacion.identificacionBusqueda).subscribe(
        (response) => {
          if (response) {
            this.viatico = response; // Actualiza los datos del viático encontrado
            alert('Viático encontrado y cargado correctamente');
          } else {
            alert('No se encontró un viático con la identificación proporcionada');
          }
        },
        (error) => {
          console.error('Error al buscar el viático:', error);
          alert(error.error.message || 'Hubo un error al buscar el viático');
        }
      );
    } else {
      alert('Por favor ingrese una identificación válida para buscar');
    }
  }

  // Cambiar el tipo de viaje (nacional o internacional)
  cambiarTipoViaje() {
    console.log(`Tipo de viaje seleccionado: ${this.viatico.tipoViaje}`);
  }
}
