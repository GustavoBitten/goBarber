import {MigrationInterface,Table, QueryRunner} from "typeorm";

export default class CreateAppointments1593372591861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'appointments',
                columns:[
                    {
                        name: 'id',
                        type:'varchar',
                        isPrimary: true,

                    },
                    {
                        name: 'provider',
                        type:'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'data',
                        type:'timestamp with time zone',
                        isNullable: false,
                    }
                ]
            }

            )
        )



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')





    }

}
