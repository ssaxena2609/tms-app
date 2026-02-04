import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    hasNextPage: true,
    hasPreviousPage: false,
    onPageChange: vi.fn(),
  };

  it('renders pagination buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('enables next button when hasNextPage is true', () => {
    render(<Pagination {...defaultProps} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  it('calls onPageChange when page number is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when next button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={1} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('active');
  });
});
