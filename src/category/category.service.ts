import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(@Inject('MICRO-ADMIN') private microAdmin: ClientProxy) { }

    /* STORE A CATEGORY */
    async store(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<any>{
        return await this.microAdmin.send(
            { cmd: 'category_store' },
            { createCategoryDto, user }
        ).toPromise();
    }

    /* GET A CATEGORY */
    async get(id: string): Promise<CategoryEntity>{
        const category = await this.microAdmin.send({ cmd: 'category_get' }, { id }).toPromise();
        if (!category) {
            throw new NotFoundException(`Category With ID ${id} NOT FOUND`);
        }
        return category;
    }

    /* INDEX */
    async index(): Promise<CategoryEntity[]>{
        return await this.microAdmin.send(
            { cmd: 'category_index' },
            {}
        ).toPromise();
    }

    /* UPDATE A CATEGORY */
    async update(
        updateCategoryDto: UpdateCategoryDto,
        id: string,
        user: UserEntity
    ): Promise<any>{
        const category = await this.get(id);
        return await this.microAdmin.send(
            { cmd: 'category_update' },
            { updateCategoryDto, category, user }
        ).toPromise();
    }

    /* DELETE  A CATEGORY*/
    async delete(
        id: string,
        user: UserEntity
    ): Promise<any>{
        const category = await this.get(id);
        return await this.microAdmin.send(
            { cmd: 'category_delete' },
            { category, user }
        ).toPromise();
    }

}
