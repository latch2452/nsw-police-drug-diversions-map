// NSW Police Diversions Map - Main Application
class DiversionsApp {
    constructor() {
        this.map = null;
        this.markers = [];
        this.diversionLineLayer = null;
        this.currentData = nswDiversionsData;
        this.dataTable = null;
        this.charts = {};
        
        // Initialize immediately since DOM is ready
        this.initializeApp();
    }

    initializeApp() {
        try {
            // Check if data is available
            if (!nswDiversionsData || nswDiversionsData.length === 0) {
                console.error('NSW Diversions data not available!');
                return;
            }
            
            // Initialize components
            this.initializeMap();
            this.initializeDataTable();
            this.initializeCharts();
            this.initializeControls();
            this.updateStatistics();
            this.setupEventListeners();
            
        } catch (error) {
            console.error('Error during app initialization:', error);
        }
    }

    // Initialize the Leaflet map
    initializeMap() {
        // Create map
        this.map = L.map('map', {
            center: [-33.87, 151.21],
            zoom: 7,
            zoomControl: true,
            preferCanvas: false
        });

        // Add base tile layer
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            detectRetina: false,
            maxNativeZoom: 18,
            maxZoom: 18,
            minZoom: 5,
            noWrap: false,
            opacity: 1,
            subdomains: 'abc',
            tms: false
        }).addTo(this.map);

        // Add markers for all areas
        this.addMarkersToMap();
    }

    // Add markers to the map
    addMarkersToMap() {
        this.clearMarkers();
        
        this.currentData.forEach(area => {
            const radius = DataUtils.getCircleRadius(area.totalCases, area.diversionRate);
            const color = DataUtils.getColorByRate(area.diversionRate);
            
            const marker = L.circleMarker(area.coordinates, {
                bubblingMouseEvents: true,
                color: color,
                dashArray: null,
                dashOffset: null,
                fill: true,
                fillColor: color,
                fillOpacity: 0.8,
                fillRule: 'evenodd',
                lineCap: 'round',
                lineJoin: 'round',
                opacity: 1.0,
                radius: radius,
                stroke: true,
                weight: 2
            }).addTo(this.map);

            // Create popup content
            const popupContent = this.createPopupContent(area);
            marker.bindPopup(popupContent, { maxWidth: 300 });
            
            // Create tooltip
            const tooltipContent = `${area.name}: ${area.diversionRate}% diversion`;
            marker.bindTooltip(tooltipContent, { sticky: true });

            // Add click event
            marker.on('click', () => this.selectArea(area));
            
            this.markers.push(marker);
        });
    }

    // Create popup content for markers
    createPopupContent(area, isInnerCity = null) {
        let zoneInfo = '';
        if (isInnerCity !== null) {
            const zoneClass = isInnerCity ? 'text-success' : 'text-warning';
            const zoneName = isInnerCity ? 'Inner City Zone' : 'Outer Suburban Zone';
            const zoneDesc = isInnerCity ? 'Generally higher diversion rates' : 'Generally lower diversion rates';
            zoneInfo = `
                <div class="stat-row">
                    <span class="stat-label">Zone:</span>
                    <span class="stat-value ${zoneClass}">${zoneName}</span>
                </div>
                <small class="text-muted">${zoneDesc}</small>
            `;
        }
        
        return `
            <div class="popup-content">
                <h4>${area.name}</h4>
                <div class="popup-stats">
                    <div class="stat-row">
                        <span class="stat-label">Diversion rate:</span>
                        <span class="stat-value rate-badge rate-${DataUtils.getRateCategory(area.diversionRate)}">${area.diversionRate}%</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Total cases:</span>
                        <span class="stat-value">${DataUtils.formatNumber(area.totalCases)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Diversions:</span>
                        <span class="stat-value text-success">${DataUtils.formatNumber(area.diversions)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Charges:</span>
                        <span class="stat-value text-danger">${DataUtils.formatNumber(area.charges)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Type:</span>
                        <span class="stat-value">${area.type}</span>
                    </div>
                    ${zoneInfo}
                </div>
                <div class="popup-actions mt-2">
                    <button class="btn btn-sm btn-primary" onclick="app.selectArea('${area.name}')">
                        <i class="fas fa-info-circle me-1"></i>Details
                    </button>
                </div>
            </div>
        `;
    }

    // Clear all markers from map
    clearMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
    }

    // Initialize the data table
    initializeDataTable() {
        // Populate table body
        this.populateTable();
        
        // Initialize DataTable
        this.dataTable = $('#diversions-table').DataTable({
            responsive: true,
            pageLength: 25,
            order: [[4, 'desc']], // Sort by diversion rate descending
            columnDefs: [
                { targets: [1, 2, 3], className: 'text-end' },
                { targets: [4, 5], className: 'text-center' },
                { targets: [6], orderable: false, searchable: false }
            ],
            language: {
                search: 'Search areas:',
                lengthMenu: 'Show _MENU_ areas per page',
                info: 'Showing _START_ to _END_ of _TOTAL_ areas',
                paginate: {
                    first: 'First',
                    last: 'Last',
                    next: 'Next',
                    previous: 'Previous'
                }
            }
        });
    }

    // Populate the data table
    populateTable() {
        const tbody = document.querySelector('#diversions-table tbody');
        tbody.innerHTML = '';
        
        this.currentData.forEach(area => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <strong>${area.name}</strong>
                    <br><small class="text-muted">${area.type}</small>
                </td>
                <td>${DataUtils.formatNumber(area.diversions)}</td>
                <td>${DataUtils.formatNumber(area.charges)}</td>
                <td>${DataUtils.formatNumber(area.totalCases)}</td>
                <td><span class="rate-badge rate-${DataUtils.getRateCategory(area.diversionRate)}">${area.diversionRate}%</span></td>
                <td>${area.chargeRate}%</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary action-btn" onclick="app.locateOnMap('${area.name}')" title="Show on map">
                        <i class="fas fa-map-marker-alt"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info action-btn" onclick="app.selectArea('${area.name}')" title="View details">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Initialize charts
    initializeCharts() {
        // Top Diversions Chart
        this.initTopDiversionsChart();
        
        // Bottom Diversions Chart
        this.initBottomDiversionsChart();
        
        // Rate Distribution Chart
        this.initRateDistributionChart();
        
        // Geographic Analysis Chart
        this.initGeographicAnalysisChart();
        
        // Charges vs Diversions Chart
        this.initChargesVsDiversionsChart();
    }

    initTopDiversionsChart() {
        const ctx = document.getElementById('top-diversions-chart').getContext('2d');
        const topAreas = DataUtils.getTopDiversionAreas(10);
        
        this.charts.topDiversions = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topAreas.map(area => area.name.replace(' PAC', '').replace(' PD', '')),
                datasets: [{
                    label: 'Diversion Rate (%)',
                    data: topAreas.map(area => area.diversionRate),
                    backgroundColor: topAreas.map(area => DataUtils.getColorByRate(area.diversionRate)),
                    borderColor: topAreas.map(area => DataUtils.getColorByRate(area.diversionRate)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y}% diversion rate`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Diversion Rate (%)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    initBottomDiversionsChart() {
        const ctx = document.getElementById('bottom-diversions-chart').getContext('2d');
        const bottomAreas = DataUtils.getBottomDiversionAreas(10);
        
        this.charts.bottomDiversions = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bottomAreas.map(area => area.name.replace(' PAC', '').replace(' PD', '')),
                datasets: [{
                    label: 'Diversion Rate (%)',
                    data: bottomAreas.map(area => area.diversionRate),
                    backgroundColor: bottomAreas.map(area => DataUtils.getColorByRate(area.diversionRate)),
                    borderColor: bottomAreas.map(area => DataUtils.getColorByRate(area.diversionRate)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y}% diversion rate`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Diversion Rate (%)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    initRateDistributionChart() {
        const ctx = document.getElementById('rate-distribution-chart').getContext('2d');
        const categories = DataUtils.getAreasByCategory();
        
        this.charts.rateDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['High (≥30%)', 'Medium (15-29%)', 'Low (5-14%)', 'Very Low (<5%)'],
                datasets: [{
                    data: [
                        categories.high.length,
                        categories.medium.length,
                        categories.low.length,
                        categories['very-low'].length
                    ],
                    backgroundColor: ['#b30000', '#ff7f00', '#ffff66', '#4c78a8'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed * 100) / total).toFixed(1);
                                return `${context.label}: ${context.parsed} areas (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initGeographicAnalysisChart() {
        const ctx = document.getElementById('geographic-analysis-chart').getContext('2d');
        const diversionLine = DataUtils.getDiversionLine();
        const geoAnalysis = DataUtils.getGeographicAnalysis();
        
        this.charts.geographicAnalysis = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Inner City Zone', 'Outer Suburban Zone', 'Sydney Metro', 'Regional NSW'],
                datasets: [{
                    label: 'Average Diversion Rate (%)',
                    data: [
                        diversionLine.innerAverage,
                        diversionLine.outerAverage,
                        geoAnalysis.metroAverage,
                        geoAnalysis.regionalAverage
                    ],
                    backgroundColor: [
                        '#2e7d32',  // Inner city - green
                        '#d32f2f',  // Outer - red
                        '#1976d2',  // Metro - blue
                        '#ff9800'   // Regional - orange
                    ],
                    borderColor: [
                        '#1b5e20',
                        '#b71c1c',
                        '#1565c0',
                        '#ef6c00'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const label = context.label;
                                if (label === 'Inner City Zone') {
                                    return `Areas: ${diversionLine.innerCityAreas.length}`;
                                } else if (label === 'Outer Suburban Zone') {
                                    return `Areas: ${diversionLine.outerAreas.length}`;
                                } else if (label === 'Sydney Metro') {
                                    return `Areas: ${geoAnalysis.sydneyMetro.length}`;
                                } else if (label === 'Regional NSW') {
                                    return `Areas: ${geoAnalysis.regional.length}`;
                                }
                                return '';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average Diversion Rate (%)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    initChargesVsDiversionsChart() {
        const ctx = document.getElementById('charges-vs-diversions-chart').getContext('2d');
        const topAreas = DataUtils.getTopDiversionAreas(15);
        
        this.charts.chargesVsDiversions = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topAreas.map(area => area.name.replace(' PAC', '').replace(' PD', '')),
                datasets: [
                    {
                        label: 'Charges',
                        data: topAreas.map(area => area.charges),
                        backgroundColor: 'rgba(244, 67, 54, 0.7)',
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Diversions',
                        data: topAreas.map(area => area.diversions),
                        backgroundColor: 'rgba(76, 175, 80, 0.7)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Cases'
                        }
                    }
                }
            }
        });
    }

    // Initialize controls
    initializeControls() {
        // Set up search functionality
        this.setupSearch();
        
        // Set up filters
        this.setupFilters();
    }

    setupSearch() {
        const searchInput = document.getElementById('area-search');
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });
    }

    setupFilters() {
        const rateFilter = document.getElementById('rate-filter');
        rateFilter.addEventListener('change', (e) => {
            this.handleRateFilter(e.target.value);
        });
        
        // Layer controls
        document.getElementById('show-diversion-line').addEventListener('change', (e) => {
            this.toggleDiversionLine(e.target.checked);
        });
        
        document.getElementById('show-labels').addEventListener('change', (e) => {
            this.toggleLabels(e.target.checked);
        });
    }

    // Event handlers
    handleSearch(searchTerm) {
        this.currentData = DataUtils.searchAreas(searchTerm);
        this.updateMapAndTable();
    }

    handleRateFilter(category) {
        this.currentData = DataUtils.filterByRate(category);
        this.updateMapAndTable();
    }

    updateMapAndTable() {
        this.addMarkersToMap();
        this.updateTable();
    }

    updateTable() {
        if (this.dataTable) {
            this.dataTable.destroy();
        }
        this.populateTable();
        this.initializeDataTable();
    }

    // Toggle map layers
    toggleDiversionLine(show) {
        if (show && !this.diversionLineLayer) {
            this.showDiversionLineAnalysis(true);
            this.addDiversionLineToMap();
        } else if (!show && this.diversionLineLayer) {
            this.showDiversionLineAnalysis(false);
            this.map.removeLayer(this.diversionLineLayer);
            this.diversionLineLayer = null;
            // Restore original markers
            this.addMarkersToMap();
        }
    }

    addDiversionLineToMap() {
        const analysis = DataUtils.getDiversionLine();
        
        // Create different styled markers for inner vs outer areas
        this.clearMarkers();
        
        this.currentData.forEach(area => {
            const radius = DataUtils.getCircleRadius(area.totalCases, area.diversionRate);
            const color = DataUtils.getColorByRate(area.diversionRate);
            const isInnerCity = analysis.innerCityAreas.includes(area);
            
            const marker = L.circleMarker(area.coordinates, {
                bubblingMouseEvents: true,
                color: color,
                dashArray: isInnerCity ? null : "5,5", // Dashed for outer areas
                dashOffset: null,
                fill: true,
                fillColor: color,
                fillOpacity: isInnerCity ? 0.8 : 0.6,
                fillRule: 'evenodd',
                lineCap: 'round',
                lineJoin: 'round',
                opacity: 1.0,
                radius: radius,
                stroke: true,
                weight: isInnerCity ? 3 : 2
            }).addTo(this.map);

            // Enhanced popup content with zone info
            const popupContent = this.createPopupContent(area, isInnerCity);
            marker.bindPopup(popupContent, { maxWidth: 350 });
            
            // Enhanced tooltip
            const zone = isInnerCity ? "Inner City Zone" : "Outer Suburban Zone";
            const tooltipContent = `${area.name}: ${area.diversionRate}% diversion (${zone})`;
            marker.bindTooltip(tooltipContent, { sticky: true });

            marker.on('click', () => this.selectArea(area));
            
            this.markers.push(marker);
        });

        // Add a visual line/polygon to show the approximate boundary
        this.addDiversionBoundaryLine();
    }

    addDiversionBoundaryLine() {
        // Create a rough polygon showing the "diversion line" boundary
        const boundaryCoords = [
            [-33.7, 150.9],   // North West
            [-33.7, 151.3],   // North East  
            [-34.1, 151.3],   // South East
            [-34.1, 150.9],   // South West
            [-33.7, 150.9]    // Close polygon
        ];

        const boundaryLine = L.polygon(boundaryCoords, {
            color: '#ff9800',
            weight: 3,
            opacity: 0.8,
            fillColor: '#ff9800',
            fillOpacity: 0.1,
            dashArray: '10,10'
        }).addTo(this.map);

        boundaryLine.bindPopup(`
            <div class="boundary-popup">
                <h5><i class="fas fa-divide me-2"></i>Diversion Line Boundary (Latte Line)</h5>
                <p><strong>Inner Zone:</strong> Higher diversion rates<br>
                <strong>Outer Zone:</strong> Lower diversion rates</p>
                <small class="text-muted">Approximate geographic boundary</small>
            </div>
        `);

        this.diversionLineLayer = boundaryLine;
    }

    showDiversionLineAnalysis(show) {
        const infoPanel = document.getElementById('diversion-line-info');
        
        if (show) {
            const analysis = DataUtils.getDiversionLine();
            const geoAnalysis = DataUtils.getGeographicAnalysis();
            
            const statsHtml = `
                <div class="diversion-stat">
                    <span class="diversion-stat-label">Inner City Average:</span>
                    <span class="diversion-stat-value text-success">${analysis.innerAverage}%</span>
                </div>
                <div class="diversion-stat">
                    <span class="diversion-stat-label">Outer Suburban Average:</span>
                    <span class="diversion-stat-value text-danger">${analysis.outerAverage}%</span>
                </div>
                <div class="diversion-gap" data-gap="${analysis.diversionGap}"></div>
                <div class="diversion-stat">
                    <span class="diversion-stat-label">Metro vs Regional Gap:</span>
                    <span class="diversion-stat-value">${geoAnalysis.metroVsRegionalGap}%</span>
                </div>
                <div class="diversion-stat">
                    <span class="diversion-stat-label">Inner City Areas:</span>
                    <span class="diversion-stat-value">${analysis.innerCityAreas.length}</span>
                </div>
                <div class="diversion-stat">
                    <span class="diversion-stat-label">Outer Areas:</span>
                    <span class="diversion-stat-value">${analysis.outerAreas.length}</span>
                </div>
            `;
            
            document.getElementById('diversion-line-stats').innerHTML = statsHtml;
            infoPanel.style.display = 'block';
        } else {
            infoPanel.style.display = 'none';
        }
    }

    toggleLabels(show) {
        // TODO: Implement labels toggle
    }

    // Area selection and location
    selectArea(areaName) {
        const area = nswDiversionsData.find(a => a.name === areaName);
        if (!area) return;
        
        // Update selected area info panel
        this.updateSelectedAreaInfo(area);
        
        // Scroll to area in table if visible
        this.highlightTableRow(area.name);
    }

    locateOnMap(areaName) {
        const area = nswDiversionsData.find(a => a.name === areaName);
        if (!area) return;
        
        // Zoom to area on map
        this.map.setView(area.coordinates, 10);
        
        // Open popup for the area
        const marker = this.markers.find(m => {
            const latLng = m.getLatLng();
            return Math.abs(latLng.lat - area.coordinates[0]) < 0.001 && 
                   Math.abs(latLng.lng - area.coordinates[1]) < 0.001;
        });
        
        if (marker) {
            marker.openPopup();
        }
        
        // Scroll to map section
        document.getElementById('map-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    updateSelectedAreaInfo(area) {
        const infoPanel = document.getElementById('selected-area-info');
        const detailsDiv = document.getElementById('selected-area-details');
        
        detailsDiv.innerHTML = `
            <div class="selected-area-content">
                <h6 class="fw-bold">${area.name}</h6>
                <div class="row g-2">
                    <div class="col-6">
                        <small class="text-muted">Diversion Rate</small>
                        <div class="rate-badge rate-${DataUtils.getRateCategory(area.diversionRate)}">${area.diversionRate}%</div>
                    </div>
                    <div class="col-6">
                        <small class="text-muted">Total Cases</small>
                        <div class="fw-bold">${DataUtils.formatNumber(area.totalCases)}</div>
                    </div>
                    <div class="col-6">
                        <small class="text-muted">Diversions</small>
                        <div class="text-success fw-bold">${DataUtils.formatNumber(area.diversions)}</div>
                    </div>
                    <div class="col-6">
                        <small class="text-muted">Charges</small>
                        <div class="text-danger fw-bold">${DataUtils.formatNumber(area.charges)}</div>
                    </div>
                </div>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary w-100" onclick="app.locateOnMap('${area.name}')">
                        <i class="fas fa-map-marker-alt me-1"></i>Show on Map
                    </button>
                </div>
            </div>
        `;
        
        infoPanel.style.display = 'block';
    }

    highlightTableRow(areaName) {
        // Remove existing highlights
        document.querySelectorAll('#diversions-table tbody tr').forEach(row => {
            row.classList.remove('table-warning');
        });
        
        // Add highlight to matching row
        const rows = document.querySelectorAll('#diversions-table tbody tr');
        rows.forEach(row => {
            const nameCell = row.querySelector('td strong');
            if (nameCell && nameCell.textContent === areaName) {
                row.classList.add('table-warning');
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Update statistics display
    updateStatistics() {
        try {
            const stats = DataUtils.getStatistics();
            
            const totalCasesEl = document.getElementById('total-cases');
            const totalDiversionsEl = document.getElementById('total-diversions');
            const totalChargesEl = document.getElementById('total-charges');
            const avgDiversionRateEl = document.getElementById('avg-diversion-rate');
            
            if (!totalCasesEl || !totalDiversionsEl || !totalChargesEl || !avgDiversionRateEl) {
                console.error('Statistics elements not found in DOM');
                return;
            }
            
            totalCasesEl.textContent = DataUtils.formatNumber(stats.totalCases);
            totalDiversionsEl.textContent = DataUtils.formatNumber(stats.totalDiversions);
            totalChargesEl.textContent = DataUtils.formatNumber(stats.totalCharges);
            avgDiversionRateEl.textContent = DataUtils.formatPercentage(stats.avgDiversionRate);
            
        } catch (error) {
            console.error('Error updating statistics:', error);
        }
    }

    // Setup additional event listeners
    setupEventListeners() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Simple chart info function
function showChartInfo(element) {
    const message = "Shows how many of the 58 NSW Police areas fall into each diversion rate category.\n\n" +
                   "Green = Good performance (high diversions)\n" +
                   "Red = Poor performance (mostly charges)\n\n" +
                   "Helps identify if most areas are using diversions effectively or if there are systemic issues.";
    alert(message);
}

// Initialize the application
let app;

// Ensure the app is only initialized once when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        app = new DiversionsApp();
    });
} else {
    app = new DiversionsApp();
}

// Global helper functions for onclick handlers
window.app = {
    selectArea: function(areaName) {
        if (app) app.selectArea(areaName);
    },
    locateOnMap: function(areaName) {
        if (app) app.locateOnMap(areaName);
    }
};
