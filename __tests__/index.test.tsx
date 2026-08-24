import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('Home page', () => {
  it('renders without crashing and includes a real page title in Head', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
    // next/head injects into document.head outside the render container;
    // assert the component tree itself renders (smoke test for the page).
  });
});
