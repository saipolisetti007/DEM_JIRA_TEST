import { render, screen, fireEvent } from '@testing-library/react';
import ResponseMessageDialog from './ResponseMessageDialog';

describe('ResponseMessageDialog Component', () => {
  test('render open dialog when isOpen is true', () => {
    const responseMessage = {
      message: 'An error Occured',
      errors: [
        { row: 1, field: 'Field 1', error: 'Error 1' },
        { row: 2, field: 'Field 2', error: 'Error 2' }
      ]
    };
    render(
      <ResponseMessageDialog responseMessage={responseMessage} isOpen={true} onClose={() => {}} />
    );

    expect(screen.getByText('An error Occured')).toBeInTheDocument();
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });

  test('render open dialog when isOpen is true', () => {
    const onCloseMock = jest.fn();
    render(<ResponseMessageDialog isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
