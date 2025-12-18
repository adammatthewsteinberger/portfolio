import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Custom render function with providers if needed in the future
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { ...options });
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with our custom version
export { customRender as render };
