import { injectable, inject } from "inversify";
import {
    TYPES_SERVICE,
    TYPES_REPOSITORY
} from "../../config/ioc/Inversify.type.defs";
import { MongoRepository, ObjectID } from "typeorm";
import { User } from "../entities/User";
import { IUserInfoDTO } from "../domain/IUserInfoDTO";

@injectable()
export class UserService {
    @inject(TYPES_REPOSITORY.UserRepository)
    private readonly _userRepository: MongoRepository<User>;

    public async getAllUsers(): Promise<User[]> {
        return this._userRepository.find({});
    }

    public async createNewUser(newUser: IUserInfoDTO) {
        const user: User = new User();

        user.publicUserId = newUser.publicUserId;
        user.email = newUser.email;
        user.password = newUser.password;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.phoneNumber = newUser.phoneNumber;
        user.createdDate = newUser.createdDate;
        user.accountType = newUser.accountType;

        return this._userRepository.save(user);
    }

    public async findUserByEmail(_email: string): Promise<User> {
        return this._userRepository.findOne({ email: _email });
    }

    public async findUserByPublicId(_publicId: string): Promise<User> {
        return this._userRepository.findOne({ publicUserId: _publicId });
    }

    public async findUserByInternalId(_id: ObjectID): Promise<User> {
        return this._userRepository.findOne({ id: _id });
    }
}
