'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import FormError from "./form-error";
import { UserRole } from "@prisma/client";

interface RoleGateProps extends React.PropsWithChildren {
  allowedRoles: UserRole[];
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
    const role = useCurrentRole();
    console.log(role)
    if (!role || !allowedRoles.includes(role)) {
        return <FormError message="You do not have permission to access this page."/>
    }
    return children;
};