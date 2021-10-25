import App from './App.svelte';
import config from '../config/nyc-weather';
import axios from 'axios';

const getPointsOfWeather = async () => {
	const parseData = (data) => {
		const details = data.detailedForecast;
		if (!details) return "";
		return { desc: data.name, details };
	};
	const rset = await axios.get(config.url);
	const properties = rset.data.properties || {};
	return (properties.periods || []).slice(0, 10).map(parseData);
}

function getTimeStamp() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	let minutes = "0" + date.getMinutes();
	minutes = minutes.substr(-2);
	let seconds = "0" + date.getSeconds();
	seconds = seconds.substr(-2);
	return `${month}/${day}/${year} 
    ${hours}:${minutes}:${seconds}`;
}

// -- main app -- //

const app = new App({
	target: document.body,
	props: {
		getPointsOfWeather,
		getTimeStamp,
	}
});

export default app;
