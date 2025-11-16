import React, { useState, useCallback } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '@/components/primitives/Button';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { getMonthName, getYear } from '@/utils/date.utils';
import '../../components/Calendar/calendar-theme.css';
import { useEffect } from 'react';

export const CalendarView: React.FC<CalendarViewProps> = ({
  theme = 'pastel',
  events: initialEvents,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate,
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    goNext,
    goPrevious,
    goToToday,
    toggleView,
    setSelectedDate,
  } = useCalendar(initialDate, initialView);

  const { events, addEvent, updateEvent, deleteEvent, selectedEvent, selectEvent, clearSelection } =
    useEventManager({
      initialEvents,
      onEventAdd,
      onEventUpdate,
      onEventDelete,
    });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    initialDate?: Date;
  }>({
    isOpen: false,
    mode: 'create',
  });

  const handleDateClick = useCallback(
    (date: Date, time?: { hours: number; minutes: number }) => {
      const clickedDate = new Date(date);
      if (time) {
        clickedDate.setHours(time.hours, time.minutes, 0, 0);
      }
      
      setSelectedDate(date);
      setModalState({
        isOpen: true,
        mode: 'create',
        initialDate: clickedDate,
      });
    },
    [setSelectedDate]
  );

  const handleEventClick = useCallback(
    (event: CalendarEvent) => {
      selectEvent(event);
      setModalState({
        isOpen: true,
        mode: 'edit',
      });
    },
    [selectEvent]
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, mode: 'create' });
    clearSelection();
  }, [clearSelection]);

  const handleEventSave = useCallback(
    (event: CalendarEvent) => {
      if (modalState.mode === 'edit' && selectedEvent) {
        updateEvent(event.id, event);
      } else {
        addEvent(event);
      }
    },
    [modalState.mode, selectedEvent, addEvent, updateEvent]
  );

  const handleEventDelete = useCallback(
    (id: string) => {
      deleteEvent(id);
    },
    [deleteEvent]
  );

 
  // keyboard navigation (left/right to move months, enter to select)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        if (typeof goPrevious === 'function') goPrevious();
      } else if (e.key === 'ArrowRight') {
        if (typeof goNext === 'function') goNext();
      } else if (e.key === 'Enter') {
        const active = document.activeElement as HTMLElement | null;
        if (active && active.getAttribute('data-calendar-date')) {
          active.click();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrevious]);
 return (
    <div className={`calendar theme-${theme} w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-100`}>
      <div className="p-4 sm:p-6 w-full">
        {/* Calendar Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl shadow-xl p-6 border border-blue-100 transform-3d animate-slide-down">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text animate-float">
            {getMonthName(currentDate)} {getYear(currentDate)}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goPrevious}
              aria-label="Previous month"
              className="hover:bg-blue-100 hover:scale-110 transition-all duration-300 hover:rotate-12"
            >
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goNext}
              aria-label="Next month"
              className="hover:bg-blue-100 hover:scale-110 transition-all duration-300 hover:-rotate-12"
            >
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={goToToday}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Today
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleView}
            aria-label={`Switch to ${view === 'month' ? 'week' : 'month'} view`}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {view === 'month' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75v-.01ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75v-.01ZM9.25 12a.75.75" />
                <path fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm3.75-1.5a.75.75 0 0 0-1.5 0v.75c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-1.5 0v.01h-12V3.5ZM5 7.5a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H5Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm3.75-1.5a.75.75 0 0 0-1.5 0v.75c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-1.5 0v.01h-12V3.5ZM5 7.5a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H5Z" clipRule="evenodd" />
              </svg>
            )}
            {view === 'month' ? 'Week View' : 'Month View'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              setModalState({
                isOpen: true,
                mode: 'create',
                initialDate: new Date(),
              })
            }
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-glow"
          >
            ✨ Add Event
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'month' ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}

      {/* Event Modal */}
      <EventModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        event={selectedEvent ?? undefined}
        initialDate={modalState.initialDate}
        onClose={handleModalClose}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
      </div>
    </div>
  );
};
