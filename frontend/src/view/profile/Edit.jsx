import { useLocation } from "react-router-dom";
import UpdateProfileInformation from "./Partials/UpdateProfileInformationForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UserLayoutComponent from "../../components/UserLayoutComponent";


export default function Edit() {

    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const phoneNumber = searchParams.get('phoneNumber');
  const name = searchParams.get('name');
    return (
        <UserLayoutComponent title={'Edit your Profile'}>



                <div >
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformation
                            fullName={name}
                            userEmail={email}
                            userPhoneNumber={phoneNumber}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>

        </UserLayoutComponent>
    );
}
