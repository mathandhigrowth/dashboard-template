import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin, Alert, Typography, Tag } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { fetchLaunchStatus, updateLaunchStatus, selectCurrentLaunchStatus, selectLaunchFetchStatus, selectLaunchUpdateStatus } from "../../redux/launch/launchSlice";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const LaunchControl = () => {
  const dispatch = useDispatch();
  const launchStatus = useSelector(selectCurrentLaunchStatus);
  const fetchStatus = useSelector(selectLaunchFetchStatus);
  const updateStatus = useSelector(selectLaunchUpdateStatus);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchLaunchStatus());
    }
  }, [dispatch, fetchStatus]);

  const handleLaunchToggle = () => {
    dispatch(
      updateLaunchStatus({
        launched: !launchStatus.launched,
        isReachedBottom: false,
      })
    );
  };

  const isFetching = fetchStatus === "loading";
  const isUpdating = updateStatus === "loading";

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Spin size="large" />
      </div>
    );
  }

  if (fetchStatus === "failed") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Alert message="Error" description="Could not load launch status. Please refresh." type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-center p-6">
      <RocketOutlined style={{ fontSize: "4rem", color: launchStatus.launched ? "#22c55e" : "#f87171" }} />
      <Title
        level={2}
        style={{
          color: "white",
          textTransform: "uppercase",
          marginTop: "1rem",
          textShadow: "0px 0px 10px rgba(255,255,255,0.3)",
        }}
      >
        {launchStatus.launched ? "Ruts N Rides is launched" : "Ruts N Rides is OFFLINE Now"}
      </Title>
      <Paragraph style={{ color: "#9ca3af" }}>{launchStatus.launched ? "Public access is currently enabled." : "Click the button below to initiate launch."}</Paragraph>

      <Button
        type="primary"
        size="large"
        shape="round"
        icon={<RocketOutlined />}
        loading={isUpdating}
        onClick={handleLaunchToggle}
        style={{
          backgroundColor: launchStatus.launched ? "#ef4444" : "#22c55e",
          border: "none",
          marginTop: "2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          padding: "0 2rem",
          height: "3.5rem",
          fontSize: "1.2rem",
        }}
      >
        {launchStatus.launched ? "Abort Launch" : "Initiate Launch"}
      </Button>

      <Link to="/" style={{ marginTop: "2rem" }}>
        <Paragraph style={{ color: "#9ca3af", marginTop: "1rem" }}>Go to dashboard</Paragraph>
      </Link>

      {/* <div className="mt-8">
        <Paragraph style={{ color: "#9ca3af" }}>
          Launch Animation Triggered:
        </Paragraph>
        <Tag color={launchStatus.isReachedBottom ? "green" : "red"}>
          {launchStatus.isReachedBottom ? "YES" : "NO"}
        </Tag>
      </div> */}
    </div>
  );
};

export default LaunchControl;
