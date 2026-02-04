import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../../components/Loading/Loading';

describe('Loading Component', () => {
  it('renders loading spinner and text', () => {
    render(<Loading />);
    
    expect(screen.getByText('Loading shipments...')).toBeInTheDocument();
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });
});
