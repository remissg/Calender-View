import { useState, useCallback } from 'react';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { generateEventId, validateEvent, sortEventsByStartDate } from '@/utils/event.utils';

interface UseEventManagerProps {
  initialEvents?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
}

export const useEventManager = ({
  initialEvents = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}: UseEventManagerProps = {}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(
    sortEventsByStartDate(initialEvents)
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const addEvent = useCallback(
    (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
      const validation = validateEvent(event);
      
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors).join(', '));
      }

      const newEvent: CalendarEvent = {
        ...event,
        id: 'id' in event && event.id ? event.id : generateEventId(),
      } as CalendarEvent;

      setEvents((prev) => sortEventsByStartDate([...prev, newEvent]));
      
      if (onEventAdd) {
        onEventAdd(newEvent);
      }

      return newEvent;
    },
    [onEventAdd]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) => {
        const updatedEvents = prev.map((event) =>
          event.id === id ? { ...event, ...updates } : event
        );
        return sortEventsByStartDate(updatedEvents);
      });

      if (onEventUpdate) {
        onEventUpdate(id, updates);
      }

      // Update selected event if it's the one being updated
      setSelectedEvent((prev) => {
        if (prev?.id === id) {
          return { ...prev, ...updates };
        }
        return prev;
      });
    },
    [onEventUpdate]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((event) => event.id !== id));
      
      if (onEventDelete) {
        onEventDelete(id);
      }

      // Clear selected event if it's the one being deleted
      setSelectedEvent((prev) => (prev?.id === id ? null : prev));
    },
    [onEventDelete]
  );

  const selectEvent = useCallback((event: CalendarEvent | null) => {
    setSelectedEvent(event);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return {
    events,
    selectedEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    clearSelection,
  };
};
