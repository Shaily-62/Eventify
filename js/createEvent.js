const form = document.getElementById("eventForm");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

function initializeForm() {
  if (eventId) {
    const event = getEventById(eventId);

    if (!event) {
      alert("Event not found.");
      window.location.href = "index.html";
      return;
    }

    titleInput.value = event.title;
    dateInput.value = event.date;
    descriptionInput.value = event.description;
    formTitle.textContent = "Edit Event";
    submitButton.textContent = "Save changes";
  } else {
    const today = new Date().toISOString().slice(0, 10);
    dateInput.value = today;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const eventData = {
    title: titleInput.value.trim(),
    date: dateInput.value,
    description: descriptionInput.value.trim(),
  };

  if (!eventData.title || !eventData.date) {
    alert("Please add a title and date for your event.");
    return;
  }

  if (eventId) {
    updateEvent({ eventId, ...eventData });
    alert("Event updated successfully.");
  } else {
    createEvent(eventData);
    alert("Event created successfully.");
  }

  window.location.href = "index.html";
});

initializeForm();