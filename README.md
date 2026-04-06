# Eventify

Eventify is a beginner-friendly frontend event planner built with HTML, Tailwind CSS, and Vanilla JavaScript.

## Overview

Eventify lets users:
- create events with title, date, and description
- view all events on the homepage
- view a single event detail page
- edit and delete events
- RSVP to events with Yes / No buttons
- store all event data in `localStorage`
- enjoy a responsive modern UI with a dark mode toggle
- see a live countdown timer for each event

## Project Structure

- `index.html` - homepage with event list
- `create.html` - form for creating and editing events
- `event.html` - single event detail view
- `css/style.css` - custom styling and card/theme tweaks
- `js/api.js` - localStorage event functions
- `js/eventList.js` - homepage list rendering and delete/edit actions
- `js/createEvent.js` - create/edit form handling
- `js/eventView.js` - single event display, countdown, RSVP, edit, and delete
- `js/app.js` - shared utilities and dark mode support

## Features

- Create event: title, date, description
- Edit event with pre-filled form
- Delete event with confirmation prompt
- RSVP buttons with counters
- Event countdown timer
- Dark mode toggle with saved preference
- Local persistence using browser `localStorage`
- Responsive Tailwind-based layout

## Usage

1. Open `index.html` in your browser.
2. Click **Create Event** to add a new event.
3. Enter event details and save.
4. Use the event cards on `index.html` to view, edit, or delete events.
5. Use the RSVP buttons on `event.html` to vote Yes or No.

## Local Development

No build tools are required. Just open the HTML files in a browser.

If you want to use a local server for better URL support, use a simple tool like Live Server in VS Code or run a static file server.

## Notes

- Event data is stored in the browser only.
- Data persists across refreshes, but not across devices.
- The app uses URL parameters to navigate to event detail and edit pages.

## License

This project is free to use and modify.
