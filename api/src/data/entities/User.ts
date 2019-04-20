import { Entity, BaseEntity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { EAccountType } from "../domain/EAccountType";

@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public publicUserId: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public phoneNumber: string;

    @Column()
    public accountType: EAccountType;

    @Column()
    public createdDate: string;
}
