import historyProvider from "./historyProvider";

let _subs = [];
export let _lastbar;

const stream = {
  subscribeBars: (symbolInfo, resolution, updateCb, uid, resetCache) => {
    let newSub = {
      channelString: "MTL",
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider?.history[symbolInfo.name]?.lastBar,
      listener: updateCb,
    };

    _lastbar = historyProvider?.history[symbolInfo.name]?.lastBar;
    _subs.push(newSub);
  },
  unsubscribeBars: (uid) => {
    const subIndex = _subs.findIndex((e) => e.uid === uid);
    if (subIndex === -1) {
      return;
    }

    _subs.splice(subIndex, 1);
  },
};

export const nextDay = (data) => {
  const sub = _subs.find((e) => e.channelString === "MTL");

  if (_lastbar.time !== data.time) sub.listener(data);

  _lastbar = data;
};

export default stream;
