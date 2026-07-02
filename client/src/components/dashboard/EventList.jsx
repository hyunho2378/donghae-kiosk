// 이벤트 목록 (PATTERNS.md 리스트: 세로 스택, 항목 간 8px)

import EventItem from './EventItem.jsx'

function EventList({ events, selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          selected={event.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default EventList
