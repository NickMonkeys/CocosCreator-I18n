import words from "./words";

const {ccclass, property, disallowMultiple, executeInEditMode, menu} = cc._decorator;

export enum ELanguage {
    CH = 'ch',
    EN = 'en',
}

export enum ELanguageEventType {
    CHANGE = 'language_change',
}

export interface IWord {
    txt: string,
    audio?: string,
}

@ccclass
@disallowMultiple
@executeInEditMode
@menu("Custom UI组件/I18n")
export default class I18n extends cc.Component {
    // 设置语言
    private static _language = ELanguage.CH;
    public static get language() {
        return this._language;
    }
    public static set language(value) {
        if (this._language === value) {
            return;
        }
        this._language = value;
        this.emit(ELanguageEventType.CHANGE, value);
    }

    // 事件发送
    private static event: cc.EventTarget = new cc.EventTarget();
    private static emit(event: ELanguageEventType, ...args: any) {
        this.event.emit(event, ...args);
    }
    public static on(event: ELanguageEventType, callback: (language: ELanguage) => void, target?: any) {
        this.event.on(event, callback, target);
    }
    public static once(event: ELanguageEventType, callback: (language: ELanguage) => void, target?: any) {
        this.event.once(event, callback, target);
    }
    public static off(event: ELanguageEventType, callback: (language: ELanguage) => void, target?: any) {
        this.event.off(event, callback, target);
    }
    public static targetOff(target: any) {
        this.event.targetOff(target);
    }

    // UI属性
    @property(cc.Label)
    _label: cc.Label = null;
    @property(cc.Label)
    get label() {
        return this._label;
    }
    set label(label: cc.Label) {
        this._label = label;
        this.refresh();
    }

    @property
    private _eId: string = '';
    @property()
    private get eId() {
        return this._eId;
    }
    private set eId(id: string) {
        this._eId = id;
        this.refresh();
    }

    private _eWord: IWord = null;
    public get eWord() {
        return this._eWord;
    }
    public set eWord(Word: IWord) {
        this._eWord = Word;
        this.refresh();
    }

    protected onLoad () {
        this.label = this.node.getComponent(cc.Label);
        I18n.on(ELanguageEventType.CHANGE, this.change.bind(this), this);
        this.refresh();
    }

    private refresh() {
        if (!cc.isValid(this.label)) {
            return;
        }
        const word = this.eWord || words[this.eId] || {};
        const txt = word.txt;
        this.label.string = txt || `word 404`;
    }

    private change () {
        this.refresh();
    }

    public getWord(): IWord {
        if (this.eWord) {
            return this.eWord;
        }
        if (this.eId) {
            if (words[this.eId]) {
                return words[this.eId];
            }
            return {txt: `404:${this.eId}`};
        }
        return  {txt: 'word 404'};
    }

    protected onDestroy() {
        I18n.targetOff(this);
    }
}
