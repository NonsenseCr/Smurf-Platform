import { useEffect, useState } from "react";
import EntryDenied from "../area-manager/pages/config-service/EntryDen"; // Đảm bảo đường dẫn chính xác

const withPermission = (Component, requiredPermissionId) => {
  const WrappedComponent = (props) => {
    const [isPermissionDenied, setPermissionDenied] = useState(false);
    const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

    useEffect(() => {
      const hasPermission = permissions.some(
        (permission) =>
          permission.IdPermissions === requiredPermissionId && permission.Active
      );

      if (!hasPermission) {
        setPermissionDenied(true);
      }
    }, [permissions]);

    if (isPermissionDenied) {
      return <EntryDenied isVisible={isPermissionDenied} onClose={() => setPermissionDenied(false)} />;
    }

    return <Component {...props} />;
  };

  // Thêm displayName
  WrappedComponent.displayName = `withPermission(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

export default withPermission;
