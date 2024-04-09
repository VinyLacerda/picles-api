import { Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseInput from "./create.pet.usecase.input";
import CreatePetUseCaseOutPut from "./create.pet.usecase.output";


@Injectable()
export default class CreatePetUseCase implements IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutPut> {
    run(input: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutPut> {
        throw new Error("Method not implemented.");
    }
}