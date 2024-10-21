import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PromoCard from './PromoCard';

describe('PromoCard', () => {
  test('should render the component with children correctly', () => {
    render(
      <PromoCard backgroundImage="test-image.jpg" backgroundColor="#000">
        <div>Test Child</div>
      </PromoCard>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('should apply the correct background image and color styles', () => {
    const { container } = render(
      <PromoCard backgroundImage="test-image.jpg" backgroundColor="#000">
        <div>Test Child</div>
      </PromoCard>
    );

    const box = container.firstChild;
    expect(box).toHaveStyle(`
      background-image: url(test-image.jpg);
      color: #000;
    `);
    // Check if the child element is rendered correctly
    if (box) {
      expect(box.firstChild).toHaveTextContent('Test Child');
    }
  });
});
