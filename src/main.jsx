import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import JSZip from 'jszip'
import { Search, Sparkles, Heart, ArrowUpRight, Palette, Type, Download, RotateCcw, Check, LayoutGrid, ImagePlus, Plus, Trash2, BringToFront, Upload, Smartphone, Square, Layers, Move, RotateCw, FileArchive, X, WandSparkles } from 'lucide-react'
import './style.css'

const packs = [
  { id: 'brand-pop', name: 'Marca com Personalidade', niche: 'Negócios', style: 'Vibrante', format: 'Feed', price: 0, color: '#ff6b6b', title: 'SUA MARCA\nEM DESTAQUE', subtitle: 'Sua ideia merece ser vista.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85' },
  { id: 'routine-soft', name: 'Rotina Leve', niche: 'Lifestyle', style: 'Pastel', format: 'Stories', price: 0, color: '#a78bfa', title: 'VIVA NO\nSEU RITMO', subtitle: 'Pequenos momentos, grandes memórias.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=85' },
  { id: 'menu-delicia', name: 'Menu Delícia', niche: 'Gastronomia', style: 'Vibrante', format: 'Feed', price: 0, color: '#fb923c', title: 'FEITO COM\nCARINHO', subtitle: 'Sabor que dá vontade de voltar.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=85' },
  { id: 'agenda-cheia', name: 'Agenda Cheia', niche: 'Beleza', style: 'Elegante', format: 'Stories', price: 0, color: '#f472b6', title: 'SEU MOMENTO\nDE BRILHAR', subtitle: 'Reserve um tempinho para você.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85' },
  { id: 'creator-flow', name: 'Ideias em Movimento', niche: 'Criadores', style: 'Moderno', format: 'Carrossel', price: 0, color: '#2dd4bf', title: 'CRIE. POSTE.\nINSPIRE.', subtitle: 'Sua próxima grande ideia começa aqui.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85' },
  { id: 'study-color', name: 'Estudo Colorido', niche: 'Educação', style: 'Pastel', format: 'Feed', price: 0, color: '#818cf8', title: 'APRENDER\nPODE SER LEVE', subtitle: 'Um passo de cada vez.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85' },
  { id: 'fashion-editorial', name: 'Editorial Chic', niche: 'Moda', style: 'Elegante', format: 'Feed', price: 0, color: '#d9b8a6', title: 'MENOS, MAS\nMELHOR.', subtitle: 'Seu estilo fala antes de você.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85' },
  { id: 'fitness-energy', name: 'Energia em Foco', niche: 'Fitness', style: 'Vibrante', format: 'Stories', price: 0, color: '#c4f06b', title: 'HOJE É DIA\nDE SUPERAR', subtitle: 'Pequenos passos, grandes resultados.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85' },
  { id: 'real-estate', name: 'Espaço dos Sonhos', niche: 'Imóveis', style: 'Moderno', format: 'Carrossel', price: 0, color: '#86b7c9', title: 'SEU NOVO\nCOMEÇO', subtitle: 'Encontre o lugar que combina com você.', tag: 'Referência editável', photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85' },
]
const niches = ['Todos', 'Negócios', 'Lifestyle', 'Gastronomia', 'Beleza', 'Criadores', 'Educação', 'Moda', 'Fitness', 'Imóveis']
const styles = ['Todos', 'Vibrante', 'Pastel', 'Elegante', 'Moderno']
const formats = ['Feed', 'Stories', 'Carrossel']
const uid = () => Math.random().toString(36).slice(2, 10)
const escapeXml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
const makeLayers = (pack) => [
  ...(pack.photo ? [{ id: uid(), type: 'image', name: 'Foto de referência', src: pack.photo, x: 61, y: 28, w: 31, h: 42, rotation: 0, fit: 'cover', opacity: 1 }] : []),
  { id: uid(), type: 'shape', name: 'Forma decorativa', shape: 'circle', x: 69, y: 4, w: 27, h: 27, rotation: 0, color: '#ffffff', opacity: 0.35 },
  { id: uid(), type: 'text', name: 'Título', text: pack.title, x: 9, y: 31, w: 53, h: 24, rotation: 0, color: '#292336', fontSize: 7.1, fontFamily: 'Manrope', fontWeight: 900, align: 'left', opacity: 1 },
  { id: uid(), type: 'text', name: 'Subtítulo', text: pack.subtitle, x: 10, y: 58, w: 53, h: 12, rotation: 0, color: '#292336', fontSize: 2.5, fontFamily: 'DM Sans', fontWeight: 500, align: 'left', opacity: 1 },
  { id: uid(), type: 'text', name: 'Assinatura', text: 'SUA MARCA ✦', x: 10, y: 88, w: 48, h: 5, rotation: 0, color: '#292336', fontSize: 1.5, fontFamily: 'DM Sans', fontWeight: 800, align: 'left', opacity: 1 },
]
function App() {
  const [activeNiche, setActiveNiche] = useState('Todos')
  const [activeStyle, setActiveStyle] = useState('Todos')
  const [activeFormat, setActiveFormat] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(packs[0])
  const [favorites, setFavorites] = useState([])
  const [format, setFormat] = useState('Feed')
  const [layers, setLayers] = useState(() => makeLayers(packs[0]))
  const [selectedLayer, setSelectedLayer] = useState(null)
  const [notice, setNotice] = useState('')
  const [detailsPack, setDetailsPack] = useState(null)
  const [bgColor, setBgColor] = useState(packs[0].color)
  const [bgColor2, setBgColor2] = useState('#fff0dc')
  const [bgMode, setBgMode] = useState('gradient')
  const [designName, setDesignName] = useState('Minha criação')
  const [uploadedImages, setUploadedImages] = useState([])
  const [carouselCount, setCarouselCount] = useState(3)
  const [autoNiche, setAutoNiche] = useState('Negócios')
  const [autoStyle, setAutoStyle] = useState('Moderno')
  const [autoFormat, setAutoFormat] = useState('Feed')
  const canvasRef = useRef(null)
  const fileRef = useRef(null)
  const logoRef = useRef(null)
  const actionRef = useRef(null)
  const replaceTargetRef = useRef(null)

  const filtered = useMemo(() => packs.filter(pack =>
    (activeNiche === 'Todos' || pack.niche === activeNiche) &&
    (activeStyle === 'Todos' || pack.style === activeStyle) &&
    (activeFormat === 'Todos' || pack.format === activeFormat) &&
    (pack.name.toLowerCase().includes(query.toLowerCase()) || pack.niche.toLowerCase().includes(query.toLowerCase()) || pack.style.toLowerCase().includes(query.toLowerCase()))
  ), [activeNiche, activeStyle, activeFormat, query])
  const currentLayer = layers.find(layer => layer.id === selectedLayer) || null
  const ratio = format === 'Stories' ? '9 / 16' : '1 / 1'
  const canvasHeight = format === 'Stories' ? 560 : 440

  function choosePack(pack) {
    setSelected(pack)
    setBgColor(pack.color)
    setBgColor2('#fff0dc')
    setLayers(makeLayers(pack))
    setSelectedLayer(null)
    setFormat(pack.format)
    setDesignName(pack.name)
    setNotice('')
    document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })
  }
  function updateLayer(id, changes) {
    setLayers(old => old.map(layer => layer.id === id ? { ...layer, ...changes } : layer))
  }
  function addText() {
    const layer = { id: uid(), type: 'text', name: 'Novo texto', text: 'Escreva aqui', x: 25, y: 42, w: 55, h: 12, rotation: 0, color: '#292336', fontSize: 5, fontFamily: 'DM Sans', fontWeight: 700, align: 'center' }
    setLayers(old => [...old, layer])
    setSelectedLayer(layer.id)
  }
  function addShape() {
    const layer = { id: uid(), type: 'shape', name: 'Forma', shape: 'rounded', x: 36, y: 35, w: 25, h: 25, rotation: 0, color: '#ffffff', opacity: 0.55 }
    setLayers(old => [...old, layer])
    setSelectedLayer(layer.id)
  }
  function generatePack() {
    const base = packs.find(p => p.niche === autoNiche && p.format === autoFormat) || packs.find(p => p.niche === autoNiche) || packs[0]
    const copy = {
      'Negócios': ['SUA MARCA\nMAIS FORTE', 'Mostre o valor do que você faz.'],
      'Lifestyle': ['VIVA MAIS\nLEVE', 'Inspire uma rotina com a sua cara.'],
      'Gastronomia': ['SABOR QUE\nMARCA', 'Feito para dar água na boca.'],
      'Beleza': ['SEU MELHOR\nMOMENTO', 'Realce a beleza em cada detalhe.'],
      'Criadores': ['IDEIA BOA\nVIRA POST', 'Conte histórias que merecem atenção.'],
      'Educação': ['APRENDA\nALGO NOVO', 'Conhecimento em passos simples.'],
      'Moda': ['SEU ESTILO.\nSUA HISTÓRIA.', 'Vista a ideia que combina com você.'],
      'Fitness': ['UM DIA DE\nCADA VEZ', 'Constância também é conquista.'],
      'Imóveis': ['UM LUGAR\nPARA CHAMAR DE SEU', 'Novos espaços, novas possibilidades.'],
    }[autoNiche] || ['SUA IDEIA\nEM DESTAQUE', 'Conteúdo com a identidade da sua marca.']
    const palettes = { 'Vibrante': ['#ff6b6b', '#ffe2b8'], 'Pastel': ['#c9b8f4', '#fff0dc'], 'Elegante': ['#d9b8a6', '#f7e9df'], 'Moderno': ['#253b4a', '#c5e2dc'] }
    const palette = palettes[autoStyle] || palettes.Moderno
    const generated = { ...base, format: autoFormat, style: autoStyle, title: copy[0], subtitle: copy[1], color: palette[0], tag: 'Pack gerado' }
    setSelected(generated); setDesignName('Pack ' + autoNiche); setBgColor(palette[0]); setBgColor2(palette[1]); setBgMode(autoStyle === 'Elegante' ? 'solid' : 'gradient'); setFormat(autoFormat)
    const newLayers = makeLayers(generated)
    const accent = { id: uid(), type: 'shape', name: 'Forma de destaque', shape: ['circle','rounded','triangle','star'][Math.floor(Math.random() * 4)], x: 72, y: 5, w: 21, h: 21, rotation: Math.floor(Math.random() * 30) - 15, color: '#ffffff', opacity: 0.42 }
    setLayers([...newLayers, accent]); setSelectedLayer(null)
    setNotice('Pack criado. Edite os elementos ou troque a foto antes de exportar.')
  }
  function addImage(file, type = 'image', replaceId = null) {
    if (!file) return
    if (!file.type.startsWith('image/')) { setNotice('Escolha um arquivo de imagem válido.'); return }
    if (file.size > 8 * 1024 * 1024) { setNotice('A imagem precisa ter até 8 MB.'); return }
    const reader = new FileReader()
    reader.onload = () => {
      const existing = replaceId ? layers.find(item => item.id === replaceId) : null
      const layer = { id: replaceId || uid(), type: 'image', name: type === 'logo' ? 'Logotipo' : (existing?.name || file.name.replace(/\.[^.]+$/, '')), src: reader.result, x: existing?.x ?? (type === 'logo' ? 8 : 27), y: existing?.y ?? (type === 'logo' ? 6 : 27), w: existing?.w ?? (type === 'logo' ? 22 : 46), h: existing?.h ?? (type === 'logo' ? 10 : 42), rotation: existing?.rotation ?? 0, fit: existing?.fit || 'contain', opacity: existing?.opacity ?? 1 }
      setLayers(old => replaceId ? old.map(item => item.id === replaceId ? layer : item) : [...old, layer])
      setSelectedLayer(layer.id)
      setNotice(type === 'logo' ? 'Logotipo adicionado. Você pode mover e redimensionar.' : 'Imagem adicionada. Você pode mover e redimensionar.')
    }
    reader.readAsDataURL(file)
  }
  function replaceImage(layer) {
    replaceTargetRef.current = layer.id
    ;(layer.name === 'Logotipo' ? logoRef : fileRef).current?.click()
  }
  function startAction(event, layer, mode = 'move') {
    event.preventDefault()
    event.stopPropagation()
    setSelectedLayer(layer.id)
    const rect = canvasRef.current.getBoundingClientRect()
    actionRef.current = { id: layer.id, mode, startX: event.clientX, startY: event.clientY, x: layer.x, y: layer.y, w: layer.w, h: layer.h, rect }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  function moveAction(event) {
    const action = actionRef.current
    if (!action) return
    const dx = (event.clientX - action.startX) / action.rect.width * 100
    const dy = (event.clientY - action.startY) / action.rect.height * 100
    if (action.mode === 'resize') {
      updateLayer(action.id, { w: Math.max(5, Math.min(100 - action.x, action.w + dx)), h: Math.max(3, Math.min(100 - action.y, action.h + dy)) })
    } else {
      updateLayer(action.id, { x: Math.max(0, Math.min(100 - action.w, action.x + dx)), y: Math.max(0, Math.min(100 - action.h, action.y + dy)) })
    }
  }
  function endAction() { actionRef.current = null }
  useEffect(() => {
    window.addEventListener('pointermove', moveAction)
    window.addEventListener('pointerup', endAction)
    return () => { window.removeEventListener('pointermove', moveAction); window.removeEventListener('pointerup', endAction) }
  })
  function svgMarkup(slide = 1, sourceLayers = layers, targetFormat = format) {
    const width = 1080
    const height = targetFormat === 'Stories' ? 1920 : 1080
    const background = bgMode === 'solid' ? '<rect width="100%" height="100%" fill="' + bgColor + '"/>' : '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' + bgColor + '"/><stop offset="1" stop-color="' + bgColor2 + '"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg)"/>'
    const contents = sourceLayers.map(layer => {
      const x = layer.x / 100 * width
      const y = layer.y / 100 * height
      const w = layer.w / 100 * width
      const h = layer.h / 100 * height
      const transform = ' transform="rotate(' + layer.rotation + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')"'
      if (layer.type === 'shape') {
        const opacity = layer.opacity == null ? 1 : layer.opacity
        if (layer.shape === 'rect' || layer.shape === 'rounded') return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (layer.shape === 'rounded' ? Math.min(w, h) * 0.16 : 0) + '" fill="' + layer.color + '" opacity="' + opacity + '"' + transform + '/>'
        if (layer.shape === 'triangle') return '<path d="M ' + (x+w/2) + ' ' + y + ' L ' + (x+w) + ' ' + (y+h) + ' L ' + x + ' ' + (y+h) + ' Z" fill="' + layer.color + '" opacity="' + opacity + '"' + transform + '/>'
        if (layer.shape === 'star') { const pts = Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5;const r=i%2===0?Math.min(w,h)/2:Math.min(w,h)/4;return (x+w/2+Math.cos(a)*r)+','+(y+h/2+Math.sin(a)*r)}).join(' '); return '<polygon points="' + pts + '" fill="' + layer.color + '" opacity="' + opacity + '"' + transform + '/>' }
        if (layer.shape === 'line') return '<path d="M ' + x + ' ' + (y+h/2) + ' L ' + (x+w) + ' ' + (y+h/2) + '" stroke="' + layer.color + '" stroke-width="' + Math.max(4,h*0.08) + '" opacity="' + opacity + '"' + transform + '/>'
        return '<ellipse cx="' + (x + w / 2) + '" cy="' + (y + h / 2) + '" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + layer.color + '" opacity="' + opacity + '"' + transform + '/>'
      }
      if (layer.type === 'image') return '<image href="' + layer.src + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" opacity="' + (layer.opacity == null ? 1 : layer.opacity) + '" preserveAspectRatio="' + (layer.fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet') + '"' + transform + '/>'
      const lines = String(layer.text || '').split('\n')
      const fontSize = layer.fontSize / 100 * width * 1.05
      const lineHeight = fontSize * 1.05
      const anchor = layer.align === 'center' ? 'middle' : layer.align === 'right' ? 'end' : 'start'
      const tx = layer.align === 'center' ? x + w / 2 : layer.align === 'right' ? x + w : x
      return '<g opacity="' + (layer.opacity == null ? 1 : layer.opacity) + '"' + transform + '>' + lines.map((line, i) => '<text x="' + tx + '" y="' + (y + fontSize + i * lineHeight) + '" font-family="' + escapeXml(layer.fontFamily || 'DM Sans') + ',Arial,sans-serif" font-size="' + fontSize + '" font-weight="' + (layer.fontWeight || 600) + '" text-anchor="' + anchor + '" fill="' + (layer.color || '#292336') + '">' + escapeXml(line) + '</text>').join('') + '</g>'
    }).join('')
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '">' + background + contents + '</svg>'
  }
  async function inlineRemoteImages(sourceLayers = layers) {
    return Promise.all(sourceLayers.map(async layer => {
      if (layer.type !== 'image' || !/^https?:\/\//i.test(layer.src || '')) return layer
      const response = await fetch(layer.src, { mode: 'cors' })
      if (!response.ok) throw new Error('A fotografia não pôde ser carregada para exportação.')
      const blob = await response.blob()
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      return { ...layer, src: dataUrl }
    }))
  }
  async function makePngBlob(sourceLayers = layers, targetFormat = format) {
    const exportLayers = await inlineRemoteImages(sourceLayers)
    const svg = svgMarkup(1, exportLayers, targetFormat)
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    try {
      const img = new Image()
      img.src = url
      await img.decode()
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = targetFormat === 'Stories' ? 1920 : 1080
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    } finally { URL.revokeObjectURL(url) }
  }
  async function downloadPng() {
    try {
      const blob = await makePngBlob()
      if (!blob) throw new Error('Não foi possível gerar PNG')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (designName || 'packe-design').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png'
      a.click()
      URL.revokeObjectURL(url)
      setNotice('PNG exportado em alta resolução (1080 px).')
    } catch (error) { setNotice('Não foi possível exportar esta arte. Tente remover a imagem e adicioná-la novamente.') }
  }
  async function downloadZip() {
    try {
      const zip = new JSZip()
      const exportLayers = await inlineRemoteImages(layers)
      const png = await makePngBlob(exportLayers, format)
      zip.file('arte-principal.png', png)
      zip.file('arte-editavel.svg', svgMarkup(1, exportLayers, format))
      zip.file('projeto-packe.json', JSON.stringify({ name: designName, format, background: { color: bgColor, color2: bgColor2, mode: bgMode }, layers: exportLayers }, null, 2))
      if (format === 'Carrossel') {
        const titles = [selected.title, 'O QUE VOCÊ PRECISA SABER', 'COMO COLOCAR EM PRÁTICA', '3 DICAS PARA COMEÇAR', 'SALVE PARA CONSULTAR', 'COMPARTILHE COM ALGUÉM']
        const subtitles = [selected.subtitle, 'Separe o que importa e vá direto ao ponto.', 'Pequenas ações já ajudam a dar o primeiro passo.', 'Use estas ideias como ponto de partida.', 'Volte a este conteúdo quando precisar.', 'Envie para quem também pode aproveitar.']
        for (let i = 1; i <= carouselCount; i++) {
          const slideLayers = exportLayers.map(layer => layer.type === 'text' && layer.name === 'Título' ? { ...layer, text: titles[(i - 1) % titles.length] } : layer.type === 'text' && layer.name === 'Subtítulo' ? { ...layer, text: subtitles[(i - 1) % subtitles.length] } : layer)
          const slidePng = await makePngBlob(slideLayers, 'Carrossel')
          const slideSvg = svgMarkup(i, slideLayers, 'Carrossel').replace('</svg>', '<text x="1000" y="1030" text-anchor="end" font-family="Arial" font-size="24" fill="#292336">' + i + '/' + carouselCount + '</text></svg>')
          zip.file('carrossel/slide-' + String(i).padStart(2, '0') + '.png', slidePng)
          zip.file('carrossel/slide-' + String(i).padStart(2, '0') + '.svg', slideSvg)
        }
      }
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (designName || 'packe-projeto').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.zip'
      a.click()
      URL.revokeObjectURL(url)
      setNotice('ZIP gerado com PNG, SVG editável e arquivo do projeto.')
    } catch (error) { setNotice('Não foi possível gerar o ZIP. Tente novamente.') }
  }
  function resetEditor() {
    setLayers(makeLayers(selected))
    setSelectedLayer(null)
    setBgColor(selected.color)
    setBgColor2('#fff0dc')
    setBgMode('gradient')
    setNotice('Modelo restaurado.')
  }
  function addToFavorites(pack) {
    setFavorites(old => old.includes(pack.id) ? old.filter(id => id !== pack.id) : [...old, pack.id])
  }
  function renderLayer(layer) {
    const selectedClass = selectedLayer === layer.id ? 'design-layer selected-layer' : 'design-layer'
    const style = { left: layer.x + '%', top: layer.y + '%', width: layer.w + '%', height: layer.h + '%', transform: 'rotate(' + layer.rotation + 'deg)', color: layer.color, fontSize: 'clamp(9px, ' + (layer.fontSize || 3) + 'cqw, 64px)', fontFamily: layer.fontFamily || 'DM Sans', fontWeight: layer.fontWeight || 600, textAlign: layer.align || 'left', opacity: layer.type === 'shape' ? 1 : (layer.opacity == null ? 1 : layer.opacity) }
    return <div key={layer.id} className={selectedClass} style={style} onPointerDown={e => startAction(e, layer)} onClick={e => { e.stopPropagation(); setSelectedLayer(layer.id) }} title="Arraste para mover">
      {layer.type === 'text' && <span className="layer-text">{layer.text}</span>}
      {layer.type === 'image' && <img draggable="false" src={layer.src} alt={layer.name} style={{ objectFit: layer.fit || 'contain' }} />}
      {layer.type === 'shape' && <span className={'layer-shape shape-' + (layer.shape || 'circle')} style={{ background: layer.color, opacity: layer.opacity == null ? 1 : layer.opacity }} />}
      {selectedLayer === layer.id && <><span className="layer-label">{layer.name}</span><button className="resize-handle" aria-label="Redimensionar elemento" onPointerDown={e => startAction(e, layer, 'resize')} /></>}
    </div>
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Packê início"><span className="brand-mark brand-letter">P</span><span>packê<span className="brand-dot">.</span></span></a>
      <nav className="main-nav"><a className="nav-active" href="#catalogo">Catálogo</a><a href="#editor">Editor</a><a href="#como-funciona">Como funciona</a></nav>
      <button className="top-cta" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Criar design <ArrowUpRight size={16} /></button>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> CRIAÇÃO DE CONTEÚDO PARA MARCAS</div><h1>Posts com a cara<br /><span>do seu negócio.</span></h1><p>Comece por uma referência visual, troque a foto e ajuste cada detalhe. Crie artes para Feed, Stories e carrosséis sem complicação.</p><div className="hero-actions"><button className="primary-btn" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Explorar modelos <ArrowUpRight size={18} /></button><span className="free-note"><Check size={15} /> Modelos de demonstração</span></div><div className="hero-proof"><div className="avatar-stack"><span>🎨</span><span>💖</span><span>✨</span></div><div><strong>Crie sem ficar preso ao modelo</strong><small>Mova · Redimensione · Personalize</small></div></div></div>
        <div className="hero-art hero-photo-collage" aria-label="Referências de fotografia para conteúdo de marcas">
          <div className="hero-photo hero-photo-main"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85" alt="Referência fotográfica de moda" /></div>
          <div className="hero-photo hero-photo-food"><img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=700&q=85" alt="Referência fotográfica de gastronomia" /></div>
          <div className="hero-photo hero-photo-work"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85" alt="Referência fotográfica para negócios" /></div>
          <div className="hero-caption"><span className="caption-icon"><Move size={17} /></span><span><b>Referências que você pode editar</b><small>Troque fotos, texto, formas e cores</small></span></div>
        </div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="section-heading"><div><div className="eyebrow">REFERÊNCIAS VISUAIS</div><h2>Encontre seu ponto de partida.</h2><p>Explore por nicho, estilo e formato. As imagens são referências visuais editáveis, não designs licenciados de outras marcas.</p></div><div className="catalog-count"><span>{filtered.length.toString().padStart(2, '0')}</span> modelos editáveis</div></div>
        <div className="catalog-filters">
          <label className="filter-select"><span>Nicho</span><select value={activeNiche} onChange={e => setActiveNiche(e.target.value)}>{niches.map(n => <option key={n}>{n}</option>)}</select></label>
          <label className="filter-select"><span>Estilo</span><select value={activeStyle} onChange={e => setActiveStyle(e.target.value)}>{styles.map(s => <option key={s}>{s}</option>)}</select></label>
          <label className="filter-select"><span>Formato</span><select value={activeFormat} onChange={e => setActiveFormat(e.target.value)}>{['Todos', ...formats].map(f => <option key={f}>{f}</option>)}</select></label>
          <label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar modelo..." aria-label="Buscar modelo" /></label>
        </div>
        <div className="pack-grid">{filtered.map(pack => <article className="pack-card" key={pack.id}>
          <button className="favorite-btn" aria-label={favorites.includes(pack.id) ? 'Remover favorito' : 'Adicionar favorito'} onClick={() => addToFavorites(pack)}><Heart size={17} fill={favorites.includes(pack.id) ? 'currentColor' : 'none'} /></button>
          <button className="pack-preview-button" onClick={() => setDetailsPack(pack)} aria-label={'Ver detalhes de ' + pack.name}><div className="pack-art" style={{ background: 'linear-gradient(90deg, ' + pack.color + 'd9, ' + pack.color + '45), url("' + pack.photo + '") center/cover, ' + pack.color }}><span className="pack-tag">{pack.tag}</span><span className="pack-deco">✦</span><strong>{pack.title.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</strong><small>{pack.subtitle}</small><span className="art-brand">PACKÊ ✦</span></div></button>
          <div className="pack-info"><div><h3>{pack.name}</h3><p>{pack.niche} · {pack.style}</p></div><span className="price-label">Grátis</span></div>
          <div className="pack-meta"><span><Square size={12} /> {pack.format}</span><span>{pack.price === 0 ? 'Sem custo' : 'R$ ' + pack.price.toFixed(2)}</span></div>
          <button className="edit-pack-btn" onClick={() => choosePack(pack)}>Abrir no editor <ArrowUpRight size={15} /></button>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><Search size={28} /><h3>Nenhum modelo encontrado</h3><p>Altere os filtros para ver outras opções.</p><button onClick={() => { setQuery(''); setActiveNiche('Todos'); setActiveStyle('Todos'); setActiveFormat('Todos') }}>Limpar filtros</button></div>}
      </section>

      {detailsPack && <div className="details-backdrop" onClick={e => { if (e.target === e.currentTarget) setDetailsPack(null) }}><section className="details-modal" role="dialog" aria-modal="true"><button className="auth-close" aria-label="Fechar detalhes" onClick={() => setDetailsPack(null)}><X size={18} /></button><div className="pack-art details-art" style={{ background: 'linear-gradient(90deg, ' + detailsPack.color + 'd9, ' + detailsPack.color + '45), url("' + detailsPack.photo + '") center/cover, ' + detailsPack.color }}><span className="pack-tag">Referência editável</span><strong>{detailsPack.title.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</strong><small>{detailsPack.subtitle}</small></div><div className="eyebrow">{detailsPack.niche} · {detailsPack.style}</div><h2>{detailsPack.name}</h2><p>Use esta fotografia como referência visual. No editor, troque a foto, ajuste transparência e formas, e personalize textos e logotipo antes de exportar.</p><div className="details-price"><strong>Grátis</strong><span>Referência editável · {detailsPack.format}</span></div><button className="download-btn" onClick={() => { choosePack(detailsPack); setDetailsPack(null) }}>Personalizar este modelo <ArrowUpRight size={17} /></button></section></div>}

      <section className="editor-section" id="editor">
        <div className="section-heading editor-heading"><div><div className="eyebrow">EDITOR VISUAL</div><h2>Edite absolutamente tudo.</h2><p>Selecione um elemento na arte para mover, redimensionar, girar ou alterar as propriedades.</p></div><div className="editor-badge"><Move size={16} /> Editor manual</div></div>
        <div className="editor-layout">
          <div className="editor-preview-wrap">
            <div className="preview-toolbar"><span><span className="live-dot" /> ÁREA DE EDIÇÃO</span><span>{format} · {format === 'Stories' ? '9:16' : '1:1'}</span></div>
            <div className="canvas-stage"><div ref={canvasRef} className={'editor-canvas live-canvas ' + (format === 'Stories' ? 'story-canvas' : '')} style={{ aspectRatio: ratio, maxHeight: canvasHeight + 'px', background: bgMode === 'solid' ? bgColor : 'linear-gradient(145deg,' + bgColor + ',' + bgColor2 + ')' }} onPointerDown={e => { if (e.target === e.currentTarget) setSelectedLayer(null) }}>
              <div className="canvas-safe-guides" />
              {layers.map(renderLayer)}
            </div></div>
            <div className="format-tabs">{formats.map(f => <button key={f} className={format === f ? 'format-tab active' : 'format-tab'} onClick={() => { setFormat(f); setSelectedLayer(null) }}>{f === 'Stories' ? <Smartphone size={15} /> : f === 'Carrossel' ? <Layers size={15} /> : <Square size={15} />}{f}</button>)}</div>
            {format === 'Carrossel' && <div className="carousel-options"><label>Quantidade de slides <select value={carouselCount} onChange={e => setCarouselCount(Number(e.target.value))}>{[2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}</select></label><span>Prévia da capa · o ZIP gera {carouselCount} slides com variações de conteúdo.</span></div>}
            <div className="preview-foot"><span><Check size={15} /> Arraste os elementos diretamente na arte</span><button onClick={resetEditor}><RotateCcw size={14} /> Restaurar modelo</button></div>
          </div>
          <div className="editor-controls">
            <div className="control-title"><div className="control-icon"><LayoutGrid size={18} /></div><div><h3>Personalização completa</h3><p>Modelo: {selected.name}</p></div></div>
            <details className="auto-pack-panel">
              <summary className="auto-pack-heading"><WandSparkles size={17} /><div><strong>Gerar pack automático</strong><small>Escolha nicho, estilo e formato para montar uma arte.</small></div><span className="auto-pack-chevron">⌄</span></summary>
              <div className="auto-pack-fields">
                <label>Nicho<select value={autoNiche} onChange={e => setAutoNiche(e.target.value)}>{niches.filter(n => n !== 'Todos').map(n => <option key={n}>{n}</option>)}</select></label>
                <label>Estilo<select value={autoStyle} onChange={e => setAutoStyle(e.target.value)}>{styles.filter(s => s !== 'Todos').map(s => <option key={s}>{s}</option>)}</select></label>
                <label>Formato<select value={autoFormat} onChange={e => setAutoFormat(e.target.value)}>{formats.map(f => <option key={f}>{f}</option>)}</select></label>
              </div>
              <button className="generate-pack-btn" onClick={generatePack}><WandSparkles size={16} /> Gerar meu pack</button>
            </details>
            <label className="field-label" htmlFor="design-name">NOME DO PROJETO</label><input id="design-name" className="text-field" value={designName} onChange={e => setDesignName(e.target.value)} />
            <div className="field-label"><Palette size={14} /> FUNDO DA ARTE</div><div className="background-controls"><label>Cor principal <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} /></label><label>Cor secundária <input type="color" value={bgColor2} onChange={e => setBgColor2(e.target.value)} /></label></div><div className="bg-mode-row"><button className={bgMode === 'gradient' ? 'mini-choice active' : 'mini-choice'} onClick={() => setBgMode('gradient')}>Degradê</button><button className={bgMode === 'solid' ? 'mini-choice active' : 'mini-choice'} onClick={() => setBgMode('solid')}>Cor sólida</button></div>
            <div className="element-actions"><button onClick={addText}><Type size={15} /> Texto</button><button onClick={addShape}><Plus size={15} /> Forma</button><button onClick={() => { replaceTargetRef.current = null; fileRef.current?.click() }}><ImagePlus size={15} /> Imagem</button><button onClick={() => { replaceTargetRef.current = null; logoRef.current?.click() }}><Upload size={15} /> Logotipo</button><input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { addImage(e.target.files?.[0], 'image', replaceTargetRef.current); replaceTargetRef.current = null; e.target.value = '' }} /><input ref={logoRef} type="file" accept="image/*" hidden onChange={e => { addImage(e.target.files?.[0], 'logo', replaceTargetRef.current); replaceTargetRef.current = null; e.target.value = '' }} /></div>
            <div className="layers-header"><span><Layers size={14} /> CAMADAS ({layers.length})</span><small>Selecione para editar</small></div>
            <div className="layers-list">{layers.map(layer => <button key={layer.id} className={selectedLayer === layer.id ? 'layer-row active' : 'layer-row'} onClick={() => setSelectedLayer(layer.id)}><span className="layer-type-icon">{layer.type === 'text' ? <Type size={14} /> : layer.type === 'image' ? <ImagePlus size={14} /> : <Square size={14} />}</span><span>{layer.name}</span><small>{Math.round(layer.w)}×{Math.round(layer.h)}</small></button>)}</div>
            {currentLayer ? <div className="selected-properties">
              <div className="selected-title"><strong>Editar: {currentLayer.name}</strong><button aria-label="Excluir elemento" onClick={() => { setLayers(old => old.filter(layer => layer.id !== currentLayer.id)); setSelectedLayer(null) }}><Trash2 size={15} /></button></div>
              {currentLayer.type === 'text' && <><label className="field-label" htmlFor="layer-text">TEXTO</label><textarea id="layer-text" className="text-field title-field" rows="3" value={currentLayer.text} onChange={e => updateLayer(currentLayer.id, { text: e.target.value })} /><label className="field-label">TIPOGRAFIA</label><select className="pack-select" value={currentLayer.fontFamily} onChange={e => updateLayer(currentLayer.id, { fontFamily: e.target.value })}><option>DM Sans</option><option>Manrope</option><option>Arial</option><option>Georgia</option><option>Impact</option><option>Courier New</option></select><label className="field-label">ALINHAMENTO</label><div className="bg-mode-row">{['left','center','right'].map(a => <button key={a} className={currentLayer.align === a ? 'mini-choice active' : 'mini-choice'} onClick={() => updateLayer(currentLayer.id, { align: a })}>{a === 'left' ? 'Esquerda' : a === 'center' ? 'Centro' : 'Direita'}</button>)}</div><label className="field-label">PESO DA FONTE</label><select className="pack-select" value={currentLayer.fontWeight} onChange={e => updateLayer(currentLayer.id, { fontWeight: Number(e.target.value) })}><option value="400">Normal</option><option value="600">Seminegrito</option><option value="700">Negrito</option><option value="900">Extra negrito</option></select><label className="field-label">TAMANHO DO TEXTO</label><input type="range" min="1.5" max="14" step=".5" value={currentLayer.fontSize} onChange={e => updateLayer(currentLayer.id, { fontSize: Number(e.target.value) })} /></>}
              {currentLayer.type === 'image' && <><label className="field-label">AJUSTE DA IMAGEM</label><select className="pack-select" value={currentLayer.fit} onChange={e => updateLayer(currentLayer.id, { fit: e.target.value })}><option value="contain">Mostrar imagem inteira</option><option value="cover">Preencher área (cortar)</option></select><button className="secondary-action" onClick={() => replaceImage(currentLayer)}><Upload size={14} /> Trocar arquivo</button></>}
              {currentLayer.type === 'shape' && <><label className="field-label">MODELO DE FORMA</label><select className="pack-select" value={currentLayer.shape || 'circle'} onChange={e => updateLayer(currentLayer.id, { shape: e.target.value, name: 'Forma: ' + ({circle:'Círculo',ellipse:'Elipse',rect:'Retângulo',rounded:'Retângulo arredondado',triangle:'Triângulo',star:'Estrela',line:'Linha'}[e.target.value] || 'Forma') })}><option value="circle">Círculo</option><option value="ellipse">Elipse</option><option value="rect">Retângulo</option><option value="rounded">Retângulo arredondado</option><option value="triangle">Triângulo</option><option value="star">Estrela</option><option value="line">Linha</option></select></>}
              <label className="field-label">TRANSPARÊNCIA <span>{Math.round((currentLayer.opacity == null ? 1 : currentLayer.opacity) * 100)}%</span></label><input className="opacity-slider" aria-label="Transparência do elemento" type="range" min="0" max="1" step="0.05" value={currentLayer.opacity == null ? 1 : currentLayer.opacity} onChange={e => updateLayer(currentLayer.id, { opacity: Number(e.target.value) })} />
              <div className="property-grid"><label>Cor <input type="color" value={currentLayer.color || '#ffffff'} onChange={e => updateLayer(currentLayer.id, { color: e.target.value })} disabled={currentLayer.type === 'image'} /></label><label>Rotação <input type="number" min="-180" max="180" value={currentLayer.rotation} onChange={e => updateLayer(currentLayer.id, { rotation: Number(e.target.value) })} /></label><label>Posição X % <input type="number" min="0" max="100" value={Math.round(currentLayer.x)} onChange={e => updateLayer(currentLayer.id, { x: Math.max(0, Math.min(100-currentLayer.w, Number(e.target.value))) })} /></label><label>Posição Y % <input type="number" min="0" max="100" value={Math.round(currentLayer.y)} onChange={e => updateLayer(currentLayer.id, { y: Math.max(0, Math.min(100-currentLayer.h, Number(e.target.value))) })} /></label><label>Largura % <input type="number" min="5" max="100" value={Math.round(currentLayer.w)} onChange={e => updateLayer(currentLayer.id, { w: Math.max(5, Math.min(100-currentLayer.x, Number(e.target.value))) })} /></label><label>Altura % <input type="number" min="3" max="100" value={Math.round(currentLayer.h)} onChange={e => updateLayer(currentLayer.id, { h: Math.max(3, Math.min(100-currentLayer.y, Number(e.target.value))) })} /></label></div>
              <div className="selected-footer"><button onClick={() => updateLayer(currentLayer.id, { rotation: (currentLayer.rotation + 15) % 360 })}><RotateCw size={14} /> Girar +15°</button><button onClick={() => setLayers(old => { const rest = old.filter(l => l.id !== currentLayer.id); return [...rest, currentLayer] })}><BringToFront size={14} /> Trazer à frente</button></div>
            </div> : <div className="no-selection"><Move size={20} /><strong>Nenhum elemento selecionado</strong><span>Clique em uma camada ou toque no elemento da arte para editar.</span></div>}
            <div className="export-actions"><button className="download-btn" onClick={downloadPng}><Download size={17} /> Baixar PNG <ArrowUpRight size={17} /></button><button className="zip-btn" onClick={downloadZip}><FileArchive size={17} /> Exportar projeto em ZIP</button></div>
            {notice && <p className="notice"><Check size={15} /> {notice}</p>}<p className="editor-disclaimer">O pack é gerado no navegador. Fotografia de referência: Unsplash; substitua pela imagem autorizada da sua marca antes de publicar.</p>
          </div>
        </div>
      </section>
      <section className="how-section" id="como-funciona"><div className="eyebrow">VOCÊ NO CONTROLE</div><h2>Monte do seu jeito.</h2><div className="steps-grid"><div className="step-card"><span>01</span><div className="step-icon">🧩</div><h3>Escolha o modelo</h3><p>Filtre por nicho, estilo e formato para achar um ponto de partida.</p></div><div className="step-card"><span>02</span><div className="step-icon">🎨</div><h3>Edite cada camada</h3><p>Mova, redimensione, gire, troque cores e adicione imagens ou logotipo.</p></div><div className="step-card"><span>03</span><div className="step-icon">📦</div><h3>Exporte sua arte</h3><p>Baixe em PNG ou leve o projeto e os arquivos em um ZIP.</p></div></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#"><span className="brand-mark brand-letter">P</span><span>packê<span className="brand-dot">.</span></span></a><span>Feito para suas ideias brilharem ✦</span><span>© 2026 Packê · Crie e exporte suas artes</span></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
