import axios from "axios";


const api = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});


api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 405 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await axios.post(
					refreshTokenRoute,
					{},
					{
						withCredentials: true,
					},
				);

				return api.request(originalRequest);
			} catch (error) {
				console.log(error.msg);
			}
		}
		throw error;
	},
);

export default api;