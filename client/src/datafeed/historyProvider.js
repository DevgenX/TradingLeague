import { crypto_name, rand_om } from "../pages/Game/Game";
import { getCrypto } from "../services/crypto";

export let next_feed;
export let c_name = null;

const history = {};

const historyProvider = {
  history: history,
  getBars: function (symbolInfo, resolution, periodParams, first) {
    const rand = Math.floor(Math.random() * 268);

    const chart_feed = require("../services/chart_data/" + rand_om + ".json");
    // c_name = getCrypto(rand);

    next_feed = require("../services/next_data/" + rand_om + ".json");

    if (chart_feed.length) {
      const json_data_st = JSON.stringify(chart_feed);
      const json_data = JSON.parse(json_data_st);

      periodParams.from = json_data[0].time;

      const bars = json_data.map((d) => ({
        time: d.time,
        low: d.low,
        high: d.high,
        open: d.open,
        close: d.close,
        volume: d.volume,
      }));

      if (first) {
        const lastBar = bars[bars.length - 1];
        history[symbolInfo.name] = { lastBar: lastBar };
      }
      return bars;
    }
  },
};

export default historyProvider;
