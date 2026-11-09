import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { reviewCSV, exportProducts, errorSample, validSample, MAX_BYTES, type Review } from './import';
import './style.css';
function App() {
    const [source, setSource] = useState(errorSample), [review, setReview] = useState<Review | null>(null), [filter, setFilter] = useState(false), [notice, setNotice] = useState(''), [loading, setLoading] = useState(false);
    const summary = useRef<HTMLHeadingElement>(null), input = useRef<HTMLTextAreaElement>(null), request = useRef(0);
    function change(value: string) { request.current++; setLoading(false); setSource(value); setReview(null); setNotice(''); setFilter(false); }
    function validate() { setReview(reviewCSV(source)); setNotice(''); requestAnimationFrame(() => summary.current?.focus()); }
    async function upload(file?: File) {
        if (!file)
            return;
        const token = ++request.current;
        setReview(null);
        setNotice('');
        setLoading(true);
        try {
            if (file.size > MAX_BYTES)
                throw Error('Arquivo excede 50 KB.');
            const text = await file.text();
            if (token === request.current)
                change(text);
        }
        catch (e) {
            if (token === request.current)
                setNotice(e instanceof Error ? e.message : 'Não foi possível ler o arquivo.');
        }
        finally {
            if (token === request.current)
                setLoading(false);
        }
    }
    const invalid = review?.rows.filter(r => r.errors.length).length ?? 0;
    const ready = !!review && !review.fatal && review.rows.length > 0 && invalid === 0;
    function download() { if (!review)
        return; try {
        const url = URL.createObjectURL(new Blob([exportProducts(review)], { type: 'application/json' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'produtos-validados.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setNotice('JSON exportado. Nenhum produto foi cadastrado em um sistema.');
    }
    catch {
        setNotice('Revise os dados antes de exportar.');
    } }
    return <><header><a className="brand" href="#main"><span className="mark">M/S</span> Marcos Solutions</a><span className="tag">ESTUDO 05 · FRONT-END</span></header><main id="main"><section className="intro"><p className="eyebrow">DADOS MELHORES, ANTES DO CADASTRO</p><h1>Importa Clara<span>.</span></h1><p>Revise seu catálogo antes de importar.<br />Encontre erros por linha e prepare um lote consistente.</p><span className="demo">Demonstração local · dados fictícios</span></section><div className="workspace"><section className="card editor"><div className="section-title"><span className="number">01</span><div><h2>Prepare o arquivo</h2><p>CSV separado por ponto e vírgula</p></div></div><div className="samples"><button onClick={() => change(errorSample)}>Exemplo com erros</button><button onClick={() => change(validSample)}>Exemplo corrigido</button></div><label htmlFor="file">Carregar CSV do computador</label><input id="file" type="file" accept=".csv,text/csv" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }} aria-describedby="rules"/><label htmlFor="csv">Conteúdo do CSV</label><textarea ref={input} id="csv" value={source} onChange={e => change(e.target.value)} spellCheck={false} aria-describedby="rules"/><p id="rules" className="hint">Até 200 produtos e 50 KB. Cabeçalho exato: <code>sku;nome;preco;estoque</code>. Preço como 29,90. Sem campos entre aspas, quebras de linha ou “;” dentro dos valores.</p><button className="primary" disabled={loading} onClick={validate}>{loading ? 'Lendo arquivo…' : 'Validar catálogo →'}</button></section><section className="card results"><div className="section-title"><span className="number">02</span><div><h2 ref={summary} tabIndex={-1}>Revisão do lote</h2><p>Corrija a origem, depois valide novamente</p></div></div>{!review ? <div className="empty"><span className="empty-icon">↗</span><h3>Um cadastro começa com bons dados.</h3><p>Valide o exemplo ao lado para encontrar preços inválidos, SKUs repetidos e campos incompletos.</p></div> : <><div className="stats"><div><strong>{review.rows.length}</strong><span>linhas lidas</span></div><div><strong>{invalid}</strong><span>com erros</span></div><div><strong>{review.rows.length - invalid}</strong><span>válidas</span></div></div>{review.fatal ? <p role="alert" className="error">{review.fatal}</p> : <><p className={ready ? 'success' : 'error'} role="status">{ready ? 'Lote validado. Pronto para exportar.' : `${invalid} linha(s) precisam de correção. Exportação bloqueada.`}</p><label className="checkbox"><input type="checkbox" checked={filter} onChange={e => setFilter(e.target.checked)}/> Mostrar somente linhas com erros</label><div className="rows">{review.rows.filter(r => !filter || r.errors.length).map(r => <article key={r.line} className={'row ' + (r.errors.length ? 'bad' : 'good')}><div><strong>Linha {r.line} · {r.cells[0] || 'Sem SKU'}</strong><span>{r.errors.length ? 'Revisar' : 'Válida'}</span></div><p>{r.cells[1] || 'Nome não informado'}</p>{r.errors.length > 0 && <ul>{r.errors.map(e => <li key={e}>{e}</li>)}</ul>}</article>)}{filter && invalid === 0 && <p>Nenhuma linha com erro.</p>}</div></>}<div className="actions"><button onClick={() => input.current?.focus()}>Voltar ao conteúdo</button><button className="primary" disabled={!ready} onClick={download}>Exportar JSON</button></div></>}</section></div><p className="notice" role="status">{notice}</p><footer><strong>Seus dados ficam nesta página.</strong> Sem envio para servidor, sem persistência e sem cadastro real.</footer></main></>;
}
createRoot(document.getElementById('root')!).render(<App />);
