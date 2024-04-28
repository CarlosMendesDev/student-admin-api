import { Entity, PrimaryColumn, Column } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
