/* eslint-env jest */
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Loader />);
        expect(container.firstChild).toHaveClass('loader-container');
    });
});
