import { InjectModel } from "@nestjs/mongoose";
import IPetRepository from "./interface/pet.repository.interface";
import { Injectable } from "@nestjs/common";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";
import DeletePetByIdUseCase from "./usecases/delete.pet.by.id.usecase";
import GetPetsUseCaseInput from "./usecases/dtos/get.pets.usecase.input";
import FindByFilterAndTotal from "./usecases/dtos/find.by.filter.and.total";


@Injectable()
export default class PetRepository implements IPetRepository {


    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>,
    ) { }

    async findByFilter(input: GetPetsUseCaseInput): Promise<FindByFilterAndTotal> {

        const FIRST_PAGE = 1;
        const skip = input.page == FIRST_PAGE ? 0 : input.itemsPerPage * (input.page - 1);
        let query = this.petModel.find();

        if (input.type) {
            query = query.find({ type: input.type })
        }

        if (input.size) {
            query = query.find({ type: input.size })
        }

        if (input.gender) {
            query = query.find({ type: input.gender })
        }

        const totalQuery = query.clone().countDocuments();
        const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

        const [items, total] = await Promise.all([
            skipQuery.exec(),
            totalQuery.exec()
        ]);

        return new FindByFilterAndTotal({ items, total });
    }

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async updatePetById(data: Partial<Pet>): Promise<void> {
        await this.petModel.updateOne({
            _id: data._id
        }, {
            ...data,
            updatedAt: new Date()
        })
    }

    async deletePetById(id: string): Promise<Pet> {
        return await this.petModel.findByIdAndDelete(id)
    }

}

