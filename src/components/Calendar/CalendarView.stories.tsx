import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { CalendarEvent } from './CalendarView.types';

// Generate sample events
const generateSampleEvents = (count: number = 10): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];
  const categories = ['Meeting', 'Work', 'Personal', 'Design', 'Development'];
  
  for (let i = 0; i < count; i++) {
    const startDate = new Date(2025, 10, Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 14) + 8, 0);
    const endDate = new Date(startDate.getTime() + (Math.random() * 3 + 0.5) * 60 * 60 * 1000);
    
    events.push({
      id: `evt-${i + 1}`,
      title: `Event ${i + 1}`,
      description: `This is a description for event ${i + 1}`,
      startDate,
      endDate,
      color: colors[Math.floor(Math.random() * colors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  
  return events;
};

const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2025, 10, 15, 9, 0),
    endDate: new Date(2025, 10, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    description: 'Review new component designs',
    startDate: new Date(2025, 10, 15, 14, 0),
    endDate: new Date(2025, 10, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2025, 10, 16, 10, 0),
    endDate: new Date(2025, 10, 16, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
  {
    id: 'evt-4',
    title: 'Development Sprint',
    description: 'Sprint planning and task assignment',
    startDate: new Date(2025, 10, 17, 9, 0),
    endDate: new Date(2025, 10, 17, 17, 0),
    color: '#8b5cf6',
    category: 'Work',
  },
  {
    id: 'evt-5',
    title: 'Lunch Break',
    startDate: new Date(2025, 10, 15, 12, 0),
    endDate: new Date(2025, 10, 15, 13, 0),
    color: '#ec4899',
    category: 'Personal',
  },
];

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A fully functional calendar view component with event management capabilities. Supports both month and week views, event creation, editing, and deletion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: {
      control: 'select',
      options: ['month', 'week'],
      description: 'Initial view mode',
    },
    initialDate: {
      control: 'date',
      description: 'Initial date to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Default story with sample events
export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'month',
    initialDate: new Date(2025, 10, 1),
  },
};

// Empty state - no events
export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'month',
    initialDate: new Date(2025, 10, 1),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with no events, demonstrating the empty state.',
      },
    },
  },
};

// Week view
export const WeekView: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'week',
    initialDate: new Date(2025, 10, 15),
  },
  parameters: {
    docs: {
      description: {
        story: 'Week view showing time slots and events positioned by time.',
      },
    },
  },
};

// Large dataset - many events
export const LargeDataset: Story = {
  args: {
    events: generateSampleEvents(50),
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'month',
    initialDate: new Date(2025, 10, 1),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with 50+ events to demonstrate performance with large datasets.',
      },
    },
  },
};

// Interactive playground
export const InteractivePlayground: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      console.log('Event added:', event);
      alert(`Event created: ${event.title}`);
    },
    onEventUpdate: (id, updates) => {
      console.log('Event updated:', id, updates);
      alert(`Event updated: ${id}`);
    },
    onEventDelete: (id) => {
      console.log('Event deleted:', id);
      alert(`Event deleted: ${id}`);
    },
    initialView: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calendar with console logging and alerts for all actions. Try creating, editing, and deleting events!',
      },
    },
  },
};

// Mobile responsive view
export const MobileView: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'month',
    initialDate: new Date(2025, 10, 1),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Calendar optimized for mobile devices with responsive layout.',
      },
    },
  },
};

// Current month with today highlighted
export const CurrentMonth: Story = {
  args: {
    events: [
      {
        id: 'today-1',
        title: 'Morning Meeting',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000),
        color: '#3b82f6',
        category: 'Meeting',
      },
      {
        id: 'today-2',
        title: 'Lunch',
        startDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        color: '#10b981',
        category: 'Personal',
      },
    ],
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
    initialView: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar showing the current month with today\'s date highlighted.',
      },
    },
  },
};


