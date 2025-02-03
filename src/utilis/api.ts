import axios from 'axios';

import { APIUrls } from './urls';


class APIClass extends APIUrls {
	constructor() {
		super()
	}

	private async getOptions(query: any, headers = {}) {
		if (!query) {
			query = {};
			
		}
		let token= localStorage.getItem("token")
		const sendHeaders:any = {}
		if (token) {
			sendHeaders.Authorization = 'Bearer ' + token;
		}
		const options = {
			params: query,
			headers: { ...sendHeaders, ...headers },
		};

		return options;
	}

	private logRequestAndResponse(
		url: string,
		method: string,
		data: any,
		options: any,
		response: any,
		isSuccess: boolean
	) {
		// console.group(`API ${method.toUpperCase()} - ${url}`);
		// console.log('Request Payload:', { data, options });
		// console.log(isSuccess ? 'Response Data:' : 'Error Response:', response);
		// console.groupEnd();
	}

	getData(url: string, query = {}): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const options = await this.getOptions(query);
				const response = await axios.get(url, { ...options });
				this.logRequestAndResponse(url, 'GET', null, options, response?.data, true);
				// HeadersHandler.handleResHeaders(response, 'success');
				resolve(response?.data || response);
			} catch (error) {
				this.logRequestAndResponse(url, 'GET', null, null, error, false);
				// HeadersHandler.handleResHeaders(error?.response || error, 'error');
				reject(error);
			}
		});
	}

	postData(url: string, data: any, query = {}, headers = {}): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const options = await this.getOptions(query, headers);
				const response = await axios.post(url, data, { ...options });
				this.logRequestAndResponse(url, 'POST', data, options, response?.data, true);
				// HeadersHandler.handleResHeaders(response, 'success');
				resolve(response?.data || response);
			} catch (error) {
				this.logRequestAndResponse(url, 'POST', data, null, error, false);
				// HeadersHandler.handleResHeaders(error?.response || error, 'error');
				reject(error);
			}
		});
	}

	putData(url: string, data: any, query = {}): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const options = await this.getOptions(query);
				const response = await axios.put(url, data, { ...options });
				this.logRequestAndResponse(url, 'PUT', data, options, response?.data, true);
				// HeadersHandler.handleResHeaders(response, 'success');
				resolve(response?.data || response);
			} catch (error) {
				this.logRequestAndResponse(url, 'PUT', data, null, error, false);
				// HeadersHandler.handleResHeaders(error?.response || error, 'error');
				reject(error);
			}
		});
	}

	deleteData(url: string, query = {}): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const options = await this.getOptions(query);
				const response = await axios.delete(url, { ...options });
				this.logRequestAndResponse(url, 'DELETE', null, options, response?.data, true);
				// HeadersHandler.handleResHeaders(response, 'success');
				resolve(response?.data || response);
			} catch (error) {
				this.logRequestAndResponse(url, 'DELETE', null, null, error, false);
				// HeadersHandler.handleResHeaders(error?.response || error, 'error');
				reject(error);
			}
		});
	}
}

export const API = new APIClass();
