// NSW Police Diversions Data
// Data shows the percentage of people diverted v those charged since the scheme began

const nswDiversionsData = [
    {
        name: "Auburn PAC",
        diversions: 173,
        charges: 370,
        totalCases: 543,
        diversionRate: 31.9,
        chargeRate: 68.1,
        coordinates: [-33.85, 151.03],
        type: "PAC"
    },
    {
        name: "Sydney City PAC",
        diversions: 297,
        charges: 653,
        totalCases: 950,
        diversionRate: 31.3,
        chargeRate: 68.7,
        coordinates: [-33.8688, 151.2093],
        type: "PAC"
    },
    {
        name: "Marine Area Command",
        diversions: 6,
        charges: 16,
        totalCases: 22,
        diversionRate: 27.3,
        chargeRate: 72.7,
        coordinates: [-33.86, 151.24],
        type: "Area Command"
    },
    {
        name: "Eastern Beaches PAC",
        diversions: 90,
        charges: 252,
        totalCases: 342,
        diversionRate: 26.3,
        chargeRate: 73.7,
        coordinates: [-33.95, 151.24],
        type: "PAC"
    },
    {
        name: "Surry Hills PAC",
        diversions: 79,
        charges: 375,
        totalCases: 454,
        diversionRate: 17.4,
        chargeRate: 82.6,
        coordinates: [-33.884, 151.212],
        type: "PAC"
    },
    {
        name: "South Sydney PAC",
        diversions: 67,
        charges: 406,
        totalCases: 473,
        diversionRate: 14.2,
        chargeRate: 85.8,
        coordinates: [-33.923, 151.19],
        type: "PAC"
    },
    {
        name: "Barrier PD",
        diversions: 25,
        charges: 173,
        totalCases: 198,
        diversionRate: 12.6,
        chargeRate: 87.4,
        coordinates: [-32.2, 141.6],
        type: "PD"
    },
    {
        name: "The Hume PD",
        diversions: 36,
        charges: 266,
        totalCases: 302,
        diversionRate: 11.9,
        chargeRate: 88.1,
        coordinates: [-35.12, 147.36],
        type: "PD"
    },
    {
        name: "Northern Beaches PAC",
        diversions: 16,
        charges: 128,
        totalCases: 144,
        diversionRate: 11.1,
        chargeRate: 88.9,
        coordinates: [-33.752, 151.289],
        type: "PAC"
    },
    {
        name: "Sutherland Shire PAC",
        diversions: 30,
        charges: 273,
        totalCases: 303,
        diversionRate: 9.9,
        chargeRate: 90.1,
        coordinates: [-34.03, 151.06],
        type: "PAC"
    },
    {
        name: "Leichhardt PAC",
        diversions: 17,
        charges: 194,
        totalCases: 211,
        diversionRate: 8.1,
        chargeRate: 91.9,
        coordinates: [-33.883, 151.156],
        type: "PAC"
    },
    {
        name: "North Shore PAC",
        diversions: 14,
        charges: 162,
        totalCases: 176,
        diversionRate: 8.0,
        chargeRate: 92.0,
        coordinates: [-33.796, 151.183],
        type: "PAC"
    },
    {
        name: "Hawkesbury PAC",
        diversions: 10,
        charges: 133,
        totalCases: 143,
        diversionRate: 7.0,
        chargeRate: 93.0,
        coordinates: [-33.615, 150.81],
        type: "PAC"
    },
    {
        name: "Kings Cross PAC",
        diversions: 25,
        charges: 330,
        totalCases: 355,
        diversionRate: 7.0,
        chargeRate: 93.0,
        coordinates: [-33.873, 151.225],
        type: "PAC"
    },
    {
        name: "Liverpool City PAC",
        diversions: 55,
        charges: 746,
        totalCases: 801,
        diversionRate: 6.9,
        chargeRate: 93.1,
        coordinates: [-33.92, 150.93],
        type: "PAC"
    },
    {
        name: "The Hills PAC",
        diversions: 6,
        charges: 81,
        totalCases: 87,
        diversionRate: 6.9,
        chargeRate: 93.1,
        coordinates: [-33.73, 151.0],
        type: "PAC"
    },
    {
        name: "Wollongong PD",
        diversions: 34,
        charges: 458,
        totalCases: 492,
        diversionRate: 6.9,
        chargeRate: 93.1,
        coordinates: [-34.424, 150.893],
        type: "PD"
    },
    {
        name: "Oxley PD",
        diversions: 19,
        charges: 260,
        totalCases: 279,
        diversionRate: 6.8,
        chargeRate: 93.2,
        coordinates: [-31.4, 153.5],
        type: "PD"
    },
    {
        name: "Murray River PD",
        diversions: 30,
        charges: 427,
        totalCases: 457,
        diversionRate: 6.6,
        chargeRate: 93.4,
        coordinates: [-35.9, 146.9],
        type: "PD"
    },
    {
        name: "Tweed-Byron PD",
        diversions: 31,
        charges: 455,
        totalCases: 486,
        diversionRate: 6.4,
        chargeRate: 93.6,
        coordinates: [-28.5, 153.5],
        type: "PD"
    },
    {
        name: "Riverina PD",
        diversions: 29,
        charges: 430,
        totalCases: 459,
        diversionRate: 6.3,
        chargeRate: 93.7,
        coordinates: [-34.7, 146.0],
        type: "PD"
    },
    {
        name: "Monaro PD",
        diversions: 10,
        charges: 157,
        totalCases: 167,
        diversionRate: 6.0,
        chargeRate: 94.0,
        coordinates: [-36.2, 149.1],
        type: "PD"
    },
    {
        name: "Central West PD",
        diversions: 18,
        charges: 294,
        totalCases: 312,
        diversionRate: 5.8,
        chargeRate: 94.2,
        coordinates: [-33.4, 149.6],
        type: "PD"
    },
    {
        name: "Eastern Suburbs PAC",
        diversions: 19,
        charges: 316,
        totalCases: 335,
        diversionRate: 5.7,
        chargeRate: 94.3,
        coordinates: [-33.891, 151.27],
        type: "PAC"
    },
    {
        name: "Lake Illawarra PD",
        diversions: 26,
        charges: 439,
        totalCases: 465,
        diversionRate: 5.6,
        chargeRate: 94.4,
        coordinates: [-34.55, 150.86],
        type: "PD"
    },
    {
        name: "Central North PD",
        diversions: 6,
        charges: 116,
        totalCases: 122,
        diversionRate: 4.9,
        chargeRate: 95.1,
        coordinates: [-31.9, 151.7],
        type: "PD"
    },
    {
        name: "Inner West PAC",
        diversions: 15,
        charges: 320,
        totalCases: 335,
        diversionRate: 4.5,
        chargeRate: 95.5,
        coordinates: [-33.89, 151.15],
        type: "PAC"
    },
    {
        name: "Murrumbidgee PD",
        diversions: 8,
        charges: 178,
        totalCases: 186,
        diversionRate: 4.3,
        chargeRate: 95.7,
        coordinates: [-34.0, 146.4],
        type: "PD"
    },
    {
        name: "Brisbane Water PD",
        diversions: 11,
        charges: 266,
        totalCases: 277,
        diversionRate: 4.0,
        chargeRate: 96.0,
        coordinates: [-33.4, 151.3],
        type: "PD"
    },
    {
        name: "Orana-Mid Western PD",
        diversions: 17,
        charges: 413,
        totalCases: 430,
        diversionRate: 4.0,
        chargeRate: 96.0,
        coordinates: [-32.3, 148.6],
        type: "PD"
    },
    {
        name: "Richmond PD",
        diversions: 13,
        charges: 322,
        totalCases: 335,
        diversionRate: 3.9,
        chargeRate: 96.1,
        coordinates: [-28.8, 153.6],
        type: "PD"
    },
    {
        name: "Blue Mountains PAC",
        diversions: 4,
        charges: 103,
        totalCases: 107,
        diversionRate: 3.7,
        chargeRate: 96.3,
        coordinates: [-33.714, 150.311],
        type: "PAC"
    },
    {
        name: "South Coast PD",
        diversions: 15,
        charges: 389,
        totalCases: 404,
        diversionRate: 3.7,
        chargeRate: 96.3,
        coordinates: [-35.7, 150.1],
        type: "PD"
    },
    {
        name: "Ku-ring-gai PAC",
        diversions: 4,
        charges: 106,
        totalCases: 110,
        diversionRate: 3.6,
        chargeRate: 96.4,
        coordinates: [-33.703, 151.099],
        type: "PAC"
    },
    {
        name: "St George PAC",
        diversions: 13,
        charges: 403,
        totalCases: 416,
        diversionRate: 3.1,
        chargeRate: 96.9,
        coordinates: [-33.967, 151.102],
        type: "PAC"
    },
    {
        name: "New England PD",
        diversions: 8,
        charges: 265,
        totalCases: 273,
        diversionRate: 2.9,
        chargeRate: 97.1,
        coordinates: [-30.5, 151.7],
        type: "PD"
    },
    {
        name: "Mid North Coast PD",
        diversions: 8,
        charges: 330,
        totalCases: 338,
        diversionRate: 2.4,
        chargeRate: 97.6,
        coordinates: [-31.6, 152.9],
        type: "PD"
    },
    {
        name: "Parramatta PAC",
        diversions: 13,
        charges: 633,
        totalCases: 646,
        diversionRate: 2.0,
        chargeRate: 98.0,
        coordinates: [-33.813, 151.003],
        type: "PAC"
    },
    {
        name: "Coffs-Clarence PD",
        diversions: 10,
        charges: 518,
        totalCases: 528,
        diversionRate: 1.9,
        chargeRate: 98.1,
        coordinates: [-30.3, 153.1],
        type: "PD"
    },
    {
        name: "Lake Macquarie PD",
        diversions: 5,
        charges: 275,
        totalCases: 280,
        diversionRate: 1.8,
        chargeRate: 98.2,
        coordinates: [-33.0, 151.6],
        type: "PD"
    },
    {
        name: "Bankstown PAC",
        diversions: 9,
        charges: 506,
        totalCases: 515,
        diversionRate: 1.7,
        chargeRate: 98.3,
        coordinates: [-33.918, 151.033],
        type: "PAC"
    },
    {
        name: "Burwood PAC",
        diversions: 4,
        charges: 253,
        totalCases: 257,
        diversionRate: 1.6,
        chargeRate: 98.4,
        coordinates: [-33.873, 151.104],
        type: "PAC"
    },
    {
        name: "Hunter Valley PD",
        diversions: 4,
        charges: 294,
        totalCases: 298,
        diversionRate: 1.3,
        chargeRate: 98.7,
        coordinates: [-32.7, 151.2],
        type: "PD"
    },
    {
        name: "Newcastle City PD",
        diversions: 7,
        charges: 590,
        totalCases: 597,
        diversionRate: 1.2,
        chargeRate: 98.8,
        coordinates: [-32.926, 151.776],
        type: "PD"
    },
    {
        name: "Tuggerah Lakes PD",
        diversions: 4,
        charges: 328,
        totalCases: 332,
        diversionRate: 1.2,
        chargeRate: 98.8,
        coordinates: [-33.3, 151.5],
        type: "PD"
    },
    {
        name: "Cumberland PAC",
        diversions: 7,
        charges: 656,
        totalCases: 663,
        diversionRate: 1.1,
        chargeRate: 98.9,
        coordinates: [-33.835, 150.992],
        type: "PAC"
    },
    {
        name: "Mt Druitt PAC",
        diversions: 6,
        charges: 524,
        totalCases: 530,
        diversionRate: 1.1,
        chargeRate: 98.9,
        coordinates: [-33.768, 150.818],
        type: "PAC"
    },
    {
        name: "Chifley PD",
        diversions: 4,
        charges: 395,
        totalCases: 399,
        diversionRate: 1.0,
        chargeRate: 99.0,
        coordinates: [-33.4, 150.0],
        type: "PD"
    },
    {
        name: "Fairfield City PAC",
        diversions: 6,
        charges: 657,
        totalCases: 663,
        diversionRate: 0.9,
        chargeRate: 99.1,
        coordinates: [-33.87, 150.95],
        type: "PAC"
    },
    {
        name: "Nepean PAC",
        diversions: 5,
        charges: 566,
        totalCases: 571,
        diversionRate: 0.9,
        chargeRate: 99.1,
        coordinates: [-33.75, 150.69],
        type: "PAC"
    },
    {
        name: "Riverstone PAC",
        diversions: 1,
        charges: 121,
        totalCases: 122,
        diversionRate: 0.8,
        chargeRate: 99.2,
        coordinates: [-33.68, 150.87],
        type: "PAC"
    },
    {
        name: "Ryde PAC",
        diversions: 1,
        charges: 120,
        totalCases: 121,
        diversionRate: 0.8,
        chargeRate: 99.2,
        coordinates: [-33.817, 151.106],
        type: "PAC"
    },
    {
        name: "Camden PAC",
        diversions: 1,
        charges: 176,
        totalCases: 177,
        diversionRate: 0.6,
        chargeRate: 99.4,
        coordinates: [-34.05, 150.69],
        type: "PAC"
    },
    {
        name: "Campsie PAC",
        diversions: 1,
        charges: 162,
        totalCases: 163,
        diversionRate: 0.6,
        chargeRate: 99.4,
        coordinates: [-33.912, 151.1],
        type: "PAC"
    },
    {
        name: "Port Stephens-Hunter PD",
        diversions: 2,
        charges: 340,
        totalCases: 342,
        diversionRate: 0.6,
        chargeRate: 99.4,
        coordinates: [-32.7, 152.0],
        type: "PD"
    },
    {
        name: "Blacktown PAC",
        diversions: 2,
        charges: 417,
        totalCases: 419,
        diversionRate: 0.5,
        chargeRate: 99.5,
        coordinates: [-33.769, 150.908],
        type: "PAC"
    },
    {
        name: "Manning-Great Lakes PD",
        diversions: 1,
        charges: 290,
        totalCases: 291,
        diversionRate: 0.3,
        chargeRate: 99.7,
        coordinates: [-31.9, 152.4],
        type: "PD"
    },
    {
        name: "Campbelltown City PAC",
        diversions: 1,
        charges: 449,
        totalCases: 450,
        diversionRate: 0.2,
        chargeRate: 99.8,
        coordinates: [-34.07, 150.81],
        type: "PAC"
    }
];

// Helper functions for data processing
const DataUtils = {
    // Get color based on diversion rate
    getColorByRate: function(rate) {
        if (rate >= 30) return '#2e7d32';      // High - Green (Good)
        if (rate >= 15) return '#ff9800';      // Medium - Orange
        if (rate >= 5) return '#ff5722';       // Low - Orange-Red
        return '#d32f2f';                      // Very Low - Red (Bad)
    },

    // Get rate category
    getRateCategory: function(rate) {
        if (rate >= 30) return 'high';
        if (rate >= 15) return 'medium';
        if (rate >= 5) return 'low';
        return 'very-low';
    },

    // Get rate category label
    getRateCategoryLabel: function(rate) {
        if (rate >= 30) return 'High (≥30%)';
        if (rate >= 15) return 'Medium (15-29%)';
        if (rate >= 5) return 'Low (5-14%)';
        return 'Very Low (<5%)';
    },

    // Calculate circle radius based on total cases and rate
    getCircleRadius: function(totalCases, rate) {
        const baseRadius = Math.sqrt(totalCases) * 0.8;
        const rateMultiplier = 1 + (rate / 100);
        return Math.max(5, Math.min(30, baseRadius * rateMultiplier));
    },

    // Get statistics
    getStatistics: function() {
        const totalCases = nswDiversionsData.reduce((sum, item) => sum + item.totalCases, 0);
        const totalDiversions = nswDiversionsData.reduce((sum, item) => sum + item.diversions, 0);
        const totalCharges = nswDiversionsData.reduce((sum, item) => sum + item.charges, 0);
        const avgDiversionRate = nswDiversionsData.reduce((sum, item) => sum + item.diversionRate, 0) / nswDiversionsData.length;

        return {
            totalCases,
            totalDiversions,
            totalCharges,
            avgDiversionRate: Math.round(avgDiversionRate * 10) / 10
        };
    },

    // Filter data by rate category
    filterByRate: function(category) {
        if (category === 'all') return nswDiversionsData;
        
        return nswDiversionsData.filter(item => {
            const itemCategory = this.getRateCategory(item.diversionRate);
            return itemCategory === category;
        });
    },

    // Search areas by name
    searchAreas: function(searchTerm) {
        if (!searchTerm) return nswDiversionsData;
        
        const term = searchTerm.toLowerCase();
        return nswDiversionsData.filter(item => 
            item.name.toLowerCase().includes(term)
        );
    },

    // Get top areas by diversion rate
    getTopDiversionAreas: function(limit = 10) {
        return [...nswDiversionsData]
            .sort((a, b) => b.diversionRate - a.diversionRate)
            .slice(0, limit);
    },

    // Get bottom areas by diversion rate
    getBottomDiversionAreas: function(limit = 10) {
        return [...nswDiversionsData]
            .sort((a, b) => a.diversionRate - b.diversionRate)
            .slice(0, limit);
    },

    // Get areas grouped by rate category
    getAreasByCategory: function() {
        const categories = {
            'high': [],
            'medium': [],
            'low': [],
            'very-low': []
        };

        nswDiversionsData.forEach(item => {
            const category = this.getRateCategory(item.diversionRate);
            categories[category].push(item);
        });

        return categories;
    },

    // Format number with commas
    formatNumber: function(num) {
        return num.toLocaleString();
    },

    // Format percentage
    formatPercentage: function(num) {
        return `${num}%`;
    },

    // Get the "Diversion Line" - geographic divide between high and low diversion areas
    getDiversionLine: function() {
        // Inner city/eastern suburbs areas with higher diversions
        const innerCityAreas = nswDiversionsData.filter(area => {
            const lat = area.coordinates[0];
            const lng = area.coordinates[1];
            // Rough boundary: inner Sydney, eastern suburbs, and northern beaches
            return (lat > -34.1 && lat < -33.7 && lng > 150.9 && lng < 151.3) || 
                   (area.name.includes('Eastern') || area.name.includes('Northern Beaches') || 
                    area.name.includes('Sydney City') || area.name.includes('Auburn'));
        });

        // Western/outer suburban areas with lower diversions
        const outerAreas = nswDiversionsData.filter(area => {
            return !innerCityAreas.includes(area);
        });

        const innerAvg = innerCityAreas.reduce((sum, area) => sum + area.diversionRate, 0) / innerCityAreas.length;
        const outerAvg = outerAreas.reduce((sum, area) => sum + area.diversionRate, 0) / outerAreas.length;

        return {
            innerCityAreas,
            outerAreas,
            innerAverage: Math.round(innerAvg * 10) / 10,
            outerAverage: Math.round(outerAvg * 10) / 10,
            diversionGap: Math.round((innerAvg - outerAvg) * 10) / 10
        };
    },

    // Get geographic analysis of diversion patterns
    getGeographicAnalysis: function() {
        const sydneyMetro = nswDiversionsData.filter(area => {
            const lat = area.coordinates[0];
            const lng = area.coordinates[1];
            // Sydney metropolitan area roughly
            return lat > -34.3 && lat < -33.4 && lng > 150.5 && lng < 151.5;
        });

        const regional = nswDiversionsData.filter(area => {
            const lat = area.coordinates[0];
            const lng = area.coordinates[1];
            return !(lat > -34.3 && lat < -33.4 && lng > 150.5 && lng < 151.5);
        });

        const metroAvg = sydneyMetro.reduce((sum, area) => sum + area.diversionRate, 0) / sydneyMetro.length;
        const regionalAvg = regional.reduce((sum, area) => sum + area.diversionRate, 0) / regional.length;

        return {
            sydneyMetro,
            regional,
            metroAverage: Math.round(metroAvg * 10) / 10,
            regionalAverage: Math.round(regionalAvg * 10) / 10,
            metroVsRegionalGap: Math.round((metroAvg - regionalAvg) * 10) / 10
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { nswDiversionsData, DataUtils };
}
