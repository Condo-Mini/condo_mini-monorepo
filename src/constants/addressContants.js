export const zipCodePattern = new RegExp(/\d{2}\.?\d{3}-?\d{3}/);

export const sanitizeZipCodeReplacementPattern = new RegExp(/-|\./, 'g');
