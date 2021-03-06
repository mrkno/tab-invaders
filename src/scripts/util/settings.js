import browser from 'webextension-polyfill';
import keyboardKeys from './keys';

class SettingsManager {
    async _updateSetting(name, value) {
        const val = {};
        val[name] = value;
        await browser.storage.sync.set(val);
        return value;
    }
    
    async _getSetting(name, def) {
        const storage = await browser.storage.sync.get(name);
        const value = storage[name];
        if (value === void(0) && def !== void(0)) {
            return await this._updateSetting(name, def);
        }
        return value;
    }

    async _handleGetSet(name, def, newValue, reset) {
        if (reset) {
            return await this._updateSetting(name, def);
        }

        if (newValue !== void(0)) {
            return await this._updateSetting(name, newValue);
        }

        return await this._getSetting(name, def);
    }

    async highScore(newValue, reset) {
        return await this._handleGetSet('highScore', 0, newValue, reset);
    }

    async totalTabs(newValue, reset) {
        return await this._handleGetSet('totalTabs', 0, newValue, reset);
    }

    async bulletsFired(newValue, reset) {
        return await this._handleGetSet('bulletsFired', 0, newValue, reset);
    }

    async playCount(newValue, reset) {
        return await this._handleGetSet('playCount', 0, newValue, reset);
    }

    async closeWaitTime(newValue, reset) {
        return await this._handleGetSet('closeWaitTime', 5, newValue, reset);
    }

    async closeOnComplete(newValue, reset) {
        return await this._handleGetSet('closeOnComplete', true, newValue, reset);
    }

    async ignorePinnedTabs(newValue, reset) {
        return await this._handleGetSet('ignorePinnedTabs', true, newValue, reset);
    }

    async leftButton(newValue, reset) {
        return await this._handleGetSet('leftButton', keyboardKeys.LEFT, newValue, reset);
    }

    async rightButton(newValue, reset) {
        return await this._handleGetSet('rightButton', keyboardKeys.RIGHT, newValue, reset);
    }

    async fireButton(newValue, reset) {
        return await this._handleGetSet('fireButton', keyboardKeys.SPACEBAR, newValue, reset);
    }

    async reset() {
        return Promise.all([
            this.highScore(void(0), true),
            this.totalTabs(void(0), true),
            this.bulletsFired(void(0), true),
            this.playCount(void(0), true),
            this.closeWaitTime(void(0), true),
            this.closeOnComplete(void(0), true),
            this.ignorePinnedTabs(void(0), true),
            this.leftButton(void(0), true),
            this.rightButton(void(0), true),
            this.fireButton(void(0), true)
        ]);
    }
}

const instance = new SettingsManager();
export default instance;
