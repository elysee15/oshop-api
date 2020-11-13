import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UserEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ 
        name: 'first_name',
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    private firstName: string;

    @Column({ 
        name: 'last_name',
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    private lastName: string;

    @Column({ 
        name: 'email',
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    private email: string;

    @Column({ 
        name: 'password',
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    passwordHashed: string;

    public constructor(){}

    public getId(): number{
        return this.id;
    }

    public getFirstName(): string{
        return this.firstName;
    }

    public setFirstName(firstName: string): string{
        this.firstName = firstName;
        return this.firstName;
    }

    public getLastName(): string{
        return this.lastName;
    }

    public setLastName(lastName: string): string{
        this.lastName = lastName;
        return this.lastName;
    }

    public getEmail(): string{
        return this.email;
    }

    public setEmail(email: string): string{
        this.email = email;
        return this.email;
    }

    public getPassword(): string{
        return this.passwordHashed;
    }

    public setPasswordHashed(passwordHashed: string): string{
        this.passwordHashed = passwordHashed;
        return this.passwordHashed;
    }
}