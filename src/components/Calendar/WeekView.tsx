import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { WeekViewProps } from './CalendarView.types';
import { getWeekDates, getDayName, formatDate, isSameDayUtil, getTimeSlots, calculateEventPosition } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
  const timeSlots = useMemo(() => getTimeSlots(), []);
  const today = useMemo(() => new Date(), []);

  const handleTimeSlotClick = useCallback(
    (date: Date, timeSlot: string) => {
      const [hours, minutes] = timeSlot.split(':').map(Number);
      onDateClick(date, { hours: hours ?? 0, minutes: minutes ?? 0 });
    },
    [onDateClick]
  );

  return (
    <div className="calendar-week bg-white rounded-lg shadow-card overflow-hidden" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
      <div className="flex border-b border-neutral-200" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
        {/* Time column header */}
        <div className="w-20 flex-shrink-0 bg-neutral-100" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }} />
        
        {/* Day headers */}
        {weekDates.map((date) => {
          const isToday = isSameDayUtil(date, today);
          
          return (
            <div
              key={date.toISOString()}
              className={clsx(
                'flex-1 py-4 text-center border-l border-neutral-200',
                isToday && 'bg-primary-50'
              )}
            >
              <div className="text-xs text-neutral-600 font-medium" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
                {getDayName(date)}
              </div>
              <div
                className={clsx(
                  'mt-1 text-lg font-semibold',
                  isToday ? 'text-primary-600' : 'text-neutral-900'
                )}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-auto max-h-[600px]" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
        <div className="flex" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
          {/* Time column */}
          <div className="w-20 flex-shrink-0" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot}
                className="h-16 border-b border-neutral-200 pr-2 text-right"
              >
                <span className="text-xs text-neutral-600">{timeSlot}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDates.map((date) => {
            const dateEvents = getEventsForDate(events, date);
            const isToday = isSameDayUtil(date, today);

            return (
              <div
                key={date.toISOString()}
                className={clsx(
                  'flex-1 relative border-l border-neutral-200',
                  isToday && 'bg-primary-50/30'
                )}
              >
                {/* Time slots */}
                {timeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    onClick={() => handleTimeSlotClick(date, timeSlot)}
                    className="w-full h-16 border-b border-neutral-200 hover:bg-primary-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    aria-label={`${formatDate(date)}, ${timeSlot}`}
                  />
                ))}

                {/* Events overlay */}
                {dateEvents.map((event) => {
                  const { top, height } = calculateEventPosition(
                    event.startDate,
                    event.endDate
                  );

                  return (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium text-white overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: event.color || '#3b82f6',
                      }}
                      aria-label={`Event: ${event.title}`}
                    >
                      <div className="font-semibold truncate" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>{event.title}</div>
                      {height > 40 && event.description && (
                        <div className="text-xs opacity-90 truncate" style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
                          {event.description}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
