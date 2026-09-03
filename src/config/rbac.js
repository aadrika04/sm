export const ROLES = { USER: 'user', ADMIN: 'admin', SUPER_ADMIN: 'super-admin' }

export const ROLE_PERMISSIONS = {
  [ROLES.USER]: ['projects:view', 'demos:view'],
  [ROLES.ADMIN]: [
    'projects:view',
    'demos:view',
    'projects:manage',
    'requirements:view',
    'customers:view',
    'reports:view',
  ],
  [ROLES.SUPER_ADMIN]: [
    'projects:view',
    'demos:view',
    'projects:manage',
    'requirements:view',
    'customers:view',
    'reports:view',
    'organizations:manage',
    'admins:manage',
    'audit:view',
    'system:manage',
  ],
}

export function hasPermission(role, permission) {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}
