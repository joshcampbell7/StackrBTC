"use client"

import { IconTrendingUp, IconTrendingDown, IconUser, IconWallet, IconCurrencyBitcoin } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Total BTC (All Wallets) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total BTC (All Wallets)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3.712 BTC
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +1.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            +0.08 BTC this week <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Across 7 wallets</div>
        </CardFooter>
      </Card>

      {/* Your BTC Holdings */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Your BTC Holdings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0.840 BTC
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -0.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            0.002 BTC withdrawn <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">This week</div>
        </CardFooter>
      </Card>

      {/* Top Contributor */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Contributor</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            @jamie_btc
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUser />
              0.250 BTC
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Largest deposit this month 🚀
          </div>
          <div className="text-muted-foreground">Well played Jamie</div>
        </CardFooter>
      </Card>

      {/* Group Growth Rate */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Group Growth (30D)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            +5.2%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Steady
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Consistent deposits <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">+0.42 BTC this month</div>
        </CardFooter>
      </Card>
    </div>
  )
}
