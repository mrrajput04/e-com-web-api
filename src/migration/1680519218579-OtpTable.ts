import { log } from 'console';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OtpTable1680519218579 implements MigrationInterface {
  name: 'OtpTable1680519218579';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS otp (
            ID SERIAL PRIMARY KEY NOT NULL,
            EMAIL CHAR(50)  NOT NULL,
            OTP NUMBER(10) NOT NULL,
            `,
    );
    log(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS otp`);
  }
}
