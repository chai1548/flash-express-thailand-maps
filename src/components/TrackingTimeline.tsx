
import { Package } from "@/lib/tracking";

type TrackingTimelineProps = {
  packageData: Package;
};

const TrackingTimeline = ({ packageData }: TrackingTimelineProps) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
      <div className="space-y-4">
        {packageData.history.map((event, index) => {
          const { date, time } = formatTimestamp(event.timestamp);
          const isLast = index === 0;
          return (
            <div key={index} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${isLast ? 'bg-flash-secondary' : 'bg-gray-300'}`}></div>
                {index < packageData.history.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h4 className="font-medium">{event.status}</h4>
                  <div className="text-sm text-gray-500 md:text-right">
                    <div>{date}</div>
                    <div>{time}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
