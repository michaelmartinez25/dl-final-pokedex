import { render, screen } from '@testing-library/react';
import App from './App';

// unit test, comes with making a react app
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
