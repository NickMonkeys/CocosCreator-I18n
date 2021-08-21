
const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioMgr {

    private static sInstance: AudioMgr = null;
    public static getInstance() {
        if (!this.sInstance) {
            this.sInstance = new AudioMgr();
        }
        return this.sInstance;
    }

    public static destroy() {
        delete this.sInstance;
    }

    public play(url: string) {
        cc.log('去播放：' + url);

    }
}
