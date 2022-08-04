import { render, screen } from '@testing-library/react';

import { IconButton } from '../iconButton';

describe('IconButton', () => {
  it('displays text', () => {
    render(<IconButton icon="" text="Delete" onClick={jest.fn()} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('indicates loading', () => {
    render(<IconButton isLoading icon="" text="Delete" onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('loading');
  });

  it('displays correct color', () => {
    render(<IconButton icon="" text="Delete" onClick={jest.fn()} color="blue" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/blue/i);
  });
});
