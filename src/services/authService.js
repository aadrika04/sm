const ACCOUNT_STORAGE_KEY = 'sm-global-demo-accounts'
const SESSION_STORAGE_KEY = 'sm-global-demo-session'
const DEMO_ROLE_ACCOUNTS = [
  { email: 'admin@smglobal.demo', password: 'Admin@123', role: 'admin', name: 'SM Global Admin' },
  {
    email: 'superadmin@smglobal.demo',
    password: 'SuperAdmin@123',
    role: 'super-admin',
    name: 'SM Global Super Admin',
  },
]
const wait = (milliseconds = 700) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds))
const normalizeEmail = (email) => email.trim().toLowerCase()
const bytesToBase64 = (bytes) => btoa(String.fromCharCode(...bytes))

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return bytesToBase64(new Uint8Array(digest))
}

export async function register({ name, company, email, password }) {
  await wait()
  const normalizedEmail = normalizeEmail(email)
  const accounts = readAccounts()
  if (accounts.some((account) => account.email === normalizedEmail))
    throw new Error('An account with this email already exists. Please sign in instead.')
  const salt = bytesToBase64(crypto.getRandomValues(new Uint8Array(16)))
  const passwordHash = await hashPassword(password, salt)
  accounts.push({
    id: crypto.randomUUID(),
    name: name.trim(),
    company: company.trim(),
    email: normalizedEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts))
  return { success: true }
}

export async function login({ email, password }) {
  await wait()
  const normalizedEmail = normalizeEmail(email)
  const demoAccount = DEMO_ROLE_ACCOUNTS.find((account) => account.email === normalizedEmail)
  if (demoAccount) {
    if (password !== demoAccount.password) throw new Error('The email or password is incorrect.')
    const user = { name: demoAccount.name, email: demoAccount.email, role: demoAccount.role }
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    return { success: true, user }
  }
  const account = readAccounts().find((item) => item.email === normalizedEmail)
  if (!account)
    throw new Error('No account is registered with this email. Please create an account first.')
  const passwordHash = await hashPassword(password, account.salt)
  if (passwordHash !== account.passwordHash) throw new Error('The email or password is incorrect.')
  const user = { id: account.id, name: account.name, email: account.email, role: 'user' }
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
  return { success: true, user }
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}
