const supportedWallets = [
    'nami',
    'ccvault',
    'flint'
];

class DAppConnection {

    _walletExists(wallet) {
        if (!wallet || typeof wallet !== 'string') throw new Error('Invalid wallet ID');
        return !!window.cardano && !!window.cardano[wallet];
    }

    getAvailableWallets() {
        return supportedWallets.filter(wallet => {
            return this._walletExists(wallet);
        });
    }

    getWalletName(wallet) {
        if (!this._walletExists(wallet)) throw new Error('Wallet is not installed');
        return window.cardano[wallet].name;
    }

    getWalletIcon(wallet) {
        if (!this._walletExists(wallet)) throw new Error('Wallet is not installed');
        return window.cardano[wallet].icon;
    }

    async getWalletApi(wallet) {
        if (!this._walletExists(wallet)) throw new Error('Wallet is not installed');
        return await window.cardano[wallet].enable();
    }
}

export default new DAppConnection();
