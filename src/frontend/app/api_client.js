import { AppConfig } from '../core/constants/config.js';

/**
 * ApiClient
 * Wrapper around fetch API to handle requests to the Python backend.
 */
export class ApiClient {
    static async get(endpoint) {
        try {
            const response = await fetch(`${AppConfig.apiBaseUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Fetch Error:', error);
            throw error;
        }
    }

    static async post(endpoint, data) {
        try {
            const response = await fetch(`${AppConfig.apiBaseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Post Error:', error);
            throw error;
        }
    }
}
