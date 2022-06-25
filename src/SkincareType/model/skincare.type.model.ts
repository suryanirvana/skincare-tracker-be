
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class SkincareType {

    @PrimaryGeneratedColumn()
    skincareTypeID: number

    @Column()
    skincareTypeName: string

    @Column()
    day: boolean

    @Column()
    night: boolean

    @Column({nullable: true})
    step: number

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;

}

export default SkincareType