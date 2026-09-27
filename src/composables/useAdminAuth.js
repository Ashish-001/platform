import { readonly, ref } from 'vue'
import adminConfig from '../data/adminConfig.json'

const SESSION_KEY = 'service-admin-session-v1'

const authed = ref(false)

function sessionValid(raw) {
  try {
    const { expiresAt, user } = JSON.parse(raw)
    return Boolean(user) && typeof expiresAt === 'number' && expiresAt > Date.now()
  } catch {
    return false
  }
}

function restore() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    authed.value = Boolean(raw) && sessionValid(raw)
    if (raw && !authed.value) sessionStorage.removeItem(SESSION_KEY)
  } catch {
    authed.value = false
  }
}

restore()

export function useAdminAuth() {
  return {
    authed: readonly(authed),
    adminPath: adminConfig.adminPath || '/my/admin',

    /**
     * Credentials live in the bundled config, so this gate hides the panel
     * rather than securing it. See src/data/adminConfig.json.
     * @returns {boolean} whether the credentials matched
     */
    signIn(username, password) {
      const ok = username === adminConfig.username && password === adminConfig.password
      if (!ok) return false

      const hours = Number(adminConfig.sessionHours) || 12
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ user: username, expiresAt: Date.now() + hours * 60 * 60 * 1000 }),
        )
      } catch {
        // Ignore sessionStorage failures (private mode/quota); keep auth in memory.
      }
      authed.value = true
      return true
    },

    signOut() {
      try {
        sessionStorage.removeItem(SESSION_KEY)
      } catch {
        // Ignore sessionStorage failures; local auth state is still cleared.
      }
      authed.value = false
    },
  }
}
