import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { getProfileDetails } from "../../helpers/get-data";
import { toast } from "sonner";
import { Account } from "../../types/auth";
import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useAuth();

  useEffect(() => {
    getProfileDetails()
      .then((data) => {
        setAccounts(data.accounts);
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error getting the data.");
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return (
      <div className="py-4 px-6 rounded-sm w-full md:w-[600px] mt-4 space-y-8">
        <div className="w-full h-8 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-gray-700 dark:text-gray-200">
            <div className="w-1/3 h-6 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
          </div>
          <div className="mt-2 space-y-2">
            <div className="w-2/3 h-4 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="w-1/2 h-6 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
          <div className="w-2/5 h-6 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="py-4 px-6 rounded-sm bg-gray-950 w-full md:w-[600px] mt-4 space-y-8">
        <div>
          {accounts.map((account) => {
            return (
              <div key={account.id}>
                <div className="flex justify-between text-gray-200">
                  <p className="text-xl">{account?.studentName}</p>
                  <div>
                    <AiFillEdit className="size-5" />
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="italic text-small">{account.highSchool}</div>
                  {account.highSchool && <div className="p-1 text-gray-900 bg-white rounded-md w-fit">
                    Class of '{account.graduationYear}
                  </div>}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-xl">My team</h2>
          <div className="flex justify-between text-sm text-gray-200">
            <p>{user?.name}</p>
            <p className="text-blue-500">{user?.email}</p>
            <IoTrashBin />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 text-blue-500 bg-white rounded-md">
            Invite Parent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
