import React, { useEffect, useState } from "react";

const GuestServiceListPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalServices');
            if (!response.ok) {
                throw new Error('Không thể tải dịch vụ!');
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) return <div className="text-center mt-10 text-lg">Đang tải dịch vụ...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Danh Sách Dịch Vụ Decal</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.serviceID}
                            className="border border-gray-200 p-6 rounded-2xl shadow-md bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{service.serviceName}</h2>
                                <p className="text-gray-600 mb-2">{service.description}</p>
                                <p className="text-gray-500 mb-2"><strong>Loại Decal:</strong> {service.decalTypeName}</p>
                                <p className="text-gray-500 mb-2"><strong>Đơn giá:</strong> {service.price.toLocaleString()} đ</p>
                                <p className="text-gray-500"><strong>Đơn vị công:</strong> {service.standardWorkUnits}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestServiceListPage;
