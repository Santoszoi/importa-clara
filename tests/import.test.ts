import { describe, it, expect } from 'vitest';
import { reviewCSV, exportProducts, validSample, errorSample } from '../src/import';
const csv = (row: string) => 'sku;nome;preco;estoque\n' + row;
describe('catalog review', () => {
    it('exports exact cents and zero stock', () => { const data = JSON.parse(exportProducts(reviewCSV(validSample))); expect(data.products[0].priceCents).toBe(2990); expect(data.products[2].stock).toBe(0); });
    it('marks both duplicate occurrences', () => { const r = reviewCSV(errorSample); expect(r.rows[0].errors).toContain('SKU repetido neste arquivo.'); expect(r.rows[2].errors).toContain('SKU repetido neste arquivo.'); expect(r.rows.filter(r => r.errors.length)).toHaveLength(4); });
    it.each(['-1,00', '0,00', '1.20', '1,2', '1e3', '1.000,00'])('rejects invalid price %s', price => expect(reviewCSV(csv(`AB;Produto;${price};1`)).rows[0].errors.length).toBeGreaterThan(0));
    it.each(['-1', '1.5', 'Infinity', '1000000'])('rejects invalid stock %s', stock => expect(reviewCSV(csv(`AB;Produto;1,00;${stock}`)).rows[0].errors.length).toBeGreaterThan(0));
    it('accepts BOM and Windows line endings', () => expect(reviewCSV('\uFEFF' + validSample.replaceAll('\n', '\r\n')).rows.every(r => !r.errors.length)).toBe(true));
    it('rejects wrong headers', () => expect(reviewCSV('sku,name,price,stock').fatal).toBeTruthy());
    it('rejects header without rows', () => expect(reviewCSV('sku;nome;preco;estoque').fatal).toBeTruthy());
    it('rejects multiline and quoted fields in this dialect', () => expect(reviewCSV(csv('AB;"Nome;composto";1,00;1')).rows[0].errors.length).toBeGreaterThan(0));
    it('blocks formula-like names', () => expect(reviewCSV(csv('AB;=SUM(A1);1,00;1')).rows[0].errors.length).toBeGreaterThan(0));
    it('counts UTF-8 bytes', () => expect(reviewCSV('á'.repeat(25001)).fatal).toContain('50 KB'));
    it('rejects more than 200 rows', () => expect(reviewCSV(csv(Array(201).fill('AB;Produto;1,00;1').join('\n'))).fatal).toContain('200'));
    it('preserves physical line numbers for blank rows', () => expect(reviewCSV(csv('AB;Produto;1,00;1\n\nCD;Outro;2,00;2')).rows[1]).toMatchObject({ line: 3 }));
    it('refuses partial or empty export', () => { expect(() => exportProducts(reviewCSV(errorSample))).toThrow(); expect(() => exportProducts({ rows: [] })).toThrow(); });
});
