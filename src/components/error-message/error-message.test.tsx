import { makeFakeError } from '../../mocks/offer-mocks';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';


describe('Function: isErrorMessageCorrect', () => {
  it('should return correct error name', () => {
    const mockError = makeFakeError();
    render(<ErrorMessage {...mockError} />);

    const errorElement = screen.getByText(mockError.error);

    expect(errorElement).toBeInTheDocument();
  });
});
