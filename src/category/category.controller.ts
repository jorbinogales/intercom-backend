import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/enum/roles';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    /* CREATE A CATEGORY [ ONLY ADMIN ] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a category [ONLY ADMIN]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Admin)
    async store(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUser() user: UserEntity): Promise<any>{
        return await this.categoryService.store(createCategoryDto, user);
    }

    /* GET ALL CATEGORY [ ALL ] */
    @Get('')
    @ApiOperation({ summary: 'Get all  category [ALL]' })
    async index(): Promise<any[]>{
        return await this.categoryService.index();
    }
    

    /* GET ONE CATEGORY [ ALL ] */
    @Get(':id')
    @ApiOperation({ summary: 'Get a category [ALL]' })
    async get(
        @Param('id') id: number,
    ): Promise<any>{
        return await this.categoryService.get(id);
    }

    /* UPDATE ONE CATEGORY [ ONLY ADMIN ] */
    @Patch(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a category [ONLY ADMIN]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Admin)
    async update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('id') id: number,
        @GetUser() user: UserEntity): Promise<any>{
        return await this.categoryService.update(updateCategoryDto, id, user);
    }

    
    /* DELETE ONE CATEGORY [ ONLY ADMIN ] */
    @Delete(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a category [ONLY ADMIN]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Admin)
    async delete(
        @Param('id') id: number,
        @GetUser() user: UserEntity): Promise<any>{
        return await this.categoryService.delete(id, user);
    }

}
