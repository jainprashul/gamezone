let Config = {
    username: 'User',
    walletBal: 0,
    winningAmt: 0,
    matches: 0, 
    winMatches: 0
}

/** Check & Initailize Configuration */
const configApp = () => {
    let configuration = localStorage.getItem('config')
    if (!configuration) {
        localStorage.setItem("config", JSON.stringify(Config));
    }
    let currentConfig = JSON.parse(configuration)
    console.log(currentConfig);
};

/** Change Configuration Object 
 * @param key  config[key]
 * @param val  value
*/
const setConfig = (key , val) => {
    let c = getConfig();
    c[key] = val;
    // console.log(configure);
    localStorage.setItem('config', JSON.stringify(c))
    return val;
}

/** Get the Configuration Object
 * @default config
 */
 const getConfig = () => {
    let c = localStorage.getItem('config')
    return JSON.parse(c)
}

const resetConfig = () => {
    localStorage.removeItem('config');
    configApp();
}

export {
    setConfig , getConfig , resetConfig
}
export default configApp;