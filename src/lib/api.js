export const api = ({ url, method = 'GET', body }) => {
	const token = localStorage.getItem('accessToken');

	return fetch(`http://localhost:3001${url}`, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : undefined,
		},
		body: body ? JSON.stringify(body) : undefined,
	});
};
