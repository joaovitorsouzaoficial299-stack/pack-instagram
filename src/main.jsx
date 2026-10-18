import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Search, Sparkles, Heart, ArrowUpRight, Instagram, Palette, Type, Download, RotateCcw, Check, LayoutGrid } from 'lucide-react'
import './style.css'

const packs = [
  { id: 1, name: 'Marca com Personalidade', category: 'Negócios', price: 'Grátis', color: '#ff6b6b', bg: 'linear-gradient(145deg,#ff6b6b,#ff9f68)', tag: 'Mais usado', title: 'SUA MARCA\nEM DESTAQUE', subtitle: 'Sua ideia merece ser vista.', shape: 'circle' },
  { id: 2, name: 'Rotina Leve', category: 'Lifestyle', price: 'Grátis', color: '#a78bfa', bg: 'linear-gradient(145deg,#a78bfa,#f0abfc)', tag: 'Novo', title: 'VIVA NO\nSEU RITMO', subtitle: 'Pequenos momentos, grandes memórias.', shape: 'blob' },
  { id: 3, name: 'Menu Delícia', category: 'Gastronomia', price: 'Grátis', color: '#fb923c', bg: 'linear-gradient(145deg,#fb923c,#facc15)', tag: 'Popular', title: 'FEITO COM\nCARINHO', subtitle: 'Sabor que dá vontade de voltar.', shape: 'circle' },
  { id: 4, name: 'Agenda Cheia', category: 'Beleza', price: 'Grátis', color: '#f472b6', bg: 'linear-gradient(145deg,#f472b6,#fb7185)', tag: 'Favorito', title: 'SEU MOMENTO\nDE BRILHAR', subtitle: 'Reserve um tempinho para você.', shape: 'blob' },
  { id: 5, name: 'Ideias em Movimento', category: 'Criadores', price: 'Grátis', color: '#2dd4bf', bg: 'linear-gradient(145deg,#2dd4bf,#60a5fa)', tag: 'Criativo', title: 'CRIE. POSTE.\nINSPIRE.', subtitle: 'Sua próxima grande ideia começa aqui.', shape: 'circle' },
  { id: 6, name: 'Estudo Colorido', category: 'Educação', price: 'Grátis', color: '#818cf8', bg: 'linear-gradient(145deg,#818cf8,#67e8f9)', tag: 'Em alta', title: 'APRENDER\nPODE SER LEVE', subtitle: 'Um passo de cada vez.', shape: 'blob' },
]

const categories = ['Todos', 'Negócios', 'Lifestyle', 'Gastronomia', 'Beleza', 'Criadores', 'Educação']

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(packs[0])
  const [favorites, setFavorites] = useState([])
  const [customTitle, setCustomTitle] = useState(packs[0].title)
  const [customSubtitle, setCustomSubtitle] = useState(packs[0].subtitle)
  const [customColor, setCustomColor] = useState(packs[0].color)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => packs.filter(pack =>
    (activeCategory === 'Todos' || pack.category === activeCategory) &&
    (pack.name.toLowerCase().includes(query.toLowerCase()) || pack.category.toLowerCase().includes(query.toLowerCase()))
  ), [activeCategory, query])

  function choosePack(pack) {
    setSelected(pack)
    setCustomTitle(pack.title)
    setCustomSubtitle(pack.subtitle)
    setCustomColor(pack.color)
    setNotice('')
  }

  function downloadDesign() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${customColor}"/><stop offset="1" stop-color="#fff0dc"/></linearGradient></defs><rect width="1080" height="1080" rx="40" fill="url(#g)"/><circle cx="880" cy="180" r="170" fill="#ffffff" opacity=".2"/><circle cx="160" cy="930" r="230" fill="#ffffff" opacity=".16"/><text x="90" y="440" font-family="Arial,sans-serif" font-weight="900" font-size="96" fill="#251b2e">${escapeXml(customTitle.split('\n')[0])}</text><text x="90" y="550" font-family="Arial,sans-serif" font-weight="900" font-size="96" fill="#251b2e">${escapeXml(customTitle.split('\n')[1] || '')}</text><text x="95" y="650" font-family="Arial,sans-serif" font-size="32" fill="#251b2e">${escapeXml(customSubtitle)}</text><text x="95" y="970" font-family="Arial,sans-serif" font-size="24" fill="#251b2e" opacity=".7">FEITO COM PACKÊ ✦</text></svg>`
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'meu-post-packe.svg'
    a.click()
    URL.revokeObjectURL(url)
    setNotice('Seu design foi baixado em SVG. Você pode abrir e converter para PNG se precisar.')
  }

  function escapeXml(value = '') {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Packê início"><span className="brand-mark"><Sparkles size={21} /></span><span>packê<span className="brand-dot">.</span></span></a>
      <nav className="main-nav"><a className="nav-active" href="#catalogo">Explorar packs</a><a href="#editor">Editor</a><a href="#como-funciona">Como funciona</a></nav>
      <button className="top-cta" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Começar grátis <ArrowUpRight size={16} /></button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> SEU INSTAGRAM, SUA VIBE</div>
          <h1>Ideias incríveis.<br /><span>Posts com sua cara.</span></h1>
          <p>Encontre packs criativos, personalize do seu jeito e deixe seu feed com a sua personalidade. Sem complicação.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Explorar packs <ArrowUpRight size={18} /></button><span className="free-note"><Check size={15} /> Comece de graça</span></div>
          <div className="hero-proof"><div className="avatar-stack"><span>🎨</span><span>💖</span><span>✨</span></div><div><strong>Seu próximo post começa aqui</strong><small>Inspire-se. Personalize. Publique.</small></div></div>
        </div>
        <div className="hero-art" aria-label="Exemplos coloridos de posts para Instagram">
          <div className="sticker sticker-spark">✦</div><div className="sticker sticker-heart">♥</div>
          <div className="poster poster-back"><span className="poster-mini">IDEIAS QUE</span><strong>VIRAM<br />CONTEÚDO</strong><span className="poster-bottom">✳ CRIATIVIDADE TODO DIA</span></div>
          <div className="poster poster-front"><div className="poster-pill">SEU NOVO FAVORITO</div><div className="poster-sun">✺</div><strong>CRIE<br />DO SEU<br /><em>JEITO.</em></strong><span className="poster-footer">um post de cada vez ↗</span></div>
          <div className="hero-caption"><span className="caption-icon"><Palette size={17} /></span><span><b>100% personalizável</b><small>Cores, textos e muito mais</small></span></div>
        </div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="section-heading"><div><div className="eyebrow">UM MUNDO DE POSSIBILIDADES</div><h2>Qual é a sua vibe hoje?</h2><p>Escolha um pack e transforme sua ideia em post.</p></div><div className="catalog-count"><span>{filtered.length.toString().padStart(2, '0')}</span> packs para explorar</div></div>
        <div className="catalog-tools"><div className="category-tabs">{categories.map(category => <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar um pack..." aria-label="Buscar um pack" /></label></div>
        <div className="pack-grid">{filtered.map(pack => <article className="pack-card" key={pack.id}>
          <button className="favorite-btn" aria-label={favorites.includes(pack.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => setFavorites(old => old.includes(pack.id) ? old.filter(id => id !== pack.id) : [...old, pack.id])}><Heart size={17} fill={favorites.includes(pack.id) ? 'currentColor' : 'none'} /></button>
          <button className="pack-preview-button" onClick={() => choosePack(pack)} aria-label={'Editar pack ' + pack.name}><div className="pack-art" style={{ background: pack.bg }}><span className="pack-tag">{pack.tag}</span><span className="pack-deco">{pack.shape === 'circle' ? '✳' : '✦'}</span><strong>{pack.title.split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</strong><small>{pack.subtitle}</small><span className="art-brand">PACKÊ ✦</span></div></button>
          <div className="pack-info"><div><h3>{pack.name}</h3><p>{pack.category}</p></div><span className="price-label">{pack.price}</span></div>
          <button className="edit-pack-btn" onClick={() => { choosePack(pack); document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' }) }}>Personalizar <ArrowUpRight size={15} /></button>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><Search size={28} /><h3>Nenhum pack por aqui</h3><p>Tente outra busca ou categoria.</p><button onClick={() => { setQuery(''); setActiveCategory('Todos') }}>Limpar filtros</button></div>}
      </section>

      <section className="editor-section" id="editor">
        <div className="section-heading editor-heading"><div><div className="eyebrow">SEU TOQUE FINAL</div><h2>Deixe com a sua cara.</h2><p>Teste as mudanças ao vivo e crie uma versão sua.</p></div><div className="editor-badge"><Sparkles size={16} /> Editor inicial</div></div>
        <div className="editor-layout">
          <div className="editor-preview-wrap"><div className="preview-toolbar"><span><span className="live-dot" /> PRÉVIA AO VIVO</span><span>Post quadrado · 1:1</span></div><div className="editor-canvas" style={{ background: `linear-gradient(145deg, ${customColor}, #fff0dc)` }}><span className="canvas-orb orb-one" /><span className="canvas-orb orb-two" /><span className="canvas-star">✦</span><div className="canvas-content"><strong>{customTitle.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line || 'SUA IDEIA'}</React.Fragment>)}</strong><p>{customSubtitle || 'Escreva uma frase que tenha a sua cara.'}</p><span className="canvas-brand">FEITO COM PACKÊ ✦</span></div></div><div className="preview-foot"><span><Check size={15} /> Alterações aparecem na hora</span><button onClick={() => { setCustomTitle(selected.title); setCustomSubtitle(selected.subtitle); setCustomColor(selected.color); setNotice('') }}><RotateCcw size={14} /> Restaurar</button></div></div>
          <div className="editor-controls"><div className="control-title"><div className="control-icon"><LayoutGrid size={18} /></div><div><h3>Personalize seu post</h3><p>Escolha um pack para começar</p></div></div><label className="field-label">PACK BASE</label><select className="pack-select" value={selected.id} onChange={e => choosePack(packs.find(p => p.id === Number(e.target.value)))}>{packs.map(pack => <option key={pack.id} value={pack.id}>{pack.name}</option>)}</select>
            <label className="field-label" htmlFor="post-title"><Type size={14} /> TEXTO PRINCIPAL</label><textarea id="post-title" className="text-field title-field" rows="2" maxLength="70" value={customTitle} onChange={e => setCustomTitle(e.target.value)} /><label className="field-label" htmlFor="post-subtitle">SUBTÍTULO</label><input id="post-subtitle" className="text-field" maxLength="100" value={customSubtitle} onChange={e => setCustomSubtitle(e.target.value)} placeholder="Sua frase aqui..." />
            <div className="color-label-row"><label className="field-label">COR DE DESTAQUE</label><span className="color-hex">{customColor.toUpperCase()}</span></div><div className="color-options">{['#ff6b6b','#a78bfa','#fb923c','#f472b6','#2dd4bf','#818cf8','#facc15','#202033'].map(color => <button key={color} className={customColor === color ? 'color-swatch selected' : 'color-swatch'} style={{ background: color }} aria-label={'Selecionar cor ' + color} onClick={() => setCustomColor(color)}>{customColor === color && <Check size={15} color={color === '#facc15' ? '#202033' : '#fff'} />}</button>)}</div>
            <button className="download-btn" onClick={downloadDesign}><Download size={17} /> Baixar meu design <ArrowUpRight size={17} /></button>{notice && <p className="notice"><Check size={15} /> {notice}</p>}<p className="editor-disclaimer">Esta é a primeira versão do editor. O download atual é SVG; exportação PNG e salvamento de projetos podem entrar nas próximas etapas.</p>
          </div>
        </div>
      </section>

      <section className="how-section" id="como-funciona"><div className="eyebrow">SEM MISTÉRIO</div><h2>Do “tive uma ideia” ao post pronto.</h2><div className="steps-grid"><div className="step-card"><span>01</span><div className="step-icon">🧃</div><h3>Escolha seu pack</h3><p>Encontre um estilo que combina com seu perfil e seu momento.</p></div><div className="step-card"><span>02</span><div className="step-icon">🎨</div><h3>Coloque sua vibe</h3><p>Edite o texto e experimente cores até ficar do seu jeito.</p></div><div className="step-card"><span>03</span><div className="step-icon">📲</div><h3>Leve para o feed</h3><p>Baixe sua criação e prepare o próximo post com personalidade.</p></div></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#"><span className="brand-mark"><Sparkles size={18} /></span><span>packê<span className="brand-dot">.</span></span></a><span>Feito para suas ideias brilharem ✦</span><span>© 2026 Packê · Projeto em construção</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
