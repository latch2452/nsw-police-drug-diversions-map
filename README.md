# NSW Police Diversions Map

An interactive web application that visualizes NSW Police diversions data across Police Area Commands (PACs) and Police Districts (PDs). The application shows the percentage of people diverted versus those charged since the diversion scheme began.

## ⚠️ Important Disclaimers

**Data Attribution**: This visualization displays NSW Police drug diversion data obtained through research conducted by **The Hon. Cate Faehrmann MLC**, NSW Greens Party Member of Parliament.

**Independence Notice**: This is an independent public interest project and is not affiliated with, endorsed by, or sponsored by NSW Police Force. NSW Police Force name and associated trademarks are owned by the Crown in right of the State of New South Wales.

**Purpose**: Created for public transparency and educational purposes regarding drug diversion practices across NSW Police Area Commands and Police Districts.

## Features

### 🗺️ Interactive Map
- **Leaflet-based mapping** with responsive circle markers
- **Color-coded visualization** based on diversion rates:
  - � High (≥30%) - Green (Good performance)
  - 🟠 Medium (15-29%) - Orange  
  - � Low (5-14%) - Orange-Red
  - � Very Low (<5%) - Red (Poor performance)
- **Dynamic circle sizing** based on total cases and diversion rate
- **Interactive popups** with detailed area statistics
- **Optional heatmap layer** for trend visualization
- **Search and filter capabilities**

### 📊 Data Analytics
- **Comprehensive data table** with sorting and filtering
- **Statistical dashboard** with multiple chart types:
  - Top 10 highest diversion rates (bar chart)
  - Distribution by rate categories (doughnut chart)
  - Geographic divide: Inner city vs outer areas (bar chart)
  - Charges vs diversions comparison (bar chart)
- **Real-time statistics** showing totals and averages

### 💻 Modern Web Interface
- **Responsive Bootstrap 5 design** 
- **Mobile-friendly navigation**
- **Accessible UI components**
- **Print-friendly styling**

## Data Overview

The application includes data for **58 Police Areas** across NSW:
- **Total Cases**: 16,565
- **Total Diversions**: 1,474 
- **Total Charges**: 15,091
- **Average Diversion Rate**: 8.9%

### Top Performing Areas (Highest Diversion Rates)
1. Auburn PAC - 31.9%
2. Sydney City PAC - 31.3%
3. Marine Area Command - 27.3%
4. Eastern Beaches PAC - 26.3%
5. Surry Hills PAC - 17.4%

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js with plugins
- **UI Framework**: Bootstrap 5
- **Data Tables**: DataTables.js
- **Charts**: Chart.js
- **Icons**: Font Awesome 6

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 14+ (for development server)

### Local Development

1. **Clone or download** the project files
2. **Install dependencies** (optional):
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm start
   # or
   npx http-server . -p 8080 -o
   ```
4. **Open browser** to `http://localhost:8080`

### Direct File Access
The application is a static website and can be opened directly by opening `index.html` in a web browser.

## Deployment

### Azure Static Web Apps
This application is optimized for deployment to Azure Static Web Apps:

1. **Initialize Azure SWA**:
   ```bash
   npx swa init --yes
   ```

2. **Build the application**:
   ```bash
   npx swa build
   ```

3. **Deploy to Azure**:
   ```bash
   npx swa deploy --env production
   ```

### Other Hosting Options
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect repository for automatic deployments
- **Traditional Web Hosting**: Upload all files to web server

## Project Structure

```
nsw-police-diversions-map/
├── index.html              # Main application page
├── css/
│   └── styles.css         # Custom styling
├── js/
│   ├── data.js           # NSW Police diversions dataset
│   └── app.js            # Main application logic
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## Data Sources & Attribution

- **Primary Data Source**: NSW Police Force (official records)
- **Research Attribution**: The Hon. Cate Faehrmann MLC, NSW Greens Party
- **Data Access**: Obtained through parliamentary research and public interest inquiries
- **Coverage**: Statewide across all Police Area Commands and Districts
- **Period**: Since the diversion scheme began
- **Last Updated**: August 2025
- **Geographic Data**: Approximate locations only

**Important**: This data was made available through the dedicated research efforts of The Hon. Cate Faehrmann MLC in the public interest.

## Usage Guide

### Map Navigation
- **Zoom**: Use mouse wheel or zoom controls
- **Pan**: Click and drag to move around
- **Markers**: Click on circles for detailed information
- **Search**: Use the search box to find specific areas
- **Filters**: Filter by diversion rate categories

### Data Analysis
- **Table Sorting**: Click column headers to sort
- **Charts**: Hover over chart elements for details
- **Area Selection**: Click markers or table rows for details

### Responsive Design
The application automatically adapts to different screen sizes:
- **Desktop**: Full feature set with side panel
- **Tablet**: Stacked layout with collapsible panels
- **Mobile**: Touch-optimized navigation and controls

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This project welcomes contributions and suggestions. Areas for enhancement:

1. **Boundary Data**: Addition of actual PAC/PD boundary polygons
2. **Historical Data**: Time-series analysis capabilities  
3. **Advanced Analytics**: Statistical modeling and predictions
4. **Performance**: Optimization for larger datasets
5. **Accessibility**: Enhanced screen reader support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **The Hon. Cate Faehrmann MLC** for conducting the research that made this data publicly available
- **NSW Police Force** for maintaining the diversions data records
- **NSW Greens Party** for supporting public transparency initiatives
- **OpenStreetMap** contributors for mapping infrastructure
- **Leaflet.js** community for mapping libraries
- **Bootstrap** team for UI framework components

## Legal Notice

NSW Police Force trademarks and intellectual property are owned by the Crown in right of the State of New South Wales. This independent project is created for public interest purposes and educational use.

## Contact

For questions, suggestions, or issues, please create an issue in the project repository.

---

*This application is for informational purposes only. All location coordinates are approximate. Please refer to official NSW Police sources for authoritative data.*
