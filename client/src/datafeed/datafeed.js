import historyProvider from "./historyProvider";
import stream from "./stream";
import { token_name } from "../pages/Game/Game";

const configurationData = {
  supported_resolutions: ["240", "D", "1W"],
};

const Datafeed = {
  onReady: (callback) => {
    setTimeout(() => callback({ configurationData }), 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    const symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      timezone: "Asia/Singapore",
      ticker: symbolName,
      minmov: 1,
      pricescale: 10000,
      has_intraday: true,
      intraday_multipliers: ["240"],
      supported_resolution: ["240", "D", "1W"],
      volume_precision: 0,
      data_status: "endofday",
    };

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const bars = historyProvider.getBars(
      symbolInfo,
      resolution,
      periodParams,
      periodParams.firstDataRequest
    );

    if (bars && bars.length > 0) {
      onHistoryCallback(bars, { noData: false });
    } else if (bars && bars.length < 1) {
      onHistoryCallback([], { noData: true });
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    stream.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    );
  },
  unsubscribeBars: (subscriberUID) => {
    stream.unsubscribeBars(subscriberUID);
  },
};

export default Datafeed;
