import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Member from "./Member";

@Entity()
class Message extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column({ type: "text" }) text: string;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;

  @ManyToOne((type) => Member, (member) => member.messages)
  user: Member;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Message;
