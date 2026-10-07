export type StaffRole = 'admin' | 'humas' | 'editor'

export function canManage(role: string, resource: string) {
  if (role === 'admin') return true
  if (role === 'humas') return ['news', 'research', 'pages', 'media', 'applicants', 'history', 'events', 'announcements', 'galleries', 'videos', 'contact', 'upload'].includes(resource)
  return role === 'editor' && ['news', 'research', 'media', 'history', 'upload'].includes(resource)
}
