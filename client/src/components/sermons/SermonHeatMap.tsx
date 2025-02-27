import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
} from "recharts";

interface EngagementPoint {
  position: number;
  intensity: number;
  type: "emotional" | "theological" | "practical";
  note?: string;
}

interface SermonHeatMapProps {
  engagementData: EngagementPoint[];
  sermonLength: number;
}

const ENGAGEMENT_TYPES = {
  emotional: "Impact Émotionnel",
  theological: "Profondeur Théologique",
  practical: "Application Pratique",
};

const COLOR_SCALE = [
  "#f3f4f6", // Very low engagement
  "#93c5fd", // Low engagement
  "#3b82f6", // Medium engagement
  "#1d4ed8", // High engagement
  "#1e3a8a", // Very high engagement
];

export function SermonHeatMap({ engagementData, sermonLength }: SermonHeatMapProps) {
  // Normalize positions to percentages
  const normalizedData = engagementData.map(point => ({
    ...point,
    position: (point.position / sermonLength) * 100,
  }));

  // Group data by type
  const groupedData = Object.keys(ENGAGEMENT_TYPES).map(type => ({
    type,
    data: normalizedData.filter(point => point.type === type),
  }));

  const getColor = (intensity: number) => {
    const index = Math.min(Math.floor(intensity * COLOR_SCALE.length), COLOR_SCALE.length - 1);
    return COLOR_SCALE[index];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.[0]) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/5">
          <p className="font-semibold">{ENGAGEMENT_TYPES[data.type]}</p>
          <p>Position: {Math.round(data.position)}%</p>
          <p>Intensité: {Math.round(data.intensity * 100)}%</p>
          {data.note && <p className="mt-1 text-sm text-muted-foreground">{data.note}</p>}
        </div>
      );
    }
    return null;
  };

  const CustomShape = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <Rectangle
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        fill={getColor(payload.intensity)}
        className="transition-colors hover:brightness-90"
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carte d'Engagement du Sermon</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="position"
                name="Position"
                unit="%"
                domain={[0, 100]}
              />
              <YAxis
                type="category"
                dataKey="type"
                tickFormatter={(value) => ENGAGEMENT_TYPES[value]}
              />
              <Tooltip content={<CustomTooltip />} />
              {groupedData.map(({ type, data }) => (
                <Scatter
                  key={type}
                  name={ENGAGEMENT_TYPES[type]}
                  data={data}
                  shape={<CustomShape />}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          {COLOR_SCALE.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-4 w-4"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">
                {i === 0 ? "Faible" : i === COLOR_SCALE.length - 1 ? "Élevé" : ""}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
