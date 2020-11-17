import Settings from '../settings';
import axios from 'axios';

const settings = Settings.load();

export default axios.create({
    baseURL: `${settings.baseUrl}`,
});
