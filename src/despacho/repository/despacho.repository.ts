import { RegisterLawyerDto } from "src/auth/dto/registerLawyer.dto";
import { EntityRepository, Repository } from "typeorm";
import { DespachoEntity } from "../entities/despacho.entity";

@EntityRepository(DespachoEntity)
export class DespachoRepository extends Repository<DespachoEntity>{}