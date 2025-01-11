"use client";
import UserDashboard from "../../components/userdashboard/UserDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

const ProfilePage: React.FC = () => {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
};

export default ProfilePage;
