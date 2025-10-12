import React, { useState } from 'react';
import { Hostel } from '../../../types';
import Form from "form-data";
import { updateHostelAPI } from './api/updateHostelAPI';
import { Forward } from 'lucide-react';
import { getHostelAPI } from './api/getHostelAPI';
import { BASE_URL_LOCAL } from '../../../constants/constants';

const initialHostel: Hostel = {
    id: 1,
    name: '',
    photo: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    localGovt: '',
    state: '',
    country: '',
    document: '',
    UserId: 1,
    featured: false
};

export default function HostelEdit({ hostelId, setEdit }: { hostelId: number, setEdit: any },) {
    const [hostel, setHostel] = useState<Hostel>(initialHostel);
    const [status, setStatus] = useState("");
    // const [previewUrl, setPreviewUrl] = useState({});
    const [image, setImage] = useState<any>({
        filenames: "" as string,
        photo: {} as any,
        document: {} as any
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target as any;
        setHostel(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending data...");

        console.log('Submittted hostel data:', hostel);
        const formData = new Form();
        formData.append('name', hostel.name);
        formData.append('phone', hostel.phone);
        formData.append('email', hostel.email);
        formData.append('address', hostel.address);
        formData.append('localGovt', hostel.localGovt);
        formData.append('state', hostel.state);
        formData.append('country', hostel.country);
        try {
            formData.append('photo', image?.photo, image?.photo?.name);
            formData.append("document", image?.document, image.document.name);
        } catch (error) {
            console.log(error);
        }
        formData.append('description', hostel.description);
        formData.append("featured", hostel.featured);
        formData.append("hostelId", hostelId);
        // formData.append("_csrf", _csrf);

        let result = await updateHostelAPI(hostelId, formData);

        if (result) {
            setStatus("Hostel updated");
            setEdit(false)
        } else {
            setStatus("Hostel update failed")
        }
    };

    React.useEffect(() => {
        (async () => {
            let result = await getHostelAPI(hostelId);
            setHostel(result.hostel);
        })();
    }, [])


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex justify-between text-center">Edit Hostel <button onClick={() => setEdit(false)}><Forward /></button></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        name="name"
                        value={hostel.name}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Hostel 1, Hostel 2; Suite 1, Suite 2 etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        name="email"
                        value={hostel.email}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Hostel 1, Hostel 2; Suite 1, Suite 2 etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        name="phone"
                        value={hostel.phone}
                        onChange={handleChange}
                        required
                        placeholder='e.g., 08065899132'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        name="address"
                        value={hostel.address}
                        onChange={handleChange}
                        required
                        placeholder='e.g., 463 N-Tsakiya Naibawa'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local Govt</label>
                    <input
                        name="localGovt"
                        value={hostel.localGovt}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Kumbotso LG'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        name="state"
                        value={hostel.state}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Kano'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                        name="country"
                        value={hostel.country}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Nigeria'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={hostel.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                    {hostel?.photo && <img crossOrigin='use-credentials' src={BASE_URL_LOCAL + "/uploads/" + hostel?.photo} alt={hostel?.name} width={10} height={10} style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }} />}
                    <input
                        name="photo"
                        type='file'
                        onChange={(e: any) => setImage((prev: any) => ({ ...prev, filenames: prev.filenames + ";" + e.target.files[0].name, photo: e.target.files[0] }))}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        formEncType='multipart/form-data'
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document (C.A.C)</label>
                    {hostel?.document && <img src={BASE_URL_LOCAL + "/uploads/" + hostel?.document} alt={hostel?.name} width={10} height={10} style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }} />}
                    <input
                        name="document"
                        type='file'
                        onChange={(e: any) => setImage((prev: any) => ({ ...prev, filenames: prev.filenames + ";" + e.target.files[0].name, document: e.target.files[0] }))}

                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        formEncType='multipart/form-data'
                        multiple
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                    <select
                        name="featured"
                        value={hostel.featured ? "true" : "false"}
                        onChange={e => setHostel((prev: any) => ({ ...prev, featured: e.target.value === 'true' ? true : false }))}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                    </select>
                </div>

                <div className="flex items-end">
                    {status ? <div className='text-green-500'>{status}</div> : <div className='text-red-500'>{status}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                    >
                        Update Hostel
                    </button>
                </div>

            </div>
        </form>
    );
}