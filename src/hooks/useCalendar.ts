import { useState, useCallback } from 'react';
import { CalendarView } from '@/components/Calendar/CalendarView.types';
import { goToNextMonth, goToPreviousMonth } from '@/utils/date.utils';

interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  selectedDate: Date | null;
}

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: CalendarView = 'month'
) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
  });

  const setCurrentDate = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      currentDate: date,
    }));
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: goToNextMonth(prev.currentDate),
    }));
  }, []);

  const goPrevious = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: goToPreviousMonth(prev.currentDate),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const setView = useCallback((view: CalendarView) => {
    setState((prev) => ({
      ...prev,
      view,
    }));
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  const toggleView = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: prev.view === 'month' ? 'week' : 'month',
    }));
  }, []);

  return {
    currentDate: state.currentDate,
    view: state.view,
    selectedDate: state.selectedDate,
    setCurrentDate,
    goNext,
    goPrevious,
    goToToday,
    setView,
    setSelectedDate,
    toggleView,
  };
};
