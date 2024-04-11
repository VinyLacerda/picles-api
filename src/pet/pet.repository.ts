import { InjectModel } from "@nestjs/mongoose";
import IPetRepository from "./interface/pet.repository.interface";
import { Injectable } from "@nestjs/common";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";
import DeletePetByIdUseCase from "./usecases/delete.pet.by.id.usecase";


@Injectable()
export default class PetRepository implements IPetRepository {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>,
    ) { }

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

