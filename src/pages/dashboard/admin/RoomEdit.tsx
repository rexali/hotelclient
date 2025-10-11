import React, { useEffect, useState } from 'react';
import { ResponseType } from '../../../types';
import { updateRoomAPI } from '../../../api/rooms/updateRoomAPI';
import Form from "form-data";
import { config } from '../../../config/config';
import { Forward } from 'lucide-react';
import { toast } from 'sonner';
import { BASE_URL_LOCAL } from '../../../constants/constants';

const roomTypes = ['single', 'double', 'triple', 'dormitory'];

export default function RoomEdit({ roomId, setEdit }: { setEdit: any, roomId: any }) {
    const [room, setRoom] = useState<any>({});
    const [status, setStatus] = useState<string>();
    const [previewUrls, setPreviewUrls] = useState([]);
    const [images, setImages] = useState({
        filenames: [] as Array<string>,
        files: [] as Array<any>
    });

    const photos = [
        'https://photos.pexels.com/photos/271618/pexels-photo-271618.jpeg',
        'https://photos.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setRoom((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setRoom((prev: any) => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter((a: any) => a !== value)
        }));
    };


    const handleImagesChange = (e: any) => {
        let filenames: string[] = [...e.target.files].map((file: any) => file.name);
        setRoom((prev: any) => ({
            ...prev,
            images: filenames
        }));
        setImages(prev => ({ ...prev, filenames: filenames, files: [...e.target.files] }));
    };


    const createPreviewUrls = (files: Array<any>) => {
        let urls: any = [];
        files?.forEach(file => {
            urls.push(URL.createObjectURL(file));
        })

        setPreviewUrls(urls);
    }

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // onAddRoom({ ...room, id: Date.now().toString() });
        setStatus("Sending data...");

        console.log('Submittted room data:', room);
        const formData = new Form();
        for (const file of images.files) {
            formData.append("photos", file, file.name)
        }
        formData.append('name', room.name);
        formData.append('type', room.type);
        formData.append('location', room.location);
        formData.append('bedrooms', room.bedrooms);
        formData.append('bathrooms', room.bathrooms);
        formData.append('capacity', room.capacity);
        formData.append('amenities', room.amenities);
        formData.append('description', room.description);
        formData.append('price', room.price);
        formData.append('images', room.images);
        formData.append('availability', room.availability);
        formData.append('rating', room.rating);
        formData.append("featured", room.featured);
        formData.append("agentName", room.agentName);
        formData.append("agentPhone", room.agentPhone);
        formData.append("id", roomId);
        // formData.append("_csrf", _csrf);

        let update = await updateRoomAPI(roomId, formData);
        if (update) {
            setStatus("Updated successful");
            toast("Updated successful");
        } else {
            toast("Room Update failed");
        }
    };

    useEffect(() => {

        const getRoomAPI = async function getRoomAPI(id: number) {
            try {
                const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/rooms/" + id, {
                    credentials: 'include'
                });

                const result = await response.json() as ResponseType;
                setImages(prev => ({ ...prev, files: result?.data?.room?.photos ?? [] }));
                setRoom(result?.data?.room);

            } catch (error) {
                console.warn(error);

            }
        }

        getRoomAPI(roomId);

    }, [roomId]);

    useEffect(() => {
        try {
            createPreviewUrls(images.files);
        } catch (error) {
            console.warn(error);
        }
    }, [images.files]);


    if (room === null || undefined) {
        return <div className='text-center'>Loading...</div>
    }

    if (!Object.keys(room).length) {
        return <div className='text-center'>Error!</div>
    }

    return (
        <form
            onSubmit={handleUpdateSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex justify-between text-center">Edit Room <button onClick={() => setEdit(false)}><Forward /></button></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                    <input
                        name="name"
                        defaultValue={room?.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        name="type"
                        defaultValue={room?.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {roomTypes?.map(type => (
                            <option key={type} defaultValue={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input
                        name="price"
                        type="number"
                        defaultValue={room?.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        defaultValue={room?.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                        name="bedrooms"
                        type="number"
                        defaultValue={room?.bedrooms}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                        name="bathrooms"
                        type="number"
                        defaultValue={room?.bathrooms}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                        name="capacity"
                        type="number"
                        defaultValue={room?.capacity}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                    <input
                        name="agentName"
                        defaultValue={room?.agentName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Phone</label>
                    <input
                        name="agentPhone"
                        defaultValue={room?.agentPhone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                <div className="flex flex-wrap gap-2 mt-1">
                    {
                        [
                            'WiFi',
                            'AC',
                            'Study Desk',
                            'Wardrobe',
                            'Private Bathroom',
                            'Shared Kitchen',
                            'Laundry',
                            'Study Area',
                            'Kitchen',
                            'Parking',
                            'Security',
                            'Study Hall',
                            'Common Area'
                        ].map(a => (
                            <label key={a} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    defaultValue={a}
                                    checked={room?.amenities?.includes(a)}
                                    onChange={handleAmenitiesChange}
                                    className="form-checkbox text-blue-600"
                                />
                                <span className="ml-2 text-xs">{a}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
            <div>
                {/* 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' */}
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (comma separated URLs)</label>
                {
                    previewUrls?.length > 0 && previewUrls.map((url: any) => {
                        return <img key={url} src={BASE_URL_LOCAL + "/uploads/" + url} alt={url} width={10} height={10} style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }} />
                    })

                }
                <input
                    name="images"
                    type='file'
                    onChange={handleImagesChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    formEncType='multipart/form-data'
                    multiple
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    defaultValue={room?.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                <select
                    name="featured"
                    value={room.featured ? "true" : "false"}
                    onChange={e => setRoom((prev: any) => ({ ...prev, featured: e.target.value === 'true' ? true : false }))}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="true">Featured</option>
                    <option value="false">Not Featured</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                        name="availability"
                        defaultValue={room?.availability ? "true" : "false"}
                        onChange={e => setRoom((prev: any) => ({ ...prev, availability: e.target.value === 'true' ? true : false }))}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option defaultValue="true">Available</option>
                        <option defaultValue="false">Not Available</option>
                    </select>
                </div>
                <div className="flex items-end">
                    {status ? <div className='text-green-500'>{status}</div> : <div className='text-red-500'>{status}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}