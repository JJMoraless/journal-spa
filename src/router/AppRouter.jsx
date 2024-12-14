import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

import { authEnum, CheckingAuth, useCheckAuth } from "../common";

export const AppRouter = () => {
  const { statusAuth } = useCheckAuth();

  if (statusAuth === authEnum.CHECKING) {
    return <CheckingAuth />;
  }

  return (
    <>
      <Routes>
        {statusAuth === authEnum.AUTHENTICATED ? (
          <Route path="/*" element={<JournalRoutes />} />
        ) : (
          <Route path="/auth/*" element={<AuthRoutes />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
