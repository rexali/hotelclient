import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getRegisteredUsersAPI } from "./api/getRegisteredUsersAPI";
import UserDetails from "./UserDetails";
import { BASE_URL_LOCAL } from "../../../constants/constants";
import { ResponseType } from "../../../types";

export const UsersTab = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let result = await getRegisteredUsersAPI();
      setData(result)
    })();
  }, []);

  if (open) {
    return <UserDetails setOpen={setOpen} />
  }

  if (data.length === 0) {
    return <div className="text-center">No registered user</div>
  }

  if (data === null || undefined) {
    return <div className="text-center">Error! No registered user</div>
  }

  async function handleRemoveUser(UserId: any): Promise<void> {
    const confirm = window.confirm("Want to delete this account");
    if (confirm) {
      await removeUserAPI(UserId);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Users</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Favorites
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.image? BASE_URL_LOCAL + "/uploads/" + user?.image : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                      alt={user?.image}
                      width={10}
                      height={10}
                      style={{ margin: 2, display: "inline-block" }}
                      crossOrigin=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.User?.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.favorites?.length ?? 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" onClick={() => setOpen(true)} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" onClick={() => handleRemoveUser(user.UserId)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


async function removeUserAPI(UserId: any) {
  let response = await fetch(BASE_URL_LOCAL + "api/v1/auth/remove/" + UserId, { method: "DELETE", credentials: 'include' });
  let result = await response.json() as ResponseType;
  if (result.status === 'success') {

    return true
  }

  return false
}

