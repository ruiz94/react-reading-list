import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render', () => {
    render(<App />);
  });
});
