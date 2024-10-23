import { Avatar, Tooltip, Typography } from '@mui/material';
import React from 'react';

type EventType = {
  event_type: string;
  event_subtype: string;
  event_start: string;
  event_end: string;
};

type EventAvatarPropsType = {
  key: string;
  event: EventType;
};
// Define the type for the props of EventList
type EventListPropsType = {
  events: EventType[];
};
//// Function to generate a color based on the event type bubbles
const getColorFromType = (type: string): string => {
  let hash = 0;
  // Generate a hash from the event type string
  for (let i = 0; i < type.length; i++) {
    hash = type.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Convert the hash to an HSL color
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

// Component to display an avatar for an event
const EventAvatar = ({ event }: EventAvatarPropsType) => {
  // Get the event type or default to 'NA'
  const eventType = event.event_type ? event.event_type : 'NA';
  // Get the first letter of the event type
  const firstLetter = eventType.charAt(0).toUpperCase();
  // Get the color based on the event type
  const color = getColorFromType(eventType);
  return (
    <Tooltip
      placement="top"
      arrow
      title={
        <>
          <div>{`Event Type: ${eventType}`}</div>
          <div>{`Event Subtype: ${event.event_subtype}`}</div>
          <div>{`Event Delivery Date window:`}</div>
          <div>
            {event.event_start} - {event.event_end}
          </div>
        </>
      }>
      <Avatar sx={{ bgcolor: color, width: 20, height: 20 }} data-testid={`avatar-${eventType}`}>
        <Typography component="span" variant="h6">
          {firstLetter}
        </Typography>
      </Avatar>
    </Tooltip>
  );
};

// Component to display a list of events
const EventList = ({ events }: EventListPropsType) => {
  return (
    <div className="flex gap-1">
      {events?.map((event: EventType, index: number) => (
        <EventAvatar key={`${event.event_type}-${index}`} event={event} />
      ))}
    </div>
  );
};

export default EventList;
