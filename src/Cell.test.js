import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';

it('renders a Cell component', () => {
  // Test for unlit cell, wrap it in a table and tr
  const { container, rerender } = render(
    <table>
      <tbody>
        <tr>
          <Cell isLit={false} />
        </tr>
      </tbody>
    </table>
  );
  expect(container.querySelector('td')).toHaveClass('Cell');
  expect(container.querySelector('td')).not.toHaveClass('Cell-lit');

  // Test for lit cell
  rerender(
    <table>
      <tbody>
        <tr>
          <Cell isLit={true} />
        </tr>
      </tbody>
    </table>
  );
  expect(container.querySelector('td')).toHaveClass('Cell Cell-lit');
});
