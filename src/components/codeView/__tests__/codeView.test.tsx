import { render, screen } from '@testing-library/react';

import { CodeView } from '../codeView';

const url = 'https:example.com';

const mockResponse = `// Traditional Function Implementation
  function sum01(a, b) {
    return a + b;
  }
  
  // Anonymous Function Expression
  const sum02 = function (a, b) {
    return a + b;
  };
  
  // Anonymous Function Expression With Arrow Function Syntax
  const sum03 = (a, b) => {
    return a + b;
  };
  `;

describe('CodeView', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('fetches code from url and renders it', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(600);
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(600);
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() => Promise.resolve({ text: () => Promise.resolve(mockResponse) })) as jest.Mock
      );
    render(<CodeView url={url} />);
    const preElement = await screen.findByTestId('codeView-pre-0');
    expect(preElement).toBeInTheDocument();
  });

  it('renders full view', () => {
    render(<CodeView url={undefined} fullView />);
    const container = screen.getByTestId('codeView-container');
    expect(container).toHaveClass('h-screen');
  });
});
