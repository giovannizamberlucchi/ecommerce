export const getLastFromArray = <T = any>(elements: T[]): T => elements[elements.length - 1];

export const getPathFromSlugArr = (slug: string[]) => `/${slug.join('/')}`;
