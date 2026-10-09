import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HebrewLayout from '../layout';

describe('HebrewLayout', () => {
  it('scopes its children to Hebrew, right-to-left, in the Hebrew type stack', () => {
    render(
      <HebrewLayout>
        <p>שלום</p>
      </HebrewLayout>
    );

    const wrapper = screen.getByText('שלום').parentElement;
    expect(wrapper).toHaveAttribute('lang', 'he');
    expect(wrapper).toHaveAttribute('dir', 'rtl');
    expect(wrapper).toHaveClass('font-hebrew');
  });
});
