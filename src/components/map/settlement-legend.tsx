import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SettlementLegend: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Map Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
          <span className="text-xs text-muted-foreground">High Z-Metric Cities (Environmental Stress)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white"></div>
          <span className="text-xs text-muted-foreground">Medium Z-Metric Cities</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
          <span className="text-xs text-muted-foreground">Low Z-Metric Cities (Sustainable)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500 border-3 border-emerald-600"></div>
          <span className="text-xs text-muted-foreground font-medium">Optimal Settlement Locations</span>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Green markers</strong> show recommended locations for new sustainable cities to reduce pressure on existing urban areas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementLegend;
