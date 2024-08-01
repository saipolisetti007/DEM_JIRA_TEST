import { Avatar, Tooltip, Typography } from '@mui/material';
import React from 'react';

const getColorFromType = (type) => {
  let hash = 0;
  for (let i = 0; i < type.length; i++) {
    hash = type.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

const EventAvatar = ({ event }) => {
  const firstLetter = event.event_type.charAt(0).toUpperCase();
  const color = getColorFromType(event.event_type);
  return (
    <Tooltip
      placement="top"
      arrow
      title={
        <>
          <div>{`Event Type: ${event.event_type}`}</div>
          <div>{`Event Subtype: ${event.event_subtype}`}</div>
          <div>{`Event store in window:`}</div>
          <div>
            {event.event_start} - {event.event_end}
          </div>
        </>
      }>
      <Avatar
        sx={{ bgcolor: color, width: 20, height: 20 }}
        data-testid={`avatar-${event.event_type}`}>
        <Typography component="span" variant="h6">
          {firstLetter}
        </Typography>
      </Avatar>
    </Tooltip>
  );
};

const EventList = ({ events }) => {
  return (
    <div className="flex gap-1">
      {events?.map((event, index) => (
        <EventAvatar key={event + index} event={event} />
      ))}
    </div>
  );
};

export default EventList;
