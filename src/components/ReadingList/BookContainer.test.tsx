import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BookContainer } from './BookContainer';
import { MOCK_BOOKS } from '@/mocks';

describe('ReadingList: BookContainer ', () => {
  it('should show a remove button', () => {
    render(<BookContainer book={MOCK_BOOKS[0]} />);

    expect(screen.getByRole('button', { name: /Remove/i })).toBeInTheDocument();
  });
});
