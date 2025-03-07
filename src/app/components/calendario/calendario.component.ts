import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {

  currentDate = new Date();
  currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
  currentYear = this.currentDate.getFullYear();
  weeks: { days: (number | null)[]; hours: string }[] = []; // Matriz de semanas con días y horas
  selectedDay: number | null = null;
  entryTime: string = '';
  exitTime: string = '';
  records: { day: number; month: number; year: number; hours: string }[] = [];
  totalMonthlyHours: string = '0:00'; // Resumen mensual

  ngOnInit(): void {
    this.generateCalendar();
    this.loadRecords();
    this.calculateWeeklyHours();
    this.calculateMonthlyHours();
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Obtener el día de la semana en que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Ajustar para que comience en lunes
    const totalDays = lastDay.getDate();

    this.weeks = [];
    let week: { days: (number | null)[]; hours: string } = { days: [], hours: '0:00' };

    // Rellenar los días vacíos al inicio del mes
    for (let i = 0; i < startDay; i++) {
      week.days.push(null);
    }

    // Rellenar los días del mes
    for (let day = 1; day <= totalDays; day++) {
      week.days.push(day);
      if (week.days.length === 7) {
        this.weeks.push(week);
        week = { days: [], hours: '0:00' };
      }
    }

    // Rellenar los días vacíos al final del mes
    if (week.days.length > 0) {
      while (week.days.length < 7) {
        week.days.push(null);
      }
      this.weeks.push(week);
    }

    this.calculateWeeklyHours();
    this.calculateMonthlyHours();
  }

  openModal(day: number): void {
    this.selectedDay = day;
    const record = this.getRecordForDay(day);
    if (record) {
      this.entryTime = record.hours.split(':')[0] + ':' + record.hours.split(':')[1];
      this.exitTime = '';
    } else {
      this.entryTime = '';
      this.exitTime = '';
    }
  }

  closeModal(): void {
    this.selectedDay = null;
    this.entryTime = '';
    this.exitTime = '';
  }

  saveHours(): void {
    if (this.entryTime && this.exitTime && this.selectedDay) {
      const entry = new Date(`1970-01-01T${this.entryTime}`);
      const exit = new Date(`1970-01-01T${this.exitTime}`);
      const differenceMs = exit.getTime() - entry.getTime();

      // Convertir la diferencia a horas y minutos
      const hours = Math.floor(differenceMs / (1000 * 60 * 60));
      const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));

      // Guardar las horas en formato HH:MM
      const formattedHours = `${hours}:${minutes.toString().padStart(2, '0')}`;

      const recordIndex = this.records.findIndex(
        (r) =>
          r.day === this.selectedDay &&
          r.month === this.currentDate.getMonth() &&
          r.year === this.currentDate.getFullYear()
      );

      if (recordIndex !== -1) {
        // Actualizar el registro existente
        this.records[recordIndex].hours = formattedHours;
      } else {
        // Crear un nuevo registro
        this.records.push({
          day: this.selectedDay!,
          month: this.currentDate.getMonth(),
          year: this.currentDate.getFullYear(),
          hours: formattedHours,
        });
      }

      this.saveRecords();
      this.calculateWeeklyHours();
      this.calculateMonthlyHours();
      this.closeModal();
    }
  }

  deleteHours(): void {
    if (this.selectedDay !== null) {
      if (confirm('¿Estás seguro de que quieres borrar las horas de este día?')) {
        this.records = this.records.filter(
          (r) =>
            !(
              r.day === this.selectedDay &&
              r.month === this.currentDate.getMonth() &&
              r.year === this.currentDate.getFullYear()
            )
        );
        this.saveRecords();
        this.calculateWeeklyHours();
        this.calculateMonthlyHours();
        this.closeModal();
      }
    }
  }

  getRecordForDay(day: number): { day: number; month: number; year: number; hours: string } | undefined {
    return this.records.find(
      (r) =>
        r.day === day &&
        r.month === this.currentDate.getMonth() &&
        r.year === this.currentDate.getFullYear()
    );
  }

  getHours(day: number): string | null {
    const record = this.getRecordForDay(day);
    return record ? record.hours : null;
  }

  calculateWeeklyHours(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.weeks.forEach((week) => {
      let totalMinutes = 0;

      week.days.forEach((day) => {
        if (day !== null) {
          const record = this.getRecordForDay(day);
          if (record && typeof record.hours === 'string') {
            const [hours, minutes] = record.hours.split(':').map(Number);
            totalMinutes += hours * 60 + minutes;
          }
        }
      });

      // Convertir el total de minutos a horas y minutos
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      week.hours = `${hours}:${minutes.toString().padStart(2, '0')}`;
    });
  }

  calculateMonthlyHours(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    let totalMinutes = 0;

    this.records.forEach((record) => {
      if (record.month === month && record.year === year && typeof record.hours === 'string') {
        const [hours, minutes] = record.hours.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
      }
    });

    // Convertir el total de minutos a horas y minutos
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this.totalMonthlyHours = `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  saveRecords(): void {
    localStorage.setItem('workRecords', JSON.stringify(this.records));
  }

  loadRecords(): void {
    const records = localStorage.getItem('workRecords');
    if (records) {
      this.records = JSON.parse(records).map((record: any) => {
        // Asegurar que record.hours sea un string en formato HH:MM
        if (typeof record.hours !== 'string') {
          const hours = Math.floor(record.hours);
          const minutes = Math.round((record.hours - hours) * 60);
          record.hours = `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
        return record;
      });
    } else {
      this.records = [];
    }
  }
  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }
}