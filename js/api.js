const STORAGE_KEY = "eventify.events";

// Get all events
function getEvents() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const events = raw ? JSON.parse(raw) : [];

  return events.map((event) => ({
    rsvp: { yes: 0, no: 0, ...(event.rsvp || {}) },
    ...event,
  }));
}

// Save events
function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// Create event
function createEvent(data) {
  const events = getEvents();

  const newEvent = {
    eventId: Date.now().toString(),
    createdAt: new Date().toISOString(),
    rsvp: { yes: 0, no: 0 },
    ...data,
  };

  events.push(newEvent);
  saveEvents(events);

  return newEvent;
}

// ✅ FIXED (IMPORTANT)
function getEventById(id) {
  return getEvents().find(
    (event) => String(event.eventId).trim() === String(id).trim()
  );
}

// Update event
function updateEvent(updatedEvent) {
  const events = getEvents().map((event) =>
    String(event.eventId) === String(updatedEvent.eventId)
      ? { ...event, ...updatedEvent }
      : event
  );
  saveEvents(events);
}

// Delete event
function deleteEventById(eventId) {
  const events = getEvents().filter(
    (event) => String(event.eventId) !== String(eventId)
  );
  saveEvents(events);
}

// RSVP
function addRsvp(eventId, answer) {
  const events = getEvents().map((event) => {
    if (String(event.eventId) !== String(eventId)) return event;

    return {
      ...event,
      rsvp: {
        ...event.rsvp,
        yes: answer === "Yes" ? event.rsvp.yes + 1 : event.rsvp.yes,
        no: answer === "No" ? event.rsvp.no + 1 : event.rsvp.no,
      },
    };
  });

  saveEvents(events);
}