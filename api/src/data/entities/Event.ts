import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { ObjectID } from "bson";

@Entity()
export class Event extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public name: String;
}
