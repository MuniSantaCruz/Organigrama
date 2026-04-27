document.addEventListener("DOMContentLoaded", () => {
    // Datos estructurados del organigrama
    const orgData = {
        title: "ORGANIGRAMA MUNICIPAL",
        top: {
            left: { text: "COMITÉ TÉCNICO ADMINISTRATIVO", greenBorder: true },
            center: { text: "ALCALDE" },
            right: { text: "CONCEJO" }
        },
        spine: [
            {
                left: [
                    { text: "SECCION ASESORIA JURIDICA" },
                    { text: "DEPARTAMENTO DE DEPORTES Y RECREACION" },
                    { text: "DEPARTAMENTO DE INFORMATICA" },
                    { 
                        text: "DEPARTAMENTO DE CULTURA Y TURISMO",
                        bottom: [{ text: "BIBLIOTECA MUNICIPAL" }]
                    },
                    { text: "ADMINISTRADOR MUNICIPAL", isSpineNode: true }
                ],
                right: [
                    { text: "JUZGADO POLICIA LOCAL", isSpineNode: true },
                    { text: "SECRETARIO JUZGADO POLICIA LOCAL" }
                ]
            },
            {
                left: [
                    { text: "SECCION TRANSPARENCIA" },
                    { text: "OIRS" },
                    { text: "OFICINA DE PARTES Y ARCHIVOS" },
                    { 
                        text: "SECRETARIO MUNICIPAL", 
                        isSpineNode: true,
                        bottom: [{ text: "SECRETARIA CONCEJO" }]
                    }
                ],
                right: [
                    { text: "DIRECCION DE CONTROL", isSpineNode: true },
                    { text: "AUDITORES" }
                ]
            },
            {
                left: [
                    { 
                        text: "SECPLAN", 
                        isSpineNode: true,
                        bottom: [{ text: "ADQUISICIONES" }]
                    }
                ],
                right: [
                    { text: "DEPARTAMENTO RELACIONES PUBLICAS Y COMUNICACIONES", isSpineNode: true },
                    { text: "OFICINA AUDIOVISUAL" }
                ]
            },
            {
                left: [],
                right: [
                    { text: "GABINETE ALCALDIA", isSpineNode: true }
                ]
            }
        ],
        bottomRow: [
            {
                title: "DIRECCION DE TRANSITO",
                children: []
            },
            {
                title: "DIRECCION DE OBRAS",
                children: [
                    "SECCION OPERACIONES",
                    "SECCION INSPECCION DE OBRAS",
                    "OFICINA CONVENIO SII",
                    "SECCION DE URBANISMO Y EDIFICACION"
                ]
            },
            {
                title: "DIRECCION DE ADMINISTRACION Y FINANZAS",
                children: [
                    "DEPTO. FINANZAS",
                    "TESORERIA"
                ]
            },
            {
                title: "DIRECCION DE DESARROLLO COMUNITARIO",
                children: [
                    "DEPTO. ASISTENCIA SOCIAL",
                    "SECCION ORG. COMUNITARIAS",
                    "OFICINA DE VIVIENDA"
                ]
            },
            {
                title: "DIRECCION DE GESTION DE PERSONAS",
                children: [
                    "SECCION CAPACITACIONES",
                    "SECCION DE BIENESTAR",
                    "DEPARTAMENTO DE PREVENCION DE RIESGOS"
                ]
            },
            {
                title: "DIRECCION DE RECURSOS HUMANOS",
                children: [
                    "SECCION REMUNERACIONES",
                    "DEPARTAMENTO DE MOVILIZACION"
                ]
            },
            {
                title: "DIRECCION DE RENTAS Y PATENTES",
                children: [
                    "DEPTO. INSPECCION Y COBRANZAS"
                ]
            },
            {
                title: "DIRECCION DE INVENTARIOS Y SERVICIOS GENERALES",
                children: [
                    "BODEGA MUNICIPAL"
                ]
            },
            {
                title: "DIRECCION DE ASEO, ORNATO Y MEDIO AMBIENTE",
                children: [
                    "SECCION DE ASEO",
                    "SECCION DE ORNATO",
                    "CENTRO VETERINARIO"
                ]
            },
            {
                title: "DIRECCION DE SEGURIDAD",
                children: [
                    "SENDA",
                    "OPERADORES DE CAMARA DE TELEVIGILANCIA"
                ]
            },
            {
                title: "DIRECCION DE GESTION DE RIESGOS DE DESASTRES",
                children: []
            },
            {
                title: "DIRECCION DE EDUCACION",
                children: []
            },
            {
                title: "DIRECCION DE SALUD", // Corregido de duplicado visual de educación
                children: []
            }
        ]
    };

    renderChart(orgData);
    initPanZoom();
});

function renderChart(data) {
    const container = document.getElementById('org-chart-container');
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'org-wrapper';

    // 1. Título
    const titleBox = document.createElement('div');
    titleBox.className = 'box title-box';
    titleBox.innerText = data.title;
    wrapper.appendChild(titleBox);

    const vLineTitle = document.createElement('div');
    vLineTitle.className = 'v-line';
    wrapper.appendChild(vLineTitle);

    // 2. Nivel Alcalde
    const topLevel = document.createElement('div');
    topLevel.className = 'top-level';
    
    const topLeft = document.createElement('div');
    topLeft.className = `box ${data.top.left.greenBorder ? 'green-border' : ''}`;
    topLeft.innerText = data.top.left.text;
    
    const dashedLineLeft = document.createElement('div');
    dashedLineLeft.className = 'h-line dashed';
    dashedLineLeft.style.width = '60px';
    
    const topCenter = document.createElement('div');
    topCenter.className = 'box alcalde-box';
    topCenter.innerText = data.top.center.text;
    
    const dashedLineRight = document.createElement('div');
    dashedLineRight.className = 'h-line dashed';
    dashedLineRight.style.width = '60px';
    
    const topRight = document.createElement('div');
    topRight.className = 'box';
    topRight.innerText = data.top.right.text;

    topLevel.appendChild(topLeft);
    topLevel.appendChild(dashedLineLeft);
    topLevel.appendChild(topCenter);
    topLevel.appendChild(dashedLineRight);
    topLevel.appendChild(topRight);
    wrapper.appendChild(topLevel);

    const vLineAlcalde = document.createElement('div');
    vLineAlcalde.className = 'v-line connect-spine';
    wrapper.appendChild(vLineAlcalde);

    // 3. Columna Vertebral Central
    const spineContainer = document.createElement('div');
    spineContainer.className = 'spine-container';
    
    const spineLine = document.createElement('div');
    spineLine.className = 'spine-line';
    spineContainer.appendChild(spineLine);

    data.spine.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'spine-row';

        // Rama Izquierda
        const leftBranch = document.createElement('div');
        leftBranch.className = 'branch left-branch';
        
        row.left.forEach((node, i) => {
            const nodeContainer = document.createElement('div');
            nodeContainer.className = 'node-vertical-group';
            
            const box = document.createElement('div');
            box.className = 'box';
            box.innerText = node.text;
            nodeContainer.appendChild(box);

            if (node.bottom && node.bottom.length > 0) {
                node.bottom.forEach(bNode => {
                    const vLine = document.createElement('div');
                    vLine.className = 'v-line';
                    const bBox = document.createElement('div');
                    bBox.className = 'box';
                    bBox.innerText = bNode.text;
                    nodeContainer.appendChild(vLine);
                    nodeContainer.appendChild(bBox);
                });
            }
            leftBranch.appendChild(nodeContainer);
            
            // Añadir línea horizontal
            if (i < row.left.length - 1 || node.isSpineNode) {
                const hLine = document.createElement('div');
                hLine.className = 'h-line';
                leftBranch.appendChild(hLine);
            }
        });
        rowDiv.appendChild(leftBranch);

        // Punto Central
        const centerPoint = document.createElement('div');
        centerPoint.className = 'spine-center-point';
        rowDiv.appendChild(centerPoint);

        // Rama Derecha
        const rightBranch = document.createElement('div');
        rightBranch.className = 'branch right-branch';
        
        row.right.forEach((node, i) => {
            if (i === 0 || i > 0) { 
                const hLine = document.createElement('div');
                hLine.className = 'h-line';
                rightBranch.appendChild(hLine);
            }

            const nodeContainer = document.createElement('div');
            nodeContainer.className = 'node-vertical-group';
            
            const box = document.createElement('div');
            box.className = 'box';
            box.innerText = node.text;
            nodeContainer.appendChild(box);

            if (node.bottom && node.bottom.length > 0) {
                node.bottom.forEach(bNode => {
                    const vLine = document.createElement('div');
                    vLine.className = 'v-line';
                    const bBox = document.createElement('div');
                    bBox.className = 'box';
                    bBox.innerText = bNode.text;
                    nodeContainer.appendChild(vLine);
                    nodeContainer.appendChild(bBox);
                });
            }
            rightBranch.appendChild(nodeContainer);
        });
        rowDiv.appendChild(rightBranch);

        spineContainer.appendChild(rowDiv);
    });

    wrapper.appendChild(spineContainer);

    // 4. Bloque Inferior Masivo
    const bottomSection = document.createElement('div');
    bottomSection.className = 'bottom-section';
    
    const vLineBottom = document.createElement('div');
    vLineBottom.className = 'v-line connect-bottom';
    bottomSection.appendChild(vLineBottom);

    const bottomHLine = document.createElement('div');
    bottomHLine.className = 'bottom-h-line';
    bottomSection.appendChild(bottomHLine);

    const bottomColumns = document.createElement('div');
    bottomColumns.className = 'bottom-columns';

    data.bottomRow.forEach(col => {
        const colDiv = document.createElement('div');
        colDiv.className = 'bottom-col';

        const vLineTop = document.createElement('div');
        vLineTop.className = 'v-line short';
        colDiv.appendChild(vLineTop);

        const titleBox = document.createElement('div');
        titleBox.className = 'box highlight-box';
        titleBox.innerText = col.title;
        colDiv.appendChild(titleBox);

        col.children.forEach(childText => {
            const vLine = document.createElement('div');
            vLine.className = 'v-line';
            colDiv.appendChild(vLine);

            const childBox = document.createElement('div');
            childBox.className = 'box';
            childBox.innerText = childText;
            colDiv.appendChild(childBox);
        });

        bottomColumns.appendChild(colDiv);
    });

    bottomSection.appendChild(bottomColumns);
    wrapper.appendChild(bottomSection);
    
    container.appendChild(wrapper);
}

function initPanZoom() {
    const container = document.getElementById('org-chart-container');
    const app = document.getElementById('app');
    
    // Configuración inicial de vista
    let scale = 0.6; // Empieza alejado para ver gran parte del organigrama
    let translateX = 0;
    let translateY = 150; // Mueve un poco hacia abajo inicialmente
    let isDragging = false;
    let startX, startY;

    function updateTransform() {
        container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    document.getElementById('zoom-in').addEventListener('click', () => {
        scale = Math.min(scale * 1.2, 3);
        updateTransform();
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        scale = Math.max(scale / 1.2, 0.15);
        updateTransform();
    });

    document.getElementById('zoom-reset').addEventListener('click', () => {
        scale = 0.6;
        translateX = 0;
        translateY = 150;
        updateTransform();
    });

    // Zoom con rueda del ratón
    app.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomIntensity = 0.1;
        if (e.deltaY < 0) {
            scale = Math.min(scale * (1 + zoomIntensity), 3);
        } else {
            scale = Math.max(scale / (1 + zoomIntensity), 0.15);
        }
        updateTransform();
    }, { passive: false });

    // Drag to pan (arrastrar)
    app.addEventListener('mousedown', (e) => {
        if (e.target.closest('.controls')) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        app.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        app.style.cursor = 'grab';
    });
    
    // Set initial layout
    updateTransform();
}
