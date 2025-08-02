import { Button, Card, Input, Row, Col, Space, Typography, Select } from "antd";
import { EllipsisOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DeleteConfirmModal from "../../../components/Modals/DeleteConfirmModal";
import RoomsTable from "./RoomsTable";
const { Title } = Typography;
const { Option } = Select;
import { Hotel, UserCheck, DoorOpen, Wrench } from "lucide-react";

const roomStats = [
  {
    label: "Total Rooms",
    value: 48,
    icon: Hotel,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Occupied",
    value: 32,
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Vacant",
    value: 14,
    icon: DoorOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Maintenance",
    value: 2,
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

const RoomManagementPage = () => {
  return (
    <Card
      title={
        <Title level={4} className="pt-2">
          Rooms Management
          <p style={{ fontSize: "12px", color: "#888" }}>Manage blocks, rooms and assignments</p>
        </Title>
      }
      extra={
        <div className="flex space-x-2">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#374151", color: "white" }}>
            Add Block
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Room
          </Button>
        </div>
      }
      bordered={false}
    >
      <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {roomStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-300">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={10}>
          <Input.Search placeholder="Search rooms..." enterButton={<SearchOutlined />} allowClear />
        </Col>

        <Col xs={24} sm={12} md={14}>
          <Row gutter={[8, 8]} wrap justify="end">
            <Col xs={24} sm={12} md={8}>
              <Select defaultValue="all" style={{ width: "100%" }} allowClear>
                <Option value="all">All Blocks</Option>
                <Option value="block-a">Block A</Option>
                <Option value="block-b">Block B</Option>
                <Option value="block-c">Block C</Option>
              </Select>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Select defaultValue="all" style={{ width: "100%" }} allowClear>
                <Option value="all">All Status</Option>
                <Option value="vacant">Vacant</Option>
                <Option value="occupied">Occupied</Option>
                <Option value="maintenance">Maintenance</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>

      <RoomsTable />

      <DeleteConfirmModal visible={false} onCancel={() => {}} onConfirm={() => {}} title="Confirm Delete" content="Are you sure you want to delete this item? This action cannot be undone." />
    </Card>
  );
};

export default RoomManagementPage;
