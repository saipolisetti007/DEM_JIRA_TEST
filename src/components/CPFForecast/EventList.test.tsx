import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventList from './EventList'; // adjust the import based on your file structure

const mockEvents = [
  {
    event_type: 'Display',
    event_subtype: 'Fence',
    event_start: '2024-08-09',
    event_end: '2024-09-22'
  },
  {
    event_type: 'MVM',
    event_subtype: 'Single Item Discount',
    event_start: '2024-06-17',
    event_end: '2024-09-23'
  },
  {
    event_type: 'Single Item Discount',
    event_subtype: 'subtype2',
    event_start: '2023-02-01',
    event_end: '2023-02-02'
  }
];

describe('EventList', () => {
  test('renders EventAvatar components correctly', () => {
    render(<EventList events={mockEvents} />);

    mockEvents.forEach((event) => {
      const eventType = event.event_type ? event.event_type : 'NA';
      expect(screen.getByTestId(`avatar-${eventType}`)).toBeInTheDocument();
    });
  });

  test('displays the correct tooltip information', () => {
    render(<EventList events={mockEvents} />);

    mockEvents.forEach((event) => {
      const eventType = event.event_type ? event.event_type : 'NA';
      const avatar = screen.getByTestId(`avatar-${eventType}`);
      fireEvent.mouseOver(avatar);
      waitFor(() => {
        expect(screen.getByText(`Event Type: ${eventType}`)).toBeInTheDocument();
        expect(screen.getByText(`Event Subtype: ${event.event_subtype}`)).toBeInTheDocument();
        expect(screen.getByText(` ${event.event_start} - ${event.event_end}`)).toBeInTheDocument();
      });
    });
  });
});
