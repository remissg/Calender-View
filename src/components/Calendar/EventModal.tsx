import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/primitives/Modal';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { Select } from '@/components/primitives/Select';
import { EventModalProps, EventFormData, EVENT_COLORS, EVENT_CATEGORIES } from './CalendarView.types';
import { formatTimeInput, parseTime, isAfterDate } from '@/utils/date.utils';
import { generateEventId } from '@/utils/event.utils';
import clsx from 'clsx';

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  mode,
  event,
  initialDate,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    startDate: new Date(),
    startTime: '09:00',
    endDate: new Date(),
    endTime: '10:00',
    color: (EVENT_COLORS[0]?.value ?? '#3b82f6'),
    category: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && event) {
        setFormData({
          title: event.title,
          description: event.description || '',
          startDate: event.startDate,
          startTime: formatTimeInput(event.startDate),
          endDate: event.endDate,
          endTime: formatTimeInput(event.endDate),
          color: event.color || (EVENT_COLORS[0]?.value ?? '#3b82f6'),
          category: event.category || '',
        });
      } else {
        const startDate = initialDate || new Date();
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);

        setFormData({
          title: '',
          description: '',
          startDate,
          startTime: formatTimeInput(startDate),
          endDate,
          endTime: formatTimeInput(endDate),
          color: (EVENT_COLORS[0]?.value ?? '#3b82f6'),
          category: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, event, initialDate]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof EventFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    const startDateTime = parseTime(formData.startDate, formData.startTime);
    const endDateTime = parseTime(formData.endDate, formData.endTime);

    if (isAfterDate(startDateTime, endDateTime)) {
      newErrors.endDate = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const startDateTime = parseTime(formData.startDate, formData.startTime);
      const endDateTime = parseTime(formData.endDate, formData.endTime);

      const savedEvent = {
        id: event?.id || generateEventId(),
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        startDate: startDateTime,
        endDate: endDateTime,
        color: formData.color,
        category: formData.category || undefined,
      };

      onSave(savedEvent);
      onClose();
    },
    [formData, validateForm, event, onSave, onClose]
  );

  const handleDelete = useCallback(() => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  }, [event, onDelete, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit Event' : 'Create Event'}
      titleClassName="bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text"
      descriptionClassName="text-blue-800"
      description={mode === 'edit' ? 'Update event details below' : 'Add a new event to your calendar'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col" style={{ height: 'calc(85vh - 10rem)' }}>
        <div className="flex-grow overflow-y-auto space-y-6 p-1 pr-4 -mx-1 custom-scrollbar">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-blue-800 mb-1">Title</label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              placeholder="Event title"
              maxLength={100}
              required
              className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-blue-800 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={clsx(
                'block w-full px-3 py-2 border-green-200 rounded-lg bg-green-50/50',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                'transition-colors resize-none',
                errors.description && 'border-error-500 focus:ring-error-500'
              )}
              rows={3}
              placeholder="Event description (optional)"
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              {errors.description && (
                <p className="text-sm text-error-500" role="alert">
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-neutral-500 ml-auto">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-bold text-blue-800 mb-1">Start Date</label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                required
                className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-bold text-blue-800 mb-1">Start Time</label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
                className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="block text-sm font-bold text-blue-800 mb-1">End Date</label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                error={errors.endDate}
                required
                className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-bold text-blue-800 mb-1">End Time</label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
                className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-bold text-blue-800 mb-3">
              Event Color
            </label>
            <div className="flex gap-3 flex-wrap">
              {EVENT_COLORS.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: colorOption.value })}
                  className={clsx(
                    'w-12 h-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-blue-500 transform hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-2xl',
                    formData.color === colorOption.value && 'ring-4 ring-blue-900 ring-offset-2 scale-110'
                  )}
                  style={{ backgroundColor: colorOption.value }}
                  aria-label={`Select ${colorOption.name} color`}
                  title={colorOption.name}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-blue-800 mb-1">Category</label>
            <Select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: '', label: 'Select category (optional)' },
                ...EVENT_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
              ]}
            className="bg-blue-50/40 border-blue-200 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex justify-between items-center pt-4 mt-4 border-t-2 border-blue-100">
          {mode === 'edit' && onDelete ? (
            <Button type="button" variant="danger" onClick={handleDelete} className="animate-bounce-in">
              🗑️ Delete Event
            </Button>
          ) : (
            <div />
          )}
          
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose} className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-gradient-to-r from-blue-500 to-green-500 text-white animate-glow">
              {mode === 'edit' ? '✅ Update' : '✨ Create'} Event
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
