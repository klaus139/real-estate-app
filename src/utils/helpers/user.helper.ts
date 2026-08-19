import { IUser, IPublicUser } from "../interfaces/user.interface"
const publicUser = (user: IUser): IPublicUser => {
    return {
        _id: user._id,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
    }
}
export default publicUser;
