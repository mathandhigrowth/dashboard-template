import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const RoomsTable = () => {
  return (
    <div className="space-y-6">
      {/* Block A */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary">Block A</h3>
              <p className="text-gray-600 text-sm">Ground Floor • 16 Rooms</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">12 Occupied</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">4 Vacant</span>
              <button className="text-gray-400 hover:text-gray-600">
                <EllipsisOutlined style={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[
              { code: "A101", name: "John Smith", color: "green" },
              { code: "A102", name: "Available", color: "blue" },
              { code: "A103", name: "Sarah Wilson", color: "green" },
              { code: "A104", name: "Maintenance", color: "orange" },
            ].map((room) => (
              <div key={room.code} className={`p-4 border border-gray-300 bg-${room.color}-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}>
                <div className="text-center">
                  <div className={`text-lg font-bold text-${room.color}-800`}>{room.code}</div>
                  <div className={`text-xs text-${room.color}-600 mt-1`}>{room.name}</div>
                  <span className={`inline-block w-2 h-2 bg-${room.color}-500 rounded-full mt-2`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Block B */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary">Block B</h3>
              <p className="text-gray-600 text-sm">First Floor • 16 Rooms</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">10 Occupied</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">6 Vacant</span>
              <button className="text-gray-400 hover:text-gray-600">
                <EllipsisOutlined style={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[
              { code: "B201", name: "Mike Johnson", color: "green" },
              { code: "B202", name: "Available", color: "blue" },
            ].map((room) => (
              <div key={room.code} className={`p-4 border border-gray-300 bg-${room.color}-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}>
                <div className="text-center">
                  <div className={`text-lg font-bold text-${room.color}-800`}>{room.code}</div>
                  <div className={`text-xs text-${room.color}-600 mt-1`}>{room.name}</div>
                  <span className={`inline-block w-2 h-2 bg-${room.color}-500 rounded-full mt-2`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsTable;
