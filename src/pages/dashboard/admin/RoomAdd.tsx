import React, { useEffect, useState } from 'react';
import { Room } from '../../../types';
import Form from "form-data";
import { createRoomAPI } from '../../../api/rooms/createRoomAPI';

const initialRoom: Room = {
    id: '',
    name: '',
    type: 'single',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    capacity: 1,
    amenities: [],
    photos: [],
    description: '',
    availability: true,
    rating: 0,
    featured: false,
    agentName: '',
    agentPhone: ''
};

const roomTypes = ['single', 'double', 'triple', 'dormitory'];

export default function RoomAdd({ handleRoomAdd }: { handleRoomAdd: (room: Room) => void }) {
    const [room, setRoom] = useState<Room>(initialRoom);
    const [status, setStatus] = useState<string>();
    const [previewUrls, setPreviewUrls] = useState([]);
    const [images, setImages] = useState({
        filenames: [] as Array<string>,
        files: [] as Array<any>
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target as any;
        setRoom(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setRoom(prev => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter(a => a !== value)
        }));
    };

    const createPreviewUrls = (files: Array<any>) => {
        let urls: any = [];
        files.forEach(file => {
            urls.push(URL.createObjectURL(file))
        })
        setPreviewUrls(urls)
    }

    const handleImagesChange = (e: any) => {
        let filenames: string[] = [...e.target.files].map((file: any) => file.name);
        setRoom(prev => ({
            ...prev,
            images: filenames
        }));
        setImages(prevImg => ({ ...prevImg, filenames: filenames, files: [...e.target.files] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        formData.append('photos', room.photos);
        formData.append('availability', room.availability);
        formData.append('rating', room.rating);
        formData.append("featured", room.featured);
        formData.append("agentName", room.agentName);
        formData.append("agentPhone", room.agentPhone);
        formData.append('description', room.description);
        formData.append('price', room.price);
        // formData.append("_csrf", _csrf);

        let roomData = await createRoomAPI(formData);

        if (roomData !== null) {
            setStatus("Room created");
            setRoom(initialRoom);
            handleRoomAdd({ ...roomData });
        } else {
            setStatus("Room creation failed")
        }
    };

    useEffect(() => {
        createPreviewUrls(images.files)
    }, [images])

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Add a New Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                    <input
                        name="name"
                        value={room.name}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Room 1, Room 2; Suite 1, Suite 2 etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        name="type"
                        value={room.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input
                        name="price"
                        type="number"
                        value={room.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        value={room.location}
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
                        value={room.bedrooms}
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
                        value={room.bathrooms}
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
                        value={room.capacity}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                    <input
                        name="agentName"
                        value={room.agentName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Phone</label>
                    <input
                        name="agentPhone"
                        value={room.agentPhone}
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
                                    value={a}
                                    checked={room.amenities.includes(a)}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (comma separated URLs)</label>
                {
                    previewUrls.length > 0 && previewUrls.map((url: any) => {
                        return <img key={url} src={url} alt={url} width={10} height={10} style={{ margin: 2, height: "auto", width: "auto", display: "inline-block" }} />
                    })
                }
                <input
                    name="photos"
                    type='file'
                    // value={room.photos.join(', ')}
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
                    value={room.description}
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
                        value={room.availability ? 'true' : 'false'}
                        onChange={e => setRoom((prev: any) => ({ ...prev, availability: e.target.value === 'true' ? true : false }))}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
                <div className="flex items-end">
                    {status ? <div className='text-green-500'>{status}</div> : <div className='text-red-500'>{status}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                    >
                        Add Room
                    </button>
                </div>
            </div>
        </form>
    );
}