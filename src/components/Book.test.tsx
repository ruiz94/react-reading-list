import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { Book } from './Book';
import { MOCK_BOOKS } from '@/mocks';
import { render, screen } from '@testing-library/react';

describe('Book component', () => {
  it('should render a book', () => {
    render(<Book {...MOCK_BOOKS[0]} />);

    const title = screen.getByText(MOCK_BOOKS[0].title);
    expect(title).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe(MOCK_BOOKS[0].cover);

    const strongGenreElement = screen.getByText(/Genre:/i);
    expect(strongGenreElement).toBeInTheDocument();
    expect(strongGenreElement.tagName).toBe('STRONG');
    expect(screen.getByText(MOCK_BOOKS[0].genre)).toBeInTheDocument();

    const strongISBNElement = screen.getByText(/ISBN:/i);
    expect(strongISBNElement).toBeInTheDocument();
    expect(strongISBNElement.tagName).toBe('STRONG');
    expect(screen.getByText(MOCK_BOOKS[0].ISBN)).toBeInTheDocument();
  });
});
