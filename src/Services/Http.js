//#region Global Imports
import 'whatwg-fetch';
import { stringify } from 'query-string';
//#endregion Global Imports

const BaseUrl = `${process.env.API_URL}/api`;

export const Http = {
	Request: async (
		methodType,
		url,
		params,
		payload,
	) => {
		return new Promise((resolve, reject) => {
			const query = params ? `?${stringify({ ...params, api_key: API_KEY })}` : '';

			window.fetch(`${BaseUrl}${url}${query}`, {
				body: JSON.stringify(payload),
				cache: 'no-cache',
				headers: {
					'content-type': 'application/json',
				},
				method: `${methodType}`,
			})
				.then(async response => {
					if (response.status === 200) {
						return response.json().then(resolve);
					} else {
						return reject(response);
					}
				})
				.catch(e => {
					reject(e);
				});
		});
	},
};