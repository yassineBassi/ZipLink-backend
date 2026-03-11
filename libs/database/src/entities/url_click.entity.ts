import { Column, CreateDateColumn, Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Url } from './url.entity';

@Entity('url_clicks')
export class UrlClick {

    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @ManyToOne(() => Url, url => url.clicks)
    url: Url;

    @Column({ type: 'varchar' })
    clientIp: string;

    @Column({ type: 'varchar' })
    clientBrowser: string;

    @Column({ type: 'timestamp' })
    time: Date;
}
