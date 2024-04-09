export default class CreatePetUseCaseOutPut {
    id: string;
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<CreatePetUseCaseOutPut>) {
        Object.assign(this, data)
    }
}