/**
 * User Roles and Permissions
 * Centralized role definitions for RBAC
 */

const USER_ROLES = {
  USER: 'user',
  SUPPORT: 'support',
  ADMIN: 'admin'
};

const SUPPORT_PERMISSIONS = {
  VIEW_REPORTS: 'view_reports',
  UPDATE_REPORTS: 'update_reports',
  RESOLVE_REPORTS: 'resolve_reports',
  VIEW_USERS: 'view_users',
  SUSPEND_USERS: 'suspend_users'
};

const ADMIN_PERMISSIONS = {
  ...SUPPORT_PERMISSIONS,
  BAN_USERS: 'ban_users',
  CHANGE_ROLES: 'change_roles',
  VIEW_STATS: 'view_stats',
  MANAGE_PLATFORM: 'manage_platform'
};

module.exports = {
  USER_ROLES,
  SUPPORT_PERMISSIONS,
  ADMIN_PERMISSIONS
};
