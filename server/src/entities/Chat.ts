import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import Message from "./Message";
import Member from "./Member";

@Entity()
class Chat extends BaseEntity {
  @PrimaryColumn() id: number;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany((type) => Member, (member) => member.chat)
  participants: Member[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
