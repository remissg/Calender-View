import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  format,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
  addMonths,
  subMonths,
} from 'date-fns';

/**
 * Calculates the number of days between two dates
 * @param start - Start date
 * @param end - End date
 * @returns Number of days (can be negative if end is before start)
 */
export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startMs = startOfDay(start).getTime();
  const endMs = startOfDay(end).getTime();
  return Math.floor((endMs - startMs) / msPerDay);
};

/**
 * Checks if two dates fall on the same day (ignores time)
 */
export const isSameDayUtil = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Gets all days in a month
 */
export const getDaysInMonth = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days: Date[] = [];
  
  let currentDate = start;
  while (isBefore(currentDate, end) || isSameDay(currentDate, end)) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return days;
};

/**
 * Gets the calendar grid (42 cells for month view)
 * Includes days from previous and next month to fill the grid
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // 0 = Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  const grid: Date[] = [];
  let currentDate = calendarStart;
  
  while (isBefore(currentDate, calendarEnd) || isSameDay(currentDate, calendarEnd)) {
    grid.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  // Ensure we always have 42 cells (6 weeks)
  while (grid.length < 42) {
    grid.push(addDays(grid[grid.length - 1]!, 1));
  }
  
  return grid;
};

/**
 * Gets the week dates for week view
 */
export const getWeekDates = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const dates: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(weekStart, i));
  }
  
  return dates;
};

/**
 * Formats a date to display format
 */
export const formatDate = (date: Date, formatString: string = 'MMM d, yyyy'): string => {
  return format(date, formatString);
};

/**
 * Formats time for display
 */
export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

/**
 * Formats time in 24-hour format for input fields
 */
export const formatTimeInput = (date: Date): string => {
  return format(date, 'HH:mm');
};

/**
 * Parses a time string (HH:mm) and combines with a date
 */
export const parseTime = (dateStr: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const newDate = new Date(dateStr);
  newDate.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return newDate;
};

/**
 * Checks if a date is in the current month
 */
export const isCurrentMonth = (date: Date, referenceDate: Date): boolean => {
  return isSameMonth(date, referenceDate);
};

/**
 * Gets the month name
 */
export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM');
};

/**
 * Gets the year
 */
export const getYear = (date: Date): number => {
  return date.getFullYear();
};

/**
 * Gets the day of week name
 */
export const getDayName = (date: Date, formatStr: string = 'EEE'): string => {
  return format(date, formatStr);
};

/**
 * Navigates to next month
 */
export const goToNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

/**
 * Navigates to previous month
 */
export const goToPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

/**
 * Checks if date1 is after date2
 */
export const isAfterDate = (date1: Date, date2: Date): boolean => {
  return isAfter(date1, date2);
};

/**
 * Checks if date1 is before date2
 */
export const isBeforeDate = (date1: Date, date2: Date): boolean => {
  return isBefore(date1, date2);
};

/**
 * Gets time slots for week view (24 hours)
 */
export const getTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

/**
 * Calculates the position and height for an event in week view
 */
export const calculateEventPosition = (
  startDate: Date,
  endDate: Date
): { top: number; height: number } => {
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();
  
  const startPosition = (startHour + startMinute / 60) * 60; // 60px per hour
  const duration = (endHour - startHour) + (endMinute - startMinute) / 60;
  const height = duration * 60;
  
  return {
    top: startPosition,
    height: Math.max(height, 30), // Minimum height of 30px
  };
};

/**
 * Gets start of day
 */
export const getStartOfDay = (date: Date): Date => {
  return startOfDay(date);
};

/**
 * Gets end of day
 */
export const getEndOfDay = (date: Date): Date => {
  return endOfDay(date);
};
