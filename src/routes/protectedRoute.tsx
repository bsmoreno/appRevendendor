import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/hooks/use-user';

// Definição dos tipos para as permissões
type Permission = {
    route: string;
    level: number;
};

// Props do componente ProtectedRoute
interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions: Permission[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermissions }) => {
    const { user } = useUser();
    const location = useLocation(); 
    // Supondo que userPermissions é um objeto onde as chaves são as rotas e os valores são os níveis de acesso
    const userPermissions = user?.js_Roles || [] as any;

    if(userPermissions["*"]) 
        return <>{children}</>;

    // Verifica se o usuário tem permissão
    const hasPermission = requiredPermissions.some(permission =>
        userPermissions[permission.route] && userPermissions[permission.route] >= permission.level
    );

    if (!hasPermission) {
        // Redireciona para a página de login ou erro
        return <Navigate to="/errors/not-authorized" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
