import { AuthService } from "@buffbyte/services";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/layout/header/app";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <AppHeader />
        <div className="mt-8">
        {user && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome, {user.firstName} 👋
            </h2>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
