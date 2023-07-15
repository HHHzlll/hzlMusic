import { defineStore } from "pinia";

export const useMusicStore = defineStore('music', () => {
    const music: Ref<object> = ref({
        "id": 0,
        "url": "",
        "br": 0,
        "size": 0,
        "md5": "",
        "code": 0,
        "expi": 0,
        "type": "",
        "gain": 0,
        "peak": 0,
        "fee": 0,
        "uf": null,
        "payed": 0,
        "flag": 0,
        "canExtend": false,
        "freeTrialInfo": null,
        "level": "",
        "encodeType": "",
        "freeTrialPrivilege": {
            "resConsumable": false,
            "userConsumable": false,
            "listenType": null,
            "cannotListenReason": null
        },
        "freeTimeTrialPrivilege": {
            "resConsumable": false,
            "userConsumable": false,
            "type": 0,
            "remainTime": 0
        },
        "urlSource": 0,
        "rightSource": 0,
        "podcastCtrp": null,
        "effectTypes": null,
        "time": 0
    })
    const musicDetail: Ref<object> = ref({
        "name": "",
        "id": 0,
        "pst": 0,
        "t": 0,
        "ar": [
            {
                "id": 0,
                "name": "",
                "tns": [],
                "alias": []
            }
        ],
        "alia": [],
        "pop": 0,
        "st": 0,
        "rt": "",
        "fee": 0,
        "v": 0,
        "crbt": null,
        "cf": "",
        "al": {
            "id": 0,
            "name": "",
            "picUrl": "",
            "tns": [],
            "pic_str": "",
            "pic": 0
        },
        "dt": 0,
        "h": {
            "br": 0,
            "fid": 0,
            "size": 0,
            "vd": 0,
            "sr": 0
        },
        "m": {
            "br": 0,
            "fid": 0,
            "size": 0,
            "vd": 0,
            "sr": 0
        },
        "l": {
            "br": 0,
            "fid": 0,
            "size": 0,
            "vd": 0,
            "sr": 0
        },
        "sq": {
            "br": 0,
            "fid": 0,
            "size": 0,
            "vd": 0,
            "sr": 0
        },
        "hr": null,
        "a": null,
        "cd": "",
        "no": 0,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 0,
        "s_id": 0,
        "mark": 0,
        "originCoverType": 0,
        "originSongSimpleData": null,
        "tagPicList": null,
        "resourceState": true,
        "version": 0,
        "songJumpInfo": null,
        "entertainmentTags": null,
        "awardTags": null,
        "single": 0,
        "noCopyrightRcmd": null,
        "cp": 0,
        "rtype": 0,
        "rurl": null,
        "mst": 0,
        "mv": 0,
        "publishTime": 0
    })

    return { music, musicDetail }
}, {
    persist: {
        storage: window.sessionStorage
    },
})