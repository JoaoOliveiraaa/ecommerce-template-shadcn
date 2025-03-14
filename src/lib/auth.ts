"use server"

// Simulação de autenticação sem usar cookies
// Em uma aplicação real, você usaria um sistema de autenticação adequado

// Usuário admin mockado
const ADMIN_USER = {
  email: "admin@example.com",
  password: "admin123", // Em uma aplicação real, isso seria hash
}

// Variável global para simular sessão (apenas para demonstração)
let isAdminLoggedIn = false

// Verificar se o usuário está autenticado como admin
export async function checkAdminAuth(): Promise<boolean> {
  // Em uma aplicação real, você verificaria um token JWT ou sessão
  return isAdminLoggedIn
}

// Login de usuário admin
export async function loginAdmin(email: string, password: string): Promise<boolean> {
  // Em uma aplicação real, você verificaria as credenciais em um banco de dados
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    isAdminLoggedIn = true
    return true
  }

  return false
}

// Logout de usuário admin
export async function logoutAdmin(): Promise<void> {
  isAdminLoggedIn = false
}

