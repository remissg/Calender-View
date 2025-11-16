import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { isSameDayUtil, getStartOfDay, getEndOfDay, isAfterDate, isBeforeDate } from './date.utils';

/**
 * Filters events for a specific date
 */
export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = getStartOfDay(event.startDate);
    const eventEnd = getEndOfDay(event.endDate);
    const targetDate = getStartOfDay(date);
    
    return (
      isSameDayUtil(eventStart, targetDate) ||
      isSameDayUtil(eventEnd, targetDate) ||
      (isBeforeDate(eventStart, targetDate) && isAfterDate(eventEnd, targetDate))
    );
  });
};

/**
 * Sorts events by start date
 */
export const sortEventsByStartDate = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Generates a unique ID for an event
 */
export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validates event data
 */
export const validateEvent = (event: Partial<CalendarEvent>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  if (!event.title || event.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (event.title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }
  
  if (event.description && event.description.length > 500) {
    errors.description = 'Description must be 500 characters or less';
  }
  
  if (!event.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!event.endDate) {
    errors.endDate = 'End date is required';
  }
  
  if (event.startDate && event.endDate && isAfterDate(event.startDate, event.endDate)) {
    errors.endDate = 'End date must be after start date';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Checks if two events overlap
 */
export const eventsOverlap = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
  return (
    (isAfterDate(event1.startDate, event2.startDate) && isBeforeDate(event1.startDate, event2.endDate)) ||
    (isAfterDate(event2.startDate, event1.startDate) && isBeforeDate(event2.startDate, event1.endDate)) ||
    isSameDayUtil(event1.startDate, event2.startDate)
  );
};

/**
 * Gets the default color for a new event
 */
export const getDefaultEventColor = (): string => {
  return '#3b82f6'; // Blue
};

/**
 * Filters events by search query
 */
export const filterEventsBySearch = (events: CalendarEvent[], query: string): CalendarEvent[] => {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    return events;
  }
  
  return events.filter((event) => {
    return (
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description?.toLowerCase().includes(lowerQuery) ||
      event.category?.toLowerCase().includes(lowerQuery)
    );
  });
};

/**
 * Filters events by category
 */
export const filterEventsByCategory = (events: CalendarEvent[], category: string): CalendarEvent[] => {
  if (!category || category === 'All') {
    return events;
  }
  
  return events.filter((event) => event.category === category);
};

/**
 * Gets event count for a specific date
 */
export const getEventCount = (events: CalendarEvent[], date: Date): number => {
  return getEventsForDate(events, date).length;
};

/**
 * Checks if an event is multi-day
 */
export const isMultiDayEvent = (event: CalendarEvent): boolean => {
  return !isSameDayUtil(event.startDate, event.endDate);
};

/**
 * Calculates event duration in minutes
 */
export const getEventDuration = (event: CalendarEvent): number => {
  return Math.floor((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60));
};

/**
 * Formats event duration for display
 */
export const formatEventDuration = (event: CalendarEvent): string => {
  const minutes = getEventDuration(event);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
};
