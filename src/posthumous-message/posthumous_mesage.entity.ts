import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('POSTHUMOUS_MESSAGE')
export class PosthumousMessage {
  @ApiProperty({
    description: 'Identifiant unique du message posthume',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_POSTHUMOUS_MESSAGE' })
  id: number;

  @ApiProperty({
    description: 'Adresse email du destinataire du message posthume',
    type: String,
    example: 'destinataire@example.com',
  })
  @Column({ name: 'recipient_email', length: 50 })
  recipientEmail: string;

  @ApiProperty({
    description: 'Titre du message posthume',
    type: String,
    example: 'Mes dernières volontés',
  })
  @Column({ length: 50 })
  title: string;

  @ApiProperty({
    description: 'Contenu textuel du message posthume',
    type: String,
    example: 'Je tenais à vous dire...',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Date de création du message posthume',
    type: String,
    example: '2025-01-15',
  })
  @Column({ name: 'creation_date', length: 50 })
  creationDate: string;

  @ApiProperty({
    description: 'Indique si le message a été ouvert après le décès',
    type: Boolean,
    example: false,
  })
  @Column({ name: 'opened_after_death' })
  openedAfterDeath: boolean;

  @ApiProperty({
    description: 'Nombre de pièces jointes associées au message',
    type: Number,
    example: 2,
  })
  @Column({ name: 'attachment_count' })
  attachmentCount: number;

  @ApiProperty({
    description: 'Identifiant de lutilisateur auteur du message posthume',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_User' })
  UserId: number;

  @ApiProperty({
    description: 'Utilisateur auteur du message posthume',
    type: () => User,
  })
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'Id_User' })
  User: User;
}
