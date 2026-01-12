import { AppStrings } from '../core/constants/strings.js';
import { ApiClient } from './api_client.js';

/**
 * Dashboard Logic
 * Handles DOM manipulation and data fetching.
 */
class Dashboard {
    constructor() {
        this.init();
    }

    async init() {
        this.renderStaticContent();
        this.attachEventListeners();
        await this.loadDashboardData();
    }

    renderStaticContent() {
        // Set titles and static strings
        document.getElementById('app-title').textContent = AppStrings.appName;
        document.getElementById('welcome-title').textContent = AppStrings.welcomeTitle;
        document.getElementById('welcome-subtitle').textContent = AppStrings.welcomeSubtitle;
        
        // Nav items
        document.getElementById('nav-dashboard').textContent = AppStrings.navDashboard;
        document.getElementById('nav-analytics').textContent = AppStrings.navAnalytics;
        document.getElementById('nav-reports').textContent = AppStrings.navReports;
    }

    attachEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadDashboardData());
            refreshBtn.textContent = AppStrings.refreshData;
        }
    }

    async loadDashboardData() {
        const statusEl = document.getElementById('status-indicator');
        const contentEl = document.getElementById('dashboard-content');
        
        try {
            statusEl.textContent = AppStrings.loading;
            
            // Example API call
            const data = await ApiClient.get('/dashboard/stats');
            
            this.renderStats(data);
            statusEl.textContent = ''; // Clear loading
        } catch (error) {
            statusEl.textContent = AppStrings.error;
            statusEl.style.color = 'var(--color-danger)';
        }
    }

    renderStats(data) {
        const container = document.getElementById('stats-grid');
        container.innerHTML = ''; // Clear current

        // Create cards dynamically
        data.metrics.forEach(metric => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${metric.label}</h3>
                </div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary);">
                    ${metric.value}
                </div>
                <div style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-top: 8px;">
                    ${metric.change}
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
