// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import I18n, { ELanguage } from "./language/I18n";
import words from "./language/words";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(I18n)
    eI18n: I18n = null;

    onClickCH() {
        I18n.language = ELanguage.CH;
    }

    onClickEN() {
        I18n.language = ELanguage.EN;
    }

    onClickHaha() {
        this.eI18n.eWord = words.T1628425865007;
    }

    onClickXixi() {
        this.eI18n.eWord = words.T1628428498675;
    }
}
