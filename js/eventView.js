const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const details = document.getElementById("eventDetails");
let countdownTimer = null;

// Load event
function renderEvent() {
  if (!eventId) {
    details.innerHTML = `<p>No event selected</p>`;
    return;
  }

  const event = getEventById(eventId);

  console.log("Event ID:", eventId);
  console.log("Event Found:", event);

  if (!event) {
    details.innerHTML = `<p class="text-red-500">Event not found</p>`;
    return;
  }

  details.innerHTML = `
  <div class="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">

    <!-- Title -->
    <div class="mb-6">
      <p class="text-sm uppercase tracking-widest text-sky-500 font-semibold">
        Event
      </p>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
        ${event.title}
      </h2>
      <p class="text-slate-500 mt-2">
        📅 ${event.date}
      </p>
    </div>

    <!-- Description -->
    <div class="mb-6">
      <p class="text-slate-700 dark:text-slate-300">
        ${event.description || "No description provided."}
      </p>
    </div>

    <!-- Countdown -->
    <div class="mb-6 p-5 rounded-2xl bg-slate-100 dark:bg-slate-800">
      <p class="text-sm text-slate-500">Countdown</p>
      <p id="countdownText" class="text-2xl font-semibold mt-2 text-sky-600 dark:text-sky-400"></p>
    </div>

    <!-- RSVP -->
  <div class="flex gap-4 mb-6">
  <div class="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 font-semibold text-center">
    👍 Yes (${event.rsvp.yes})
  </div>

  <div class="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-semibold text-center">
    👎 No (${event.rsvp.no})
  </div>
</div>

    <!-- Actions -->
    <div class="flex gap-4">
      <button onclick="handleEdit()" 
        class="flex-1 py-3 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-400 transition">
        ✏️ Edit
      </button>

      <button onclick="handleDelete()" 
        class="flex-1 py-3 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-600 transition">
        🗑️ Delete
      </button>
    </div>

  </div>
`;
  updateCountdown();

  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(updateCountdown, 1000);
}

// Countdown
function updateCountdown() {
  const event = getEventById(eventId);
  const target = document.getElementById("countdownText");

  if (!event || !target) return;

  const eventDate = new Date(event.date);
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    target.textContent = "Event started!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  target.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// RSVP
function handleRsvp(answer) {
  addRsvp(eventId, answer);
  alert(`You selected ${answer}`);
  renderEvent();
}

// Edit
function handleEdit() {
  window.location.href = `create.html?id=${eventId}`;
}

// Delete
function handleDelete() {
  if (confirm("Delete this event?")) {
    deleteEventById(eventId);
    alert("Event deleted");
    window.location.href = "index.html";
  }
}

// Load page
renderEvent();