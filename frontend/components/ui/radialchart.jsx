import React, { useState, useEffect } from 'react';

const RadialChartComponent = ({ 
  title = "Radial Chart - Text",
  description = "",
  chances = 200,
  startAngle = 0,
  endAngle = 250,
  innerRadius = 100, // Increased from 80 to 100
  outerRadius = 140, // Increased from 110 to 140
  footerText = ""
}) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const [
        { TrendingUp },
        { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart },
        { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle },
        { ChartContainer }
      ] = await Promise.all([
        import('lucide-react'),
        import('recharts'),
        import('@/components/ui/card'),
        import('@/components/ui/chart')
      ]);

      const chartData = [
        { browser: "safari", chances: chances, fill: "var(--color-safari)" },
      ];
      const chartConfig = {
        chances: {
          label: "chances",
        },
        safari: {
          label: "Safari",
          color: "hsl(var(--chart-2))",
        },
      };

      const InnerComponent = () => (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]} // Adjusted to match the new radius
                />
                <RadialBar dataKey="chances" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chances.toLocaleString() + "%"}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Chances
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              <TrendingUp size={16} />
              <span className="text-muted-foreground">Probabilty of Diabetes {chances}%</span>
            </div>
            <div className="leading-none text-muted-foreground">
              {footerText}
            </div>
          </CardFooter>
        </Card>
      );

      setComponent(() => InnerComponent);
    };

    loadComponent();
  }, [title, description, chances, startAngle, endAngle, innerRadius, outerRadius, footerText]);

  if (!Component) {
    return <div>Loading...</div>;
  }

  return <Component />;
};

export default RadialChartComponent;