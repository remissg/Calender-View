import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { CalendarCellProps } from './CalendarView.types';

export const CalendarCell = React.memo<CalendarCellProps>(
  ({ date, events, isToday, isSelected, isCurrentMonth, onClick, onEventClick }) => {
    const dayNumber = date.getDate();

    const handleClick = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(date);
        }
      },
      [date, onClick]
    );

    const handleEventClick = useCallback(
      (e: React.MouseEvent, eventId: string) => {
        e.stopPropagation();
        const event = events.find((evt) => evt.id === eventId);
        if (event) {
          onEventClick(event);
        }
      },
      [events, onEventClick]
    );

    const visibleEvents = useMemo(() => events.slice(0, 3), [events]);
    const remainingCount = events.length - 3;

    const cellStyle: React.CSSProperties = {
      background: isSelected ? 'var(--cal-selected-bg)' : isToday ? 'var(--cal-today-bg)' : undefined,
      color: isSelected ? 'var(--cal-accent-text)' : undefined,
      borderColor: 'var(--cal-accent)'
    };

    return (
      <div
        role="button" data-calendar-date={date.toISOString()}
        tabIndex={0}
        aria-label={`${date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}. ${events.length} events.`}
        aria-pressed={isSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown} style={cellStyle}
        className={clsx(
          'border border-neutral-200 min-h-32 p-2 transition-all duration-300 cursor-pointer group relative overflow-hidden',
          'hover:shadow-lg hover:-translate-y-1 hover:scale-105 transform-3d',
          'hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
          !isCurrentMonth && 'bg-neutral-50 opacity-60',
          isSelected && 'ring-2 ring-blue-600 ring-inset shadow-xl bg-blue-50',
          isToday && 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-md'
        )}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-1 relative z-10">
          {isToday ? (
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-12 animate-glow">
              {dayNumber}
            </span>
          ) : (
            <span
              className={clsx(
                'text-sm font-semibold transition-all duration-200',
                isCurrentMonth ? 'text-neutral-900 group-hover:text-blue-700 group-hover:scale-110' : 'text-neutral-400'
              )}
            >
              {dayNumber}
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden relative z-10">
          {visibleEvents.map((event, index) => (
            <button
              key={event.id} data-event-id={event.id}
              onClick={(e) => handleEventClick(e, event.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  handleEventClick(e as unknown as React.MouseEvent, event.id);
                }
              }}
              className="w-full text-left text-xs px-2 py-1 rounded truncate transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-md transform focus:outline-none focus:ring-2 focus:ring-blue-500 animate-slide-in-left"
              style={{ 
                backgroundColor: event.color || 'var(--cal-accent)',
                animationDelay: `${index * 0.1}s`
              }}
              aria-label={`Event: ${event.title}`}
            >
              <span className="text-white font-medium drop-shadow">{event.title}</span>
            </button>
          ))}
          {remainingCount > 0 && (
            <button
              onClick={handleClick}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold w-full text-left focus:outline-none hover:underline transition-all hover:scale-105"
            >
              +{remainingCount} more
            </button>
          )}
        </div>
      </div>
    );
  }
);

CalendarCell.displayName = 'CalendarCell';
