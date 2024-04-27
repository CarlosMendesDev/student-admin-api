import { QueryFailedError } from 'typeorm'

export const getUniqueConstraintErrorMessage = (error: QueryFailedError): string => {
  const errorMessage = error.message || 'Um erro ocorreu durante a criação do estudante.'

  if (errorMessage.includes('ra')) {
    return 'Já existe um estudante com esse RA.'
  } else if (errorMessage.includes('email')) {
    return 'Já existe um estudante com esse e-mail.'
  } else if (errorMessage.includes('cpf')) {
    return 'Já existe um estudante com esse CPF.'
  }

  return 'Um estudante com esses detalhes já existe.'
}
