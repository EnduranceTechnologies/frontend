import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity({ name: 'users' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ type: 'enum', enum: ['OWNER', 'ADMIN', 'MEMBER', 'SUPPORT'], default: 'MEMBER' })
  role!: string;

  @Column({ nullable: true, default: false })
  has_reset_pass!: boolean;

  @Column()
  password_hash!: string;

  @Column({ nullable: true })
  picture!: string;

  @Column({ nullable: true })
  token_reset_password!: string;

  @Column({ nullable: true, type: 'timestamp' })
  reset_password_expires!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date;
}

export default User;
