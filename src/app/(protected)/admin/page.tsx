'use client'

import FormSuccess from '@/components/auth/form-success';
import { RoleGate } from '@/components/auth/role-gate';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role'
import React from 'react'
import { UserRole } from "@prisma/client";

const AdminPage = () => {
    
    // const role = useCurrentRole();

    // using currentRole function from lib, if server component
    // const role = await currentRole();

    
    return (
        <Card className='w-[600]'>
            <CardHeader>
                <p className='text-2xl text-center font-semibold'>Admin</p>
            </CardHeader>
            <CardContent className='space-y-4'>
                <RoleGate allowedRoles={[UserRole.ADMIN]} >
                    <FormSuccess message='You are an admin, you can access this page'/>
                </RoleGate>
            </CardContent>
        </Card>
    )
}

export default AdminPage