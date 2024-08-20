import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

it('flips the correct cells when a cell is clicked', () => {
  const nrows = 3;
  const ncols = 3;
  const { container } = render(<Board nrows={nrows} ncols={ncols} chanceLightStartsOn={0} />);
  
  // Debugging: Log the rendered HTML to inspect the structure
  console.log(container.innerHTML);
  
  // Select the center cell
  const cell = container.querySelector('tr:nth-child(2) > td:nth-child(2)');
  expect(cell).not.toBeNull();
  
  // Click the center cell
  fireEvent.click(cell);

  // Check if the correct cells were flipped
  const flippedCells = [
    container.querySelector('tr:nth-child(2) > td:nth-child(2)'), // center
    container.querySelector('tr:nth-child(1) > td:nth-child(2)'), // top
    container.querySelector('tr:nth-child(3) > td:nth-child(2)'), // bottom
    container.querySelector('tr:nth-child(2) > td:nth-child(1)'), // left
    container.querySelector('tr:nth-child(2) > td:nth-child(3)')  // right
  ];

  flippedCells.forEach(cell => {
    expect(cell).toHaveClass('Cell-lit');
  });
});

it('shows "You Won!" message when all cells are turned off', () => {
  const nrows = 3;
  const ncols = 3;
  const { container, queryByText } = render(<Board nrows={nrows} ncols={ncols} chanceLightStartsOn={1} />);
  
  // Manually turn off all lights
  container.querySelectorAll('td').forEach(cell => {
    fireEvent.click(cell);
  });

  // Debugging: Log the HTML structure before checking the "You Won!" message
  console.log(container.innerHTML);

  // Check if the "You Won!" message is displayed
  expect(queryByText('You Won!')).toBeInTheDocument();
});
