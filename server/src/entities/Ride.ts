import { rideStatus } from "src/types/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
class Ride extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCLED", "REQUESTING", "ONROUTE"]
  })
  status: rideStatus;

  @Column({ type: "text" })
  pickUpAddress: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;

  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;

  @Column({ type: "text" })
  dropOffAddress: string;

  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;

  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text" })
  distance: string;

  @Column({ type: "text" })
  duration: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
