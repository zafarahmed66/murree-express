import { useState } from "react";
import { CreateUserForm, Step1FormData } from "./components/create-user-form";
import { AccountForm } from "./components/account-form";
import { Link } from "react-router-dom";

const Register = () => {
  const [initialFormData, setInitialFormData] = useState<Step1FormData>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full py-8 md:w-[60%]">
        {currentIndex === 0 && (
          <CreateUserForm
            setInitialFormData={setInitialFormData}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {currentIndex === 1 && (
          <AccountForm initialFormData={initialFormData!} />
        )}
        <div className="flex items-center justify-center space-x-2">
          <p className="text-gray-500">Already have an account?</p>
          <Link to="/login" className={"italic text-blue-500 hover:underline"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
