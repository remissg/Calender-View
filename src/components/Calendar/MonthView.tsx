import React, { useMemo, useRef, useEffect } from 'react';
import { MonthViewProps } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, isSameDayUtil, isCurrentMonth } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick,
}) => {
  const calendarGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const today = useMemo(() => new Date(), []);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    let interactInstance: any = null;
    let cleanup: (() => void) | null = null;
    (async () => {
      try {
        const mod = await import('interactjs');
        interactInstance = (mod && (mod.default || mod));
        if (interactInstance && containerRef.current) {
          const interact = interactInstance;
          const draggables = containerRef.current.querySelectorAll('.event-badge');
          if (draggables.length) {
            cleanup = () => {
              // remove listeners by calling interact to unset
              try { interact(containerRef.current).unset(); } catch (e) { /* ignore */ }
            };
            interact(containerRef.current).on('down', () => {});
            interact('.event-badge').draggable({
              listeners: {
                move (event: any) {
                  const target = event.target;
                  const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
                  const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;
                  target.style.transform = `translate(${x}px, ${y}px)`;
                  target.setAttribute('data-x', x);
                  target.setAttribute('data-y', y);
                },
                end (event: any) {
                  // On drag end we simply log — you can wire this to update event date.
                  const target = event.target;
                  const id = target.getAttribute('data-event-id');
                  console.log('Drag end for event', id);
                }
              }
            });
          }
        }
      } catch (e) {
        // interactjs not installed — ignore
        console.warn('interactjs not available, drag/resize disabled');
      }
    })();
    return () => {
      if (cleanup) cleanup();
    };
  }, [currentDate]);

  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden transform-3d animate-scale-in" style={{ background: "var(--cal-bg)", color: "var(--cal-text)", borderColor: "var(--cal-accent)" }}>
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b-2 border-blue-300 bg-transparent">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-4 text-center text-sm font-bold text-blue-800 uppercase tracking-wider hover:bg-blue-700 hover:text-white transition-colors"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
        {calendarGrid.map((date, index) => {
          const dateEvents = getEventsForDate(events, date);
          const isToday = isSameDayUtil(date, today);
          const isSelected = selectedDate ? isSameDayUtil(date, selectedDate) : false;
          const isInCurrentMonth = isCurrentMonth(date, currentDate);

          useEffect(() => {
    let interactInstance: any = null;
    let cleanup: (() => void) | null = null;
    (async () => {
      try {
        const mod = await import('interactjs');
        interactInstance = (mod && (mod.default || mod));
        if (interactInstance && containerRef.current) {
          const interact = interactInstance;
          const draggables = containerRef.current.querySelectorAll('.event-badge');
          if (draggables.length) {
            cleanup = () => {
              // remove listeners by calling interact to unset
              try { interact(containerRef.current).unset(); } catch (e) { /* ignore */ }
            };
            interact(containerRef.current).on('down', () => {});
            interact('.event-badge').draggable({
              listeners: {
                move (event: any) {
                  const target = event.target;
                  const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
                  const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;
                  target.style.transform = `translate(${x}px, ${y}px)`;
                  target.setAttribute('data-x', x);
                  target.setAttribute('data-y', y);
                },
                end (event: any) {
                  // On drag end we simply log — you can wire this to update event date.
                  const target = event.target;
                  const id = target.getAttribute('data-event-id');
                  console.log('Drag end for event', id);
                }
              }
            });
          }
        }
      } catch (e) {
        // interactjs not installed — ignore
        console.warn('interactjs not available, drag/resize disabled');
      }
    })();
    return () => {
      if (cleanup) cleanup();
    };
  }, [currentDate]);

  return (
            <CalendarCell
              key={`${date.toISOString()}-${index}`}
              date={date}
              events={dateEvents}
              isToday={isToday}
              isSelected={isSelected}
              isCurrentMonth={isInCurrentMonth}
              onClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};
