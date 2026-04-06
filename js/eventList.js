// ✅ GLOBAL FUNCTIONS

function deleteEvent(eventId) {
  let events = getEvents();

  events = events.filter(e => String(e.eventId) !== String(eventId));

  saveEvents(events);

  alert("Event deleted!");
  location.reload();
}

function editEvent(eventId) {
  window.location.href = `create.html?id=${eventId}`;
}


// ✅ MAIN LOAD
window.onload = () => {
  const events = getEvents();
  const container = document.getElementById("eventList");

  container.innerHTML = "";

  if (!events.length) {
    container.innerHTML = "<p>No events found</p>";
    return;
  }

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";

    div.innerHTML = `
  <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-slate-200 dark:border-slate-800">

    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">
          ${event.title}
        </h3>
        <p class="text-sm text-slate-500 mt-1">
          📅 ${event.date}
        </p>
      </div>

      <span class="text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
        Upcoming
      </span>
    </div>

    <div class="mt-4 flex items-center gap-4 text-sm">
      <span class="text-green-600 dark:text-green-400">
        👍 ${event.rsvp?.yes || 0}
      </span>
      <span class="text-red-600 dark:text-red-400">
        👎 ${event.rsvp?.no || 0}
      </span>
    </div>

    <div class="mt-6 flex gap-3 flex-wrap">
      <a href="event.html?id=${event.eventId}" 
         class="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-500 transition">
        View
      </a>

      <button onclick="editEvent('${event.eventId}')"
        class="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-400 transition">
        Edit
      </button>

      <button onclick="deleteEvent('${event.eventId}')"
        class="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition">
        Delete
      </button>
    </div>

  </div>
`;
    container.appendChild(div);
  });
};