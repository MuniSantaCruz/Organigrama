import React, { useState, useEffect, useRef } from 'react';
import {
    Search, ZoomIn, ZoomOut, Maximize, Landmark,
    ChevronDown, ChevronUp, ChevronsDown, ChevronsUp,
    X, User, Users, Building2, FileText, CheckCircle2, Mail
} from 'lucide-react';
import { orgData, nodeDescriptions, nodeDirectors, nodeMembers } from './data';
import './index.css';

/* ─── Utility: build ancestor-path map ─── */
const buildPathsMap = (data) => {
    const map = {};
    const root = data.title;
    map[root] = [root];
    map[data.top.left.text]   = [data.top.left.text,   root];
    map[data.top.center.text] = [data.top.center.text, root];
    map[data.top.right.text]  = [data.top.right.text,  root];

    data.spine.forEach(row => {
        [...row.left, ...row.right].forEach(n => {
            map[n.text] = [n.text, root];
            (n.bottom || []).forEach(b => { map[b.text] = [b.text, n.text, root]; });
        });
    });

    data.bottomRow.forEach(col => {
        map[col.title] = [col.title, root];
        col.children.forEach(c => { map[c] = [c, col.title, root]; });
    });
    return map;
};

const pathsMap = buildPathsMap(orgData);

/* ─── OrgNode component ─── */
const OrgNode = ({
    text, type = 'default',
    isHighlighted, isDimmed, isPathActive,
    hasChildren, isCollapsed, offset = { x: 0, y: 0 },
    onToggle, onClickNode, onHover, onNodeDragStart
}) => {
    let cls = 'box';
    let avatarCls = 'avatar-square';

    if (type === 'title')     cls += ' title-box';
    if (type === 'alcalde')   cls += ' alcalde-box';
    if (type === 'green')     cls += ' green-border';
    if (type === 'highlight') avatarCls += ' highlight-box-color';
    if (isHighlighted)        cls += ' highlight';
    if (isDimmed)             cls += ' dimmed';
    if (hasChildren)          cls += ' has-children';
    if (isPathActive)         cls += ' path-active';

    return (
        <div
            className={cls}
            id={`node-${text.replace(/\s+/g, '-')}`}
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                cursor: 'grab',
                zIndex: offset.x !== 0 || offset.y !== 0 ? 10 : 1
            }}
            onMouseEnter={() => onHover?.(text)}
            onMouseLeave={() => onHover?.(null)}
            onMouseDown={(e) => {
                // Prevent canvas drag if we start a node drag
                e.stopPropagation();
                onNodeDragStart(e, text);
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClickNode(text);
            }}
        >
            <div className={avatarCls} />
            <span style={{ flex: 1 }}>{text}</span>

            {hasChildren && (
                <div
                    className="collapse-icon"
                    title={isCollapsed ? 'Expandir' : 'Colapsar'}
                    onClick={(e) => { e.stopPropagation(); onToggle(text); }}
                >
                    {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>
            )}
        </div>
    );
};

/* ─── Modal component ─── */
const NodeModal = ({ nodeText, onClose }) => {
    const description = nodeDescriptions[nodeText]
        || `${nodeText} es responsable de coordinar las funciones inherentes a su área dentro de la Municipalidad de Santa Cruz.`;
    const director  = nodeDirectors[nodeText] || null;
    const multiData  = nodeMembers[nodeText]  || null;

    // Build initials from name (up to 2 letters)
    const initials = director?.name
        ? director.name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
        : null;

    const memberInitials = (name) =>
        name ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?';

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const hasDirectorInfo = director && (director.name || director.photo || director.email);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

                {/* Top colour stripe */}
                <div className="modal-header">
                    <div className="modal-header-stripe" />
                    <div className="modal-header-body">
                        <div className="modal-title-block">
                            <div className="modal-icon">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <div className="modal-title">{nodeText}</div>
                                <span className="modal-tag">Municipalidad de Santa Cruz</span>
                            </div>
                        </div>
                        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">

                    {/* Description */}
                    <div>
                        <div className="modal-section-title">
                            <FileText size={13} /> Función Principal
                        </div>
                        <p className="modal-description">{description}</p>
                    </div>

                    {/* Director section — only shown if there is at least one piece of info */}
                    {hasDirectorInfo && (
                        <>
                            <div className="modal-divider" />
                            <div>
                                <div className="modal-section-title">
                                    <User size={13} /> Encargado/a
                                </div>
                                <div className="director-card">

                                    {/* Avatar: real photo if provided, otherwise initials */}
                                    {director.photo ? (
                                        <img
                                            src={director.photo}
                                            alt={director.name || 'Director/a'}
                                            className="director-photo"
                                        />
                                    ) : (
                                        <div className="director-avatar">
                                            {initials || <User size={20} />}
                                        </div>
                                    )}

                                    <div className="director-info">
                                        {/* Role label always shown if director exists */}
                                        <span className="director-role">{director.role}</span>

                                        {/* Name — only if set */}
                                        {director.name && (
                                            <span className="director-name">{director.name}</span>
                                        )}

                                        {/* Email — only if set, as a clickable mailto link */}
                                        {director.email && (
                                            <a
                                                href={`mailto:${director.email}`}
                                                className="director-email"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <Mail size={12} />
                                                {director.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {/* ── MULTI-MEMBER section (e.g. Concejo) ── */}
                    {multiData && (
                        <>
                            <div className="modal-divider" />
                            <div>
                                <div className="modal-section-title" style={{ justifyContent: 'space-between' }}>
                                    <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                                        <Users size={13} /> Integrantes
                                    </span>
                                    <span className="member-count-badge">{multiData.members.length} miembros</span>
                                </div>

                                {/* General institution email */}
                                {multiData.institutionEmail && (
                                    <a href={`mailto:${multiData.institutionEmail}`} className="institution-email">
                                        <Mail size={13} /> {multiData.institutionEmail}
                                    </a>
                                )}

                                {/* Member cards grid */}
                                <div className="members-grid">
                                    {multiData.members.map((m, idx) => (
                                        <div className="member-card" key={idx}>
                                            {m.photo ? (
                                                <img src={m.photo} alt={m.name} className="member-avatar-img" />
                                            ) : (
                                                <div className="member-avatar">{memberInitials(m.name)}</div>
                                            )}
                                            <div className="member-info">
                                                <span className="member-role">{m.role}</span>
                                                <span className="member-name">{m.name}</span>
                                                {m.email && (
                                                    <a href={`mailto:${m.email}`} className="director-email" onClick={e => e.stopPropagation()}>
                                                        <Mail size={11} /> {m.email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="modal-badges">
                        <span className="badge badge-green">
                            <CheckCircle2 size={13} /> Estado: Activo
                        </span>
                        <span className="badge badge-blue">
                            <Building2 size={13} /> Edificio Consistorial
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* ─── Main App ─── */
export default function App() {
    const [searchQuery,    setSearchQuery]    = useState('');
    const [showDropdown,   setShowDropdown]   = useState(false);
    const [scale,          setScale]          = useState(0.4);
    const [position,       setPosition]       = useState({ x: 0, y: 150 });
    const [isDragging,     setIsDragging]     = useState(false);
    const [nodeOffsets,     setNodeOffsets]    = useState({});
    const draggedNode = useRef(null);
    const nodeDragStartPos = useRef({ x: 0, y: 0 });
    const [collapsedNodes, setCollapsedNodes] = useState(new Set());
    const [hoveredNode,    setHoveredNode]    = useState(null);
    const [modalNode,      setModalNode]      = useState(null);

    /* Unified node state checker (Hover, Search, Offset) */
    const check = (text) => {
        const offset = nodeOffsets[text] || { x: 0, y: 0 };

        // Search logic
        const q = searchQuery.trim().toLowerCase();
        const hasSearch = q.length > 0;
        const searchMatch = hasSearch && text.toLowerCase().includes(q);

        // Hover logic
        const isHovered = hoveredNode === text;
        const isAnyHovered = !!hoveredNode;

        let highlight = false;
        let dim = false;

        if (hasSearch) {
            highlight = searchMatch;
            dim = !searchMatch;
        } else if (isAnyHovered) {
            highlight = isHovered;
            dim = !isHovered;
        }

        return { isHighlighted: highlight, isDimmed: dim, offset };
    };

    const dragStart      = useRef({ x: 0, y: 0 });
    const mouseDownPos   = useRef({ x: 0, y: 0 });  // to detect click vs drag
    const wasDrag        = useRef(false);
    const appRef         = useRef(null);
    const scaleRef       = useRef(scale);
    const positionRef    = useRef(position);

    // Keep refs in sync for use inside closures
    useEffect(() => { scaleRef.current = scale; }, [scale]);
    useEffect(() => { positionRef.current = position; }, [position]);

    /* Active hover path */
    const activePath     = hoveredNode ? (pathsMap[hoveredNode] || []) : [];
    const isSpineActive  = hoveredNode
        && activePath.includes(orgData.title)
        && hoveredNode !== orgData.title
        && hoveredNode !== orgData.top.left.text
        && hoveredNode !== orgData.top.right.text;
    const isBottomActive = hoveredNode
        && activePath.some(p => orgData.bottomRow.find(c => c.title === p));

    const searchResults = searchQuery.trim().length >= 2
        ? Object.keys(pathsMap).filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    /* Collapse/expand */
    const toggleCollapse = (id) => setCollapsedNodes(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    const expandAll = () => setCollapsedNodes(new Set());
    const collapseAll = () => {
        const all = new Set();
        orgData.spine.forEach(row => {
            [...row.left, ...row.right].forEach(n => {
                if (n.bottom?.length) all.add(n.text);
            });
        });
        orgData.bottomRow.forEach(col => {
            if (col.children?.length) all.add(col.title);
        });
        setCollapsedNodes(all);
    };

    /* Center & zoom — always exact, never overshoots.
       Derivation (transform-origin: center = W/2, H/2):
         screen_x = W/2 + (preX - W/2)*s + tx
       Solve for tx so screen_x == vcX at targetScale:
         tx_new = (vcX - W/2) + (W/2 + tx_cur - elCX) * (ts/s)
       Since vcX == W/2 the first term vanishes. */
    const focusNode = (text) => {
        const path = pathsMap[text] || [];
        setCollapsedNodes(prev => {
            const next = new Set(prev);
            path.forEach(p => next.delete(p));
            return next;
        });

        setTimeout(() => {
            const el = document.getElementById(`node-${text.replace(/\s+/g, '-')}`);
            if (!el) return;

            // Current screen centre of the element (accounts for any transform)
            const r    = el.getBoundingClientRect();
            const elCX = r.left + r.width  / 2;
            const elCY = r.top  + r.height / 2;

            const W      = window.innerWidth;
            const H      = window.innerHeight;
            const HEADER = 72;

            // Visual centre of the canvas area below the header
            const vcX = W / 2;
            const vcY = HEADER + (H - HEADER) / 2;  // = (H + HEADER) / 2

            const cs  = scaleRef.current;            // current scale
            const cpx = positionRef.current.x;       // current tx
            const cpy = positionRef.current.y;       // current ty
            const ts  = 1.2;                         // target scale
            const r2s = ts / cs;                     // ratio

            // tx_new = (vcX - W/2) + (W/2 + cpx - elCX) * r2s  → first term = 0
            // ty_new = (vcY - H/2) + (H/2 + cpy - elCY) * r2s
            setScale(ts);
            setPosition({
                x: (W / 2 + cpx - elCX) * r2s,
                y: (vcY - H / 2) + (H / 2 + cpy - elCY) * r2s,
            });
        }, 200);
    };

    /* Click: focus + open modal */
    const handleNodeClick = (text) => {
        // Only open modal on a genuine click (not the end of a drag)
        if (wasDrag.current) return;
        focusNode(text);
        setModalNode(text);
    };

    /* Pan / zoom */
    const handleWheel = (e) => {
        e.preventDefault();
        const factor = 0.1;
        setScale(s => Math.min(Math.max(0.1, e.deltaY < 0 ? s * (1 + factor) : s / (1 + factor)), 3));
    };

    const handleMouseDown = (e) => {
        if (e.target.closest('.controls-bar') || e.target.closest('.header-bar')
            || e.target.closest('.search-dropdown') || e.target.closest('.modal-overlay')) return;
        
        wasDrag.current   = false;
        mouseDownPos.current = { x: e.clientX, y: e.clientY };
        dragStart.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y };
        setIsDragging(true);
    };

    const handleNodeDragStart = (e, text) => {
        wasDrag.current = false;
        draggedNode.current = text;
        const currentOffset = nodeOffsets[text] || { x: 0, y: 0 };
        nodeDragStartPos.current = { 
            x: e.clientX - currentOffset.x * scaleRef.current, 
            y: e.clientY - currentOffset.y * scaleRef.current 
        };
        mouseDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        // Handle Node Dragging
        if (draggedNode.current) {
            const dx = e.clientX - mouseDownPos.current.x;
            const dy = e.clientY - mouseDownPos.current.y;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDrag.current = true;

            const s = scaleRef.current;
            setNodeOffsets(prev => ({
                ...prev,
                [draggedNode.current]: {
                    x: (e.clientX - nodeDragStartPos.current.x) / s,
                    y: (e.clientY - nodeDragStartPos.current.y) / s
                }
            }));
            return;
        }

        // Handle Canvas Panning
        if (!isDragging) return;
        const dx = e.clientX - mouseDownPos.current.x;
        const dy = e.clientY - mouseDownPos.current.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDrag.current = true;
        setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        draggedNode.current = null;
    };

    useEffect(() => {
        const el = appRef.current;
        el?.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup',   handleMouseUp);
        return () => {
            el?.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup',   handleMouseUp);
        };
    }, [isDragging, position]);

    /* ── Render helpers ── */
    const lineV = (extra = '') => <div className={`v-line${extra}`} />;
    const lineH = (extra = '') => <div className={`h-line${extra}`} />;

    return (
        <div
            ref={appRef}
            id="app"
            className={isDragging ? 'dragging' : ''}
            onMouseDown={handleMouseDown}
        >
            {/* ── HEADER ── */}
            <header className="header-bar">
                <div className="logo-section">
                    <img src="./logo-muni.png" alt="Muni Santa Cruz" className="logo-img" />
                    <div className="logo-text">
                        <span className="logo-title">Ilustre Municipalidad de Santa Cruz</span>
                        <span className="logo-subtitle">Portal de Transparencia Orgánica</span>
                    </div>
                </div>

                <div className="search-container">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar departamento, cargo o sección…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 180)}
                    />
                    {showDropdown && searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map(res => (
                                <div
                                    key={res}
                                    className="search-item"
                                    onClick={() => {
                                        setSearchQuery(res);
                                        setShowDropdown(false);
                                        focusNode(res);
                                    }}
                                >
                                    {res}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* ── CHART CANVAS ── */}
            <div
                className="chart-container"
                style={{
                    transform: `translate(${position.x}px,${position.y}px) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform .5s cubic-bezier(.2,.8,.2,1)',
                }}
            >
                <div className="org-wrapper">
                    {/* Root */}
                    <OrgNode
                        text={orgData.title} type="title"
                        onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                        isPathActive={activePath.includes(orgData.title)}
                        {...check(orgData.title)}
                    />
                    <div className={`v-line${isSpineActive ? ' path-active' : ''}`} />

                    {/* Top row: Comité – Alcalde – Concejo */}
                    <div className="top-level">
                        <OrgNode
                            text={orgData.top.left.text} type="green"
                            onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                            isPathActive={activePath.includes(orgData.top.left.text)}
                            {...check(orgData.top.left.text)}
                        />
                        <div className={`h-line dashed${activePath.includes(orgData.top.left.text) ? ' path-active' : ''}`} style={{ width: 60 }} />
                        <OrgNode
                            text={orgData.top.center.text} type="alcalde"
                            onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                            isPathActive={activePath.includes(orgData.top.center.text)}
                            {...check(orgData.top.center.text)}
                        />
                        <div className={`h-line dashed${activePath.includes(orgData.top.right.text) ? ' path-active' : ''}`} style={{ width: 60 }} />
                        <OrgNode
                            text={orgData.top.right.text}
                            onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                            isPathActive={activePath.includes(orgData.top.right.text)}
                            {...check(orgData.top.right.text)}
                        />
                    </div>
                    <div className={`v-line connect-bottom${isSpineActive ? ' path-active' : ''}`} />

                    {/* Spine */}
                    <div className="spine-container">
                        <div className={`spine-line${isSpineActive ? ' path-active' : ''}`} />

                        {orgData.spine.map((row, rIdx) => (
                            <div className="spine-row" key={rIdx}>
                                {/* Left branch */}
                                <div className="branch left-branch">
                                    {row.left.map((node, i) => {
                                        const hasC  = !!(node.bottom?.length);
                                        const isColl = collapsedNodes.has(node.text);
                                        const active = activePath.includes(node.text);
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="node-vertical-group">
                                                    <OrgNode
                                                        text={node.text}
                                                        hasChildren={hasC} isCollapsed={isColl}
                                                        onToggle={toggleCollapse}
                                                        onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                                                        isPathActive={active}
                                                        {...check(node.text)}
                                                    />
                                                    {hasC && !isColl && node.bottom.map((b, bi) => (
                                                        <div key={bi} className="collapsible-child">
                                                            <div className={`v-line${activePath.includes(b.text) ? ' path-active' : ''}`} />
                                                            <OrgNode
                                                                text={b.text}
                                                                onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                                                                isPathActive={activePath.includes(b.text)}
                                                                {...check(b.text)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                {(i < row.left.length - 1 || node.isSpineNode) && (
                                                    <div className={`h-line${active ? ' path-active' : ''}`} />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>

                                <div className="spine-center-point" />

                                {/* Right branch */}
                                <div className="branch right-branch">
                                    {row.right.map((node, i) => {
                                        const hasC  = !!(node.bottom?.length);
                                        const isColl = collapsedNodes.has(node.text);
                                        const active = activePath.includes(node.text);
                                        return (
                                            <React.Fragment key={i}>
                                                <div className={`h-line${active ? ' path-active' : ''}`} />
                                                <div className="node-vertical-group">
                                                    <OrgNode
                                                        text={node.text}
                                                        hasChildren={hasC} isCollapsed={isColl}
                                                        onToggle={toggleCollapse}
                                                        onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                                                        isPathActive={active}
                                                        {...check(node.text)}
                                                    />
                                                    {hasC && !isColl && node.bottom.map((b, bi) => (
                                                        <div key={bi} className="collapsible-child">
                                                            <div className={`v-line${activePath.includes(b.text) ? ' path-active' : ''}`} />
                                                            <OrgNode
                                                                text={b.text}
                                                                onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                                                                isPathActive={activePath.includes(b.text)}
                                                                {...check(b.text)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom directorates */}
                    <div className="bottom-section">
                        <div className={`v-line connect-bottom${isBottomActive ? ' path-active' : ''}`} />
                        <div className={`bottom-h-line${isBottomActive ? ' path-active' : ''}`} />
                        <div className="bottom-columns">
                            {orgData.bottomRow.map((col, ci) => {
                                const hasC   = !!(col.children?.length);
                                const isColl = collapsedNodes.has(col.title);
                                const active = activePath.includes(col.title);
                                return (
                                    <div className="bottom-col" key={ci}>
                                        <div className={`v-line short${active ? ' path-active' : ''}`} />
                                        <OrgNode
                                            text={col.title} type="highlight"
                                            hasChildren={hasC} isCollapsed={isColl}
                                            onToggle={toggleCollapse}
                                            onClickNode={handleNodeClick} onHover={setHoveredNode}
                        onNodeDragStart={handleNodeDragStart}
                                            isPathActive={active}
                                            {...check(col.title)}
                                        />
                                        {hasC && !isColl && col.children.map((child, chi) => (
                                            <div key={chi} className="collapsible-child">
                                                <div className={`v-line${activePath.includes(child) ? ' path-active' : ''}`} />
                                                <OrgNode
                                                    text={child}
                                                    onClickNode={handleNodeClick} onHover={setHoveredNode}
                                                    onNodeDragStart={handleNodeDragStart}
                                                    isPathActive={activePath.includes(child)}
                                                    {...check(child)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MODAL ── */}
            {modalNode && (
                <NodeModal nodeText={modalNode} onClose={() => setModalNode(null)} />
            )}

            {/* ── CONTROLS ── */}
            <div className="controls-bar">
                <button onClick={collapseAll}><ChevronsUp size={15} /> Colapsar</button>
                <button onClick={expandAll}><ChevronsDown size={15} /> Expandir</button>
                <div className="controls-divider" />
                <button onClick={() => setScale(s => Math.max(s / 1.2, 0.1))}><ZoomOut size={15} /></button>
                <button onClick={() => { setScale(0.4); setPosition({ x: 0, y: 150 }); }}><Maximize size={15} /></button>
                <button onClick={() => setScale(s => Math.min(s * 1.2, 3))}><ZoomIn size={15} /></button>
            </div>
        </div>
    );
}
