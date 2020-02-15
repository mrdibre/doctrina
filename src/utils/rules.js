const email = val => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(val) || 'Email inválido'
const required = val => Array.isArray(val) ? val.length > 0 : !!val || 'Campo obrigatório'
const password = val => (val && val.length > 7) || 'Senha deve maior de 8 dígitos'
const greaterThan = digits => val => val && val.length >= digits || `Campo deve ter pelo menos ${digits} caracteres`

export {
  email,
  required,
  password,
  greaterThan,
}