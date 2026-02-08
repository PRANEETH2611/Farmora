import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CREATOR_STATS } from "@/mock/data";
import { formatRupee } from "@/lib/utils";
import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CreatorDashboard() {
  const chartData = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 2000 },
    { name: 'Thu', views: 2780 },
    { name: 'Fri', views: 1890 },
    { name: 'Sat', views: 2390 },
    { name: 'Sun', views: 3490 },
  ];

  return (
    <div className="container px-4 py-8 min-h-screen space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-foreground">Creator Dashboard</h1>
        <p className="text-muted-foreground">Track your impact and earnings.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Earnings" 
          value={formatRupee(MOCK_CREATOR_STATS.commissions)} 
          icon={DollarSign}
          desc="+12% from last month"
          trend="up"
        />
        <StatsCard 
          title="Total Views" 
          value={MOCK_CREATOR_STATS.totalViews.toLocaleString()} 
          icon={Users}
          desc="+5% new viewers"
          trend="up"
        />
        <StatsCard 
          title="Watch Time" 
          value={MOCK_CREATOR_STATS.watchTime} 
          icon={Clock}
          desc="Consistent engagement"
          trend="neutral"
        />
        <StatsCard 
          title="Engagement Score" 
          value={MOCK_CREATOR_STATS.engagementScore} 
          icon={TrendingUp}
          desc="Top 5% of creators"
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Views Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_CREATOR_STATS.recentPayouts.map((payout, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div>
                    <p className="font-medium text-sm">Commission Payout</p>
                    <p className="text-xs text-muted-foreground">{payout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatRupee(payout.amount)}</p>
                    <p className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full inline-block mt-1">{payout.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, desc, trend }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-muted-foreground'} mt-1`}>
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}
