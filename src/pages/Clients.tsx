import Title from "antd/es/typography/Title";
import React, { JSX, useState, useEffect } from "react";
import { FaProjectDiagram, FaUsers, FaCalendarAlt, FaSmile } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENT_STATS } from "../graphql/queries/queries";
import { UPDATE_CLIENT_STATS } from "../graphql/mutations/mutations";
import { message } from "antd";

type StatItem = {
  id: number;
  icon: JSX.Element;
  label: string;
  value: number;
};

const ClientStatsForm: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CLIENT_STATS);
  const [updateClientStats] = useMutation(UPDATE_CLIENT_STATS);

  const [stats, setStats] = useState<StatItem[]>([
    { id: 1, icon: <FaProjectDiagram className="text-2xl" />, label: "Completed Projects", value: 0 },
    { id: 2, icon: <FaUsers className="text-2xl" />, label: "Employees", value: 0 },
    { id: 3, icon: <FaCalendarAlt className="text-2xl" />, label: "Years on the Market", value: 0 },
    { id: 4, icon: <FaSmile className="text-2xl" />, label: "Clients", value: 0 },
  ]);

  useEffect(() => {
    if (data) {
      setStats([
        { id: 1, icon: <FaProjectDiagram className="text-2xl" />, label: "Completed Projects", value: data.getClientStats.completedProjects },
        { id: 2, icon: <FaUsers className="text-2xl" />, label: "Employees", value: data.getClientStats.employees },
        { id: 3, icon: <FaCalendarAlt className="text-2xl" />, label: "Years on the Market", value: data.getClientStats.yearsOnMarket },
        { id: 4, icon: <FaSmile className="text-2xl" />, label: "Clients", value: data.getClientStats.clients },
      ]);
    }
  }, [data]);

  const updateValue = (index: number, newValue: number) => {
    const updated = [...stats];
    updated[index].value = newValue;
    setStats(updated);
  };

  const handleSave = async () => {
    if (!data?.getClientStats) {
      console.error("Client stats data is not available.");
      return;
    }

    const payload = {
      id: data.getClientStats?.id,
      completedProjects: stats[0].value,
      employees: stats[1].value,
      yearsOnMarket: stats[2].value,
      clients: stats[3].value,
    };

    try {
      await updateClientStats({ variables: { input: payload } });
      message.success("Client statistics have been successfully updated!");
      console.log("Successfully saved client stats");
    } catch (err) {
      message.error(`Error saving client stats`);
      console.error("Error saving client stats:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <Title level={4} className="mb-8 pb-4">
        Update Client Statistics
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="bg-gray-50 p-6 rounded-xl border hover:shadow-md transition"
          >
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white shadow w-12 h-12 flex items-center justify-center rounded-full text-blue-600">
                {stat.icon}
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 text-center mb-1">
              {stat.label}
            </label>
            <input
              type="number"
              value={stat.value}
              onChange={(e) => updateValue(index, parseInt(e.target.value) || 0)}
              className="w-full text-center text-2xl font-semibold text-blue-700 border border-blue-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ClientStatsForm;
