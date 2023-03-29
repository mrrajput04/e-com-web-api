import { MigrationInterface, QueryRunner } from 'typeorm';
export class userTable1679911915749 implements MigrationInterface {
  name: 'userTable1679911915749';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS USER-DATA (
            ID SERIAL PRIMARY KEY NOT NULL,
            FIRSTNAME CHAR(30)  NOT NULL,
            LASTNAME CHAR(30)  NOT NULL,
            EMAIL CHAR(50)  NOT NULL,
            PASSWORD CHAR(100)  NOT NULL,
            ISVARIFIED BOOLEAN DEFAULT FALSE,
            REFRESHTOKEN CHAR(100) ,
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF  EXISTS USERS`);
  }
}
