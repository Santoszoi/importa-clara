export type Product = {
    sku: string;
    name: string;
    priceCents: number;
    stock: number;
};
export type Row = {
    line: number;
    cells: string[];
    errors: string[];
    product?: Product;
};
export type Review = {
    rows: Row[];
    fatal?: string;
};
export const MAX_BYTES = 50000;
export const validSample = 'sku;nome;preco;estoque\nCAB-01;Cabo USB;29,90;12\nMOU-02;Mouse sem fio;89,90;8\nSUP-03;Suporte notebook;120,00;0';
export const errorSample = 'sku;nome;preco;estoque\nCAB-01;Cabo USB;29,90;12\nMOU-02;Mouse sem fio;-89,90;8\nCAB-01;Cabo reserva;19,90;3\nSUP-03;;120,00;2.5';
// Deliberately narrow CSV dialect: semicolon, no quoting or embedded line breaks.
export function reviewCSV(text: string): Review {
    if (new TextEncoder().encode(text).length > MAX_BYTES)
        return { rows: [], fatal: 'Limite de 50 KB excedido.' };
    const lines = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trimEnd().split('\n');
    if (lines[0]?.trim() !== 'sku;nome;preco;estoque')
        return { rows: [], fatal: 'Cabeçalho esperado: sku;nome;preco;estoque' };
    if (lines.length < 2)
        return { rows: [], fatal: 'Inclua ao menos um produto.' };
    if (lines.length > 201)
        return { rows: [], fatal: 'Limite de 200 produtos excedido.' };
    const rows: Row[] = lines.slice(1).map((line, i) => {
        const cells = line.split(';').map(x => x.trim());
        const errors: string[] = [];
        const [sku = '', name = '', price = '', stock = ''] = cells;
        if (cells.length !== 4 || line.includes('"'))
            errors.push('Use 4 colunas, sem aspas ou ponto e vírgula dentro dos campos.');
        if (!/^[A-Z0-9][A-Z0-9-]{1,19}$/.test(sku))
            errors.push('SKU: 2 a 20 letras maiúsculas, números ou hífen.');
        if (name.length < 2 || name.length > 80 || /^[=+@-]/.test(name))
            errors.push('Nome: 2 a 80 caracteres, sem prefixo de fórmula.');
        const priceOK = /^\d{1,6},\d{2}$/.test(price);
        const [whole, decimal] = price.split(',');
        const priceCents = priceOK ? Number(whole) * 100 + Number(decimal) : 0;
        if (!priceOK || priceCents <= 0)
            errors.push('Preço: valor positivo como 29,90, sem separador de milhar.');
        if (!/^\d{1,6}$/.test(stock))
            errors.push('Estoque: inteiro de 0 a 999999.');
        return { line: i + 2, cells, errors, product: errors.length ? undefined : { sku, name, priceCents, stock: Number(stock) } };
    });
    const counts = new Map<string, number>();
    for (const r of rows)
        counts.set(r.cells[0], (counts.get(r.cells[0]) ?? 0) + 1);
    for (const r of rows)
        if (r.cells[0] && counts.get(r.cells[0])! > 1) {
            r.errors.push('SKU repetido neste arquivo.');
            delete r.product;
        }
    return { rows };
}
export function exportProducts(review: Review): string {
    if (review.fatal || !review.rows.length || review.rows.some(r => r.errors.length || !r.product))
        throw new Error('Corrija todas as linhas antes de exportar.');
    return JSON.stringify({ schemaVersion: 1, products: review.rows.map(r => r.product) }, null, 2);
}
