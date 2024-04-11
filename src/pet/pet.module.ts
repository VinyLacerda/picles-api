import { Module } from "@nestjs/common";
import { PetController } from "./pet.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Pet, PetSchema } from "./schemas/pet.schema";
import PetTokens from "./pet.tokens";
import GetPetByIdUseCase from "./usecases/get.pet.by.id.usecase";
import PetRepository from "./pet.repository";
import CreatePetUseCase from "./usecases/create.pet.usecase";
import UpdatePetByIdUseCase from "./usecases/update.by.id.usecase";
import DeletePetByIdUseCase from "./usecases/delete.pet.by.id.usecase";






@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByIdUseCase
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository
    },

    {
      provide: PetTokens.updatePetUseCase,
      useClass: UpdatePetByIdUseCase
    },
    {
      provide: PetTokens.deletePetUseCase,
      useClass: DeletePetByIdUseCase
    }
  ]
})
export class PetModule { }
