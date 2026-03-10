import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UrlClick } from './url_click.entity';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column({ unique: true, length: 8, nullable: false })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UrlClick, urlClick => urlClick.url, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  clicks: UrlClick[];
}
