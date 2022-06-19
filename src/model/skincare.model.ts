
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import SkincareBrand from "./skincare.brand.model";
import SkincareType from "./skincare.type.model";

@Entity()
class Skincare {

    @PrimaryGeneratedColumn()
    skincareID: number

    @Column()
    skincareName: string

    @ManyToOne(() => SkincareType, {
        cascade: true,
    })
    @JoinColumn({name: "skincareTypeID"})
    skincareTypeID: SkincareType

    @ManyToOne(() => SkincareBrand, {
        cascade: true,
    })
    @JoinColumn({name: "skincareBrandID"})
    skincareBrandID: SkincareBrand

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;

}

export default Skincare