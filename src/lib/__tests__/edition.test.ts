import { describe, expect, it } from 'vitest';
import { EXEC_PREFIX, editionFor } from '../edition';

describe('editionFor', () => {
  it('treats the exec prefix and everything under it as the executive edition', () => {
    expect(editionFor(EXEC_PREFIX)).toBe('exec');
    expect(editionFor(`${EXEC_PREFIX}/work`)).toBe('exec');
    expect(editionFor(`${EXEC_PREFIX}/work/ai-governance-gateway`)).toBe('exec');
  });

  it('treats everything else — including the root and unknown pathnames — as engineering', () => {
    expect(editionFor('/')).toBe('engineering');
    expect(editionFor('/hire-me')).toBe('engineering');
    expect(editionFor('/for-executives-not-really')).toBe('engineering');
    expect(editionFor(null)).toBe('engineering');
    expect(editionFor(undefined)).toBe('engineering');
    expect(editionFor('')).toBe('engineering');
  });
});
