import { CalendarView } from './components/Calendar/CalendarView'
import { CalendarEvent } from './components/Calendar/CalendarView.types'

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
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text mb-3 animate-float tracking-tight">
            Calendar View
          </h1>
          <p className="text-blue-700 text-lg font-medium">
            Beautiful Calendar with Blue & Green Theme
          </p>
        </div>
        <CalendarView
          events={sampleEvents}
          onEventAdd={(event) => console.log('Add event:', event)}
          onEventUpdate={(id, updates) => console.log('Update event:', id, updates)}
          onEventDelete={(id) => console.log('Delete event:', id)}
        />
      </div>
    </div>
  )
}

export default App
