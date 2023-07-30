// Importing required modules
import { useLocation } from "react-router-dom";
import UpdateProfileInformation from "./Partials/UpdateProfileInformationForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UserLayoutComponent from "../../components/pagelayouts/UserLayoutComponent";

// The main Edit component
export default function Edit() {
    // Get the current location using react-router-dom's useLocation hook
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extract email, phoneNumber, and name from the URL query parameters
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phoneNumber');
    const name = searchParams.get('name');

    return (
        // Wrap the content in the UserLayoutComponent with a title
        <UserLayoutComponent title={'Edit your Profile'}>
            <div>
                {/* Update Profile Information Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformation
                        fullName={name}
                        userEmail={email}
                        userPhoneNumber={phoneNumber}
                        className="max-w-xl"
                    />
                </div>

                {/* Update Password Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* Delete User Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </UserLayoutComponent>
    );
}
