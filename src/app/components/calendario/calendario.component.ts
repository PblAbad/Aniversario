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

  ngOnInit(): void {
    this.generateCalendar();
    this.loadRecords();
    this.calculateWeeklyHours();
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
    let week: { days: (number | null)[]; hours: string } = { days: [], hours: '0 horas y 0 minutos' };

    // Rellenar los días vacíos al inicio del mes
    for (let i = 0; i < startDay; i++) {
      week.days.push(null);
    }

    // Rellenar los días del mes
    for (let day = 1; day <= totalDays; day++) {
      week.days.push(day);
      if (week.days.length === 7) {
        this.weeks.push(week);
        week = { days: [], hours: '0 horas y 0 minutos' };
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
  }

  openModal(day: number): void {
    this.selectedDay = day;
  }

  closeModal(): void {
    this.selectedDay = null;
  }

  calculateHoursAndMinutes(entryTime: string, exitTime: string): string {
    const entry = new Date(`1970-01-01T${entryTime}`);
    const exit = new Date(`1970-01-01T${exitTime}`);
    const diff = exit.getTime() - entry.getTime(); // Diferencia en milisegundos

    const totalMinutes = Math.floor(diff / (1000 * 60)); // Convertir a minutos
    const hours = Math.floor(totalMinutes / 60); // Obtener las horas
    const minutes = totalMinutes % 60; // Obtener los minutos restantes

    return `${hours} horas y ${minutes} minutos`;
  }

  saveHours(): void {
    if (this.entryTime && this.exitTime && this.selectedDay) {
      const hoursWorked = this.calculateHoursAndMinutes(this.entryTime, this.exitTime);

      this.records.push({
        day: this.selectedDay,
        month: this.currentDate.getMonth(),
        year: this.currentDate.getFullYear(),
        hours: hoursWorked,
      });
      this.saveRecords();
      this.calculateWeeklyHours();
      this.closeModal();
    }
  }

  getHours(day: number): string | null {
    const record = this.records.find(
      (r) =>
        r.day === day &&
        r.month === this.currentDate.getMonth() &&
        r.year === this.currentDate.getFullYear()
    );
    return record ? record.hours : null;
  }

  calculateWeeklyHours(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.weeks.forEach((week) => {
      let totalMinutes = 0;

      week.days.forEach((day) => {
        if (day !== null) {
          const record = this.records.find(
            (r) => r.day === day && r.month === month && r.year === year
          );
          if (record) {
            const [hours, minutes] = record.hours
              .split('horas y')
              .map((part) => parseInt(part.trim(), 10));
            totalMinutes += hours * 60 + minutes;
          }
        }
      });

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      week.hours = `${hours} horas y ${minutes} minutos`;
    });
  }

  saveRecords(): void {
    localStorage.setItem('workRecords', JSON.stringify(this.records));
  }

  loadRecords(): void {
    const records = localStorage.getItem('workRecords');
    this.records = records ? JSON.parse(records) : [];
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

