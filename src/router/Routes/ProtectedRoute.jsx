import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    if (userInfo) {
      if (route.role) {
        if (userInfo.role === route.role) {
          if (route.status) {
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === "pending") {
                return <Navigate replace to={"/seller/account/pending"} />;
              } else {
                return <Navigate replace to={"/seller/account/deactive"} />;
              }
            }
          } else {
            if (route.visiablity) {
              if (route.visiablity.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate replace to={"/seller/account/pending"} />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
          // return <Suspense fallback={null}>{children}</Suspense>;
        } else {
          return <Navigate to={"/unauthorized"} replace />;
        }
      } else {
        if (route.ablity === "seller") {
          return <Suspense fallback={null}>{children}</Suspense>;
        }
      }
    }
  } else {
    return <Navigate replace to={"/login"} />;
  }
};

export default ProtectedRoute;
