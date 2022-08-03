import CardanoUtils from '@jshear/cardano-utils';
import * as Lucid from 'lucid-cardano';
import WalletConnection from './modules/connection.js';
import WalletSigning from './modules/signing.js';

const defaultLogger = {
    info: console.log,
    warn: console.log,
    error: console.log
};

const nullLogger = {
    info: () => {},
    warn: () => {},
    error: () => {}
};

const CardanoDAppUtils = (function(testnet, customLog) {

    // If customLog is null, logging is disabled -- if customLog is not provided, a default logger is used
    const log = (customLog === undefined) ? defaultLogger : (customLog ? customLog : nullLogger);

    const state = {};
    state.testnet = !!testnet;
    state.cardanoUtils = CardanoUtils(state.testnet, log);
    state.walletApi = null;

    // Public interface
    return {
        ...state.cardanoUtils,
        wallet: {
            connection: WalletConnection,
            sig: WalletSigning
        },
        lucid: Lucid
    };
});

export default (testnet, customLog) => new CardanoDAppUtils(testnet, customLog);
