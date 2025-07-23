import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUser1631039612322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'varchar',
            default: `'MEMBER'`,
          },
          {
            name: 'activity',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'has_served',
            type: 'boolean',
            default: true,
          },
          {
            name: 'has_reset_pass',
            type: 'boolean',
            default: false,
          },
          {
            name: 'picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'token_reset_password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reset_password_expires',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
