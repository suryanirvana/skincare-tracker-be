import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class SkincareBrand {

    @PrimaryGeneratedColumn()
    skincareBrandID: number

    @Column()
    skincareBrandName: string

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;

}

export default SkincareBrand