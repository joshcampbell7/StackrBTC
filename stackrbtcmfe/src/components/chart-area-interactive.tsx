"use client"

import * as React from "react"
import { SymbolOverview } from "react-ts-tradingview-widgets"

function TradingViewSymbolOverview() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <SymbolOverview
        colorTheme="light"
        autosize={true}
        chartType="candlesticks"
        dateFormat="dd/MM/yyyy"
        symbols={[["Bitcoin", "BTCUSD"]]}
        upColor="#212121"
        downColor="#212121"
        borderUpColor="#212121"
        borderDownColor="#212121"
        wickUpColor="#212121"
        wickDownColor="#212121"
        gridLineColor="#f0f0f0"
        fontColor="#212121"
        backgroundColor="#ffffff"
      />
    </div>
  )
}

export default TradingViewSymbolOverview
