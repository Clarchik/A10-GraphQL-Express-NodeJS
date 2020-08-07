import app from './main';
import { CONFIG } from './Configuration/config';


app.listen(CONFIG.APP_PORT, () => {
    console.log(`App is running on port ${CONFIG.APP_PORT}`);
});




