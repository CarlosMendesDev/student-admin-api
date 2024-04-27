import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('students')
export default class Student {
  @PrimaryColumn()
  id: string

  @Column({ unique: true })
  ra: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  cpf: string

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
