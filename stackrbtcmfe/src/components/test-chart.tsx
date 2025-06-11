import React from "react";
import { SymbolOverview } from "react-ts-tradingview-widgets";

function TradingViewSymbolOverview() {
    return (
        <div style={{ width: "100%", height: "500px" }}>
            <SymbolOverview
                colorTheme="dark"
                autosize={true}
                chartType="candlesticks"
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080"
                dateFormat="dd/MM/yyyy"   // UK-style date format
            />
        </div>
    );
}

export default TradingViewSymbolOverview;
