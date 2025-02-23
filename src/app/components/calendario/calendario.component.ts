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
  weeks: { days: (number | null)[]; hours: number }[] = []; // Matriz de semanas con días y horas
  selectedDay: number | null = null;
  entryTime: string = '';
  exitTime: string = '';
  records: { day: number; month: number; year: number; hours: number }[] = [];

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
    let week: { days: (number | null)[]; hours: number } = { days: [], hours: 0 };

    // Rellenar los días vacíos al inicio del mes
    for (let i = 0; i < startDay; i++) {
      week.days.push(null);
    }

    // Rellenar los días del mes
    for (let day = 1; day <= totalDays; day++) {
      week.days.push(day);
      if (week.days.length === 7) {
        this.weeks.push(week);
        week = { days: [], hours: 0 };
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

  saveHours(): void {
    if (this.entryTime && this.exitTime && this.selectedDay) {
      const entry = new Date(`1970-01-01T${this.entryTime}`);
      const exit = new Date(`1970-01-01T${this.exitTime}`);
      const hours = (exit.getTime() - entry.getTime()) / (1000 * 60 * 60);

      this.records.push({
        day: this.selectedDay,
        month: this.currentDate.getMonth(),
        year: this.currentDate.getFullYear(),
        hours,
      });
      this.saveRecords();
      this.calculateWeeklyHours();
      this.closeModal();
    }
  }

  getHours(day: number): number | null {
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
      week.hours = week.days.reduce((sum: number, day) => {
        if (day !== null) {
          const record = this.records.find(
            (r) => r.day === day && r.month === month && r.year === year
          );
          return sum + (record ? record.hours : 0);
        }
        return sum;
      }, 0);
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



